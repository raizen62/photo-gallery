import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Photo } from "../types";

const Container = styled.div`
  padding: 16px;
`;
const Image = styled.img`
  width: 100%;
  max-width: 800px;
  display: block;
  margin: 0 auto;
`;
const Info = styled.div`
  margin-top: 16px;
  text-align: center;
`;
const BackButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  cursor: pointer;
`;

const PhotoDetail: React.FC = () => {
  const location = useLocation() as { state: { photo: Photo } | undefined };
  const navigate = useNavigate();
  const photo = location.state?.photo;

  if (!photo) {
    return <div>Photo not found.</div>;
  }

  return (
    <Container>
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
        <Image src={photo.src.large} alt={photo.alt} loading="lazy" />
      </picture>
      <Info>
        <h2>{photo.alt || "Untitled"}</h2>
        <p>Photographer: {photo.photographer}</p>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </Info>
    </Container>
  );
};

export default PhotoDetail;
