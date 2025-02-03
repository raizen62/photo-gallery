import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Photo } from "../types";

const Image = styled.img`
  position: "absolute";
  top: 0;
  left: 0;
  width: "100%";
  height: "100%";
`;

const Skeleton = styled.div`
  position: "absolute";
  top: 0;
  left: 0;
  width: "100%";
  height: "100%";
  background: "#f0f0f0";
`;

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItemComponent: React.FC<PhotoItemProps> = ({ photo }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(() => {
    navigate(`/photo/${photo.id}`, { state: { photo } });
  }, [navigate, photo]);

  const ratio = photo.width / photo.height;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        background: "#eee",
        marginBottom: "8px",
      }}
      onClick={handleClick}
    >
      <picture>
        <source
          type="image/avif"
          srcSet={`
            ${photo.src.small}&fm=avif 480w,
            ${photo.src.medium}&fm=avif 800w,
            ${photo.src.large}&fm=avif 1200w,
            ${photo.src.large2x}&fm=avif 1600w
          `}
          sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, (max-width: 1200px) 1200px, 1600px"
        />
        <source
          type="image/webp"
          srcSet={`
            ${photo.src.small}&fm=webp 480w,
            ${photo.src.medium}&fm=webp 800w,
            ${photo.src.large}&fm=webp 1200w,
            ${photo.src.large2x}&fm=webp 1600w
          `}
          sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, (max-width: 1200px) 1200px, 1600px"
        />
        <Image
          src={photo.src.large}
          alt={photo.alt}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </picture>

      {!isLoaded && <Skeleton />}
    </div>
  );
};

export const PhotoItem = React.memo(PhotoItemComponent);
