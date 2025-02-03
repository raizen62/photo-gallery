import { Photo } from "../types";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = "https://api.pexels.com/v1";

export const fetchPhotos = async (
  page = 1,
  perPage = 100
): Promise<Photo[]> => {
  const response = await fetch(
    `${BASE_URL}/curated?page=${page}&per_page=${perPage}`,
    {
      headers: { Authorization: API_KEY },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  const data = await response.json();
  return data.photos;
};

export const searchPhotos = async (
  query: string,
  page = 1,
  perPage = 100
): Promise<Photo[]> => {
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}`,
    {
      headers: { Authorization: API_KEY },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data.photos;
};
