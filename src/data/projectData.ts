import metadata from "../../data/project_metadata (2).json";
import banners from "../../data/classification_banners (2).json";
import ndmi from "../../data/ndmi_change.json";
import redDemo from "../../data/red_demo_details (2).json";
import blocksUrl from "../../data/colored_block_polygons_final (2).geojson?url";
import demoOverlayUrl from "../../data/red_demo_overlay.geojson?url";

export type Classification = "GREEN" | "YELLOW" | "RED" | "GREY";

export type BlockProperties = {
  block_id: string;
  zone_id: string | null;
  block_row: number;
  block_col: number;
  classification: Classification;
  color: string;
  area_ha: number;
  clickable: boolean;
  geometry_source: string;
};

export type PolygonFeature = {
  type: "Feature";
  id: string;
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: BlockProperties;
};

export type FeatureCollection = {
  type: "FeatureCollection";
  name: string;
  features: PolygonFeature[];
};

export const projectMetadata = metadata;
export const classificationBanners = banners;
export const ndmiMetadata = ndmi;
export const redDemoDetails = redDemo;
export type DemoFeatureCollection = { type: "FeatureCollection"; features: Array<{ geometry: { type: string; coordinates: number[][][] | number[][][][] }; properties: Record<string, unknown> }> };
let blocksPromise: Promise<FeatureCollection> | undefined;
let demoPromise: Promise<DemoFeatureCollection> | undefined;
export const loadBlockFeatures = () => {
  blocksPromise ??= fetch(blocksUrl).then((response) => {
    if (!response.ok) throw new Error("Unable to load the classification GeoJSON.");
    return response.json() as Promise<FeatureCollection>;
  });
  return blocksPromise;
};
export const loadRedDemoOverlay = () => {
  demoPromise ??= fetch(demoOverlayUrl).then((response) => {
    if (!response.ok) throw new Error("Unable to load the RED demo GeoJSON.");
    return response.json() as Promise<DemoFeatureCollection>;
  });
  return demoPromise;
};

export const classificationCounts = metadata.classification_counts;
export const totalBlocks = Object.values(classificationCounts).reduce((sum, count) => sum + count, 0);
