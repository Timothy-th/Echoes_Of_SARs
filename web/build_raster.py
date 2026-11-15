from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image
from rasterio.enums import Resampling
from rasterio.mask import mask
from rasterio.warp import reproject
from rasterio.features import geometry_mask


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = Path(__file__).resolve().parent / "data"
AOI_PATH = PROJECT_ROOT / "aoi.geojson.txt"
REFERENCE_PATH = PROJECT_ROOT / "Sentinel-1" / "2026" / "NDVI_2020_Apirl.tif"
AFTER_PATH = PROJECT_ROOT / "Sentinel-1" / "2026" / "NDVI_2026_Apirl.tif"

DISPLAY_MIN = -0.2
DISPLAY_MAX = 0.9
COLOR_STOPS = (
    (-0.2, (176, 54, 49)),
    (0.2, (233, 143, 72)),
    (0.45, (241, 220, 112)),
    (0.65, (131, 181, 103)),
    (0.9, (35, 112, 69)),
)


def colorize(values: np.ndarray, valid: np.ndarray) -> np.ndarray:
    stops = np.array([stop[0] for stop in COLOR_STOPS], dtype=np.float64)
    colors = np.array([stop[1] for stop in COLOR_STOPS], dtype=np.float64)
    clipped = np.clip(values, DISPLAY_MIN, DISPLAY_MAX)

    rgba = np.zeros((*values.shape, 4), dtype=np.uint8)
    for channel in range(3):
        rgba[..., channel] = np.interp(
            clipped, stops, colors[:, channel]
        ).astype(np.uint8)
    rgba[..., 3] = np.where(valid, 235, 0).astype(np.uint8)
    return rgba


def write_raster(
    name: str,
    source: Path,
    values: np.ndarray,
    valid: np.ndarray,
    transform: rasterio.Affine,
    crs: rasterio.crs.CRS,
) -> None:
    stem = DATA_DIR / name
    bounds = rasterio.transform.array_bounds(values.shape[0], values.shape[1], transform)
    Image.fromarray(colorize(values, valid), mode="RGBA").save(
        stem.with_suffix(".png"), optimize=True
    )
    values.astype("<f8", copy=False).tofile(stem.with_suffix(".f64"))
    valid.astype(np.uint8, copy=False).tofile(stem.with_suffix(".mask"))
    metadata = {
        "source": source.relative_to(PROJECT_ROOT).as_posix(),
        "width": int(values.shape[1]),
        "height": int(values.shape[0]),
        "crs": crs.to_string(),
        "bounds": list(bounds),
        "transform": [
            transform.a,
            transform.b,
            transform.c,
            transform.d,
            transform.e,
            transform.f,
        ],
        "valid_cells": int(valid.sum()),
        "display_range": [DISPLAY_MIN, DISPLAY_MAX],
    }
    stem.with_suffix(".json").write_text(
        json.dumps(metadata, indent=2) + "\n", encoding="utf-8"
    )


def main() -> None:
    for source in (REFERENCE_PATH, AFTER_PATH, AOI_PATH):
        if not source.is_file():
            raise FileNotFoundError(f"Required comparison input not found: {source}")

    with AOI_PATH.open(encoding="utf-8-sig") as file:
        feature_collection = json.load(file)
    geometries = [
        feature["geometry"] for feature in feature_collection["features"]
    ]

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with rasterio.open(REFERENCE_PATH) as before, rasterio.open(AFTER_PATH) as after:
        if before.count != 1 or after.count != 1:
            raise ValueError("Both NDVI inputs must contain exactly one band.")
        if before.crs is None or after.crs is None:
            raise ValueError("Both NDVI inputs must have a CRS.")

        before_masked, transform = mask(
            before, geometries, crop=True, indexes=1, filled=False
        )
        before_values = np.asarray(before_masked.data, dtype=np.float64)
        before_valid = (~np.ma.getmaskarray(before_masked)) & np.isfinite(before_values)
        before_values[~before_valid] = 0

        after_source = after.read(1, masked=True)
        after_source_values = np.asarray(after_source.data, dtype=np.float64)
        after_source_valid = (
            (~np.ma.getmaskarray(after_source)) & np.isfinite(after_source_values)
        )
        after_source_values[~after_source_valid] = np.nan
        after_values = np.full(before_values.shape, np.nan, dtype=np.float64)
        reproject(
            source=after_source_values,
            destination=after_values,
            src_transform=after.transform,
            src_crs=after.crs,
            src_nodata=np.nan,
            dst_transform=transform,
            dst_crs=before.crs,
            dst_nodata=np.nan,
            resampling=Resampling.bilinear,
        )
        aoi_mask = geometry_mask(
            geometries,
            out_shape=before_values.shape,
            transform=transform,
            invert=True,
        )
        after_valid = aoi_mask & np.isfinite(after_values)
        after_values[~after_valid] = 0

        write_raster(
            "ndvi_2020",
            REFERENCE_PATH,
            before_values,
            before_valid,
            transform,
            before.crs,
        )
        write_raster(
            "ndvi_2026",
            AFTER_PATH,
            after_values,
            after_valid,
            transform,
            before.crs,
        )

    print(f"Built aligned NDVI overlays in {DATA_DIR}")
    print(
        f"Grid: {before_values.shape[1]} x {before_values.shape[0]} | "
        f"CRS: {before.crs} | 2020 valid: {int(before_valid.sum()):,} | "
        f"2026 valid: {int(after_valid.sum()):,}"
    )
    print("2026 resampling: bilinear onto the 2020 grid; source TIFFs unchanged.")


if __name__ == "__main__":
    main()
