import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MasonryGrid } from "../components/MasonryGrid";
import { Photo } from "../types";
import { fetchPhotos, searchPhotos } from "../services/pexelsApi";

const Container = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

const HomePage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  const loadPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      let results: Photo[];
      if (query.trim() === "") {
        results = await fetchPhotos();
      } else {
        results = await searchPhotos(query);
      }
      setPhotos(results);
    } catch (err) {
      setError(`Failed to fetch photos. Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Search photos by keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton onClick={loadPhotos}>Search</SearchButton>
      </Controls>
      {loading && <div>Loading photos...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && <MasonryGrid photos={photos} />}
    </Container>
  );
};

export default HomePage;
