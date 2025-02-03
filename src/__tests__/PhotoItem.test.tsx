import { vi } from "vitest";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import { PhotoItem } from "../components/PhotoItem";
import { MemoryRouter } from "react-router-dom";
import { Photo } from "../types";

const samplePhoto: Photo = {
  id: 1,
  alt: "Sample Photo",
  photographer: "John Doe",
  src: {
    small: "https://example.com/photo-small.jpg",
    medium: "https://example.com/photo-medium.jpg",
    large: "https://example.com/photo-large.jpg",
    large2x: "https://example.com/photo-large2x.jpg",
    portrait: "https://example.com/photo-portrait.jpg",
    landscape: "https://example.com/photo-landscape.jpg",
    tiny: "https://example.com/photo-tiny.jpg",
    original: "https://example.com/photo-original.jpg",
  },
  width: 800,
  height: 600,
  url: "https://example.com/photo",
  photographer_url: "https://example.com/photographer",
  photographer_id: 123,
  avg_color: "#ffffff",
  liked: false,
};

describe("PhotoItem component", () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  it("renders the image with the correct alt text", () => {
    render(
      <MemoryRouter>
        <PhotoItem photo={samplePhoto} />
      </MemoryRouter>
    );
    const imgElement = screen.getByAltText("Sample Photo");
    expect(imgElement).toBeInTheDocument();
  });

  it("calls navigate when the component is clicked", () => {
    render(
      <MemoryRouter>
        <PhotoItem photo={samplePhoto} />
      </MemoryRouter>
    );
    const container = screen.getByAltText("Sample Photo").parentElement;
    if (container) {
      fireEvent.click(container);
      expect(navigateMock).toHaveBeenCalledTimes(1);
    }
  });
});
