const API_URL = "http://127.0.0.1:8000/api";

export type ForestImage = {
  id: number;
  image_name: string;
  image_path: string;
};

export const getForestImages = async (): Promise<ForestImage[]> => {
  const response = await fetch(`${API_URL}/images`);

  if (!response.ok) {
    throw new Error("Failed to fetch forest images");
  }

  return response.json();
};
