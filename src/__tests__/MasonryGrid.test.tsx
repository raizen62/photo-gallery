import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MasonryGrid } from "../components/MasonryGrid";
import { MemoryRouter } from "react-router-dom";
import { Photo } from "../types";

const samplePhotos: Photo[] = [
  {
    id: 1,
    alt: "Photo 1",
    photographer: "Photographer 1",
    src: {
      small: "https://example.com/photo1-small.jpg",
      medium: "https://example.com/photo1-medium.jpg",
      large: "https://example.com/photo1-large.jpg",
      large2x: "https://example.com/photo1-large2x.jpg",
      original: "https://example.com/photo1-original.jpg",
      portrait: "https://example.com/photo1-portrait.jpg",
      landscape: "https://example.com/photo1-landscape.jpg",
      tiny: "https://example.com/photo1-tiny.jpg",
    },
    width: 800,
    height: 600,
    url: "https://example.com/photo1",
    photographer_url: "https://example.com/photographer1",
    photographer_id: 101,
    avg_color: "#abcdef",
    liked: false,
  },
  {
    id: 2,
    alt: "Photo 2",
    photographer: "Photographer 2",
    src: {
      small: "https://example.com/photo2-small.jpg",
      medium: "https://example.com/photo2-medium.jpg",
      large: "https://example.com/photo2-large.jpg",
      large2x: "https://example.com/photo2-large2x.jpg",
      original: "https://example.com/photo2-original.jpg",
      portrait: "https://example.com/photo2-portrait.jpg",
      landscape: "https://example.com/photo2-landscape.jpg",
      tiny: "https://example.com/photo2-tiny.jpg",
    },
    width: 800,
    height: 600,
    url: "https://example.com/photo2",
    photographer_url: "https://example.com/photographer2",
    photographer_id: 102,
    avg_color: "#fedcba",
    liked: false,
  },
];

describe("MasonryGrid component", () => {
  it("renders all photos provided", async () => {
    render(
      <MemoryRouter>
        <MasonryGrid photos={samplePhotos} />
      </MemoryRouter>
    );

    act(() => {
      global.__INTERSECTION_OBSERVERS__.forEach((observer) =>
        observer.trigger(true)
      );
    });

    await waitFor(() => {
      expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
      expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    });
  });
});
