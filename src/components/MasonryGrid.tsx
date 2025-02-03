import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PhotoItem } from "./PhotoItem";
import { VirtualizedItem } from "./VirtualizedItem";
import { Photo } from "../types";

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
`;

const Column = styled.div`
  flex: 1;
  margin: 4px;
`;

interface MasonryGridProps {
  photos: Photo[];
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ photos }) => {
  const [columns, setColumns] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setColumns(1);
      else if (width < 900) setColumns(2);
      else setColumns(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnPhotos: Photo[][] = Array.from({ length: columns }, () => []);
  photos.forEach((photo, idx) => {
    columnPhotos[idx % columns].push(photo);
  });

  return (
    <Container>
      {columnPhotos.map((colPhotos, i) => (
        <Column key={i}>
          {colPhotos.map((photo) => (
            <VirtualizedItem key={photo.id} placeholderHeight={200}>
              <PhotoItem photo={photo} />
            </VirtualizedItem>
          ))}
        </Column>
      ))}
    </Container>
  );
};
