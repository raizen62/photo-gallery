# Virtualized Masonry Grid Photo Gallery

This project is a single-page application (SPA) built with React, TypeScript, and styled-components. It showcases a responsive, virtualized masonry grid layout that displays photos fetched from the Pexels API. The application also includes a detailed photo view and a search feature, along with several performance optimizations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Design Decisions and Optimizations](#design-decisions-and-optimizations)
- [Testing](#testing)

## Features

- **Virtualized Masonry Grid:**
  Efficient rendering of a large number of photos without the overhead of rendering off-screen items.

- **Photo Detail View:**
  View a selected photo in detail with additional information such as title, photographer, and more.

- **Search Functionality:**
  Dynamically search for photos using the Pexels API.

- **Responsive Images:**
  Utilizes the `<picture>` element along with `srcSet` and `sizes` to serve appropriate image resolutions and next‑gen formats (WebP/AVIF).

- **Performance Optimizations:**

  - Code splitting with React.lazy and Suspense
  - Lazy loading and virtualization of image components
  - Preconnect hints for external resources
  - Minification of JavaScript using esbuild (or Terser if customized)

- **Built With:**
  React, TypeScript, styled-components, and React Router v7.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or using yarn:
   yarn install
   ```

3. **Create a `.env` File:**

   Rename `.env.copy` into `.env` file in the root directory and add the following environment variables:

   ```bash
   VITE_PEXELS_API_KEY=your_pexels_api_key
   ```

4. **Build the project:**

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Start the Preview Server:**
   ```bash
   npm run preview
   # or using yarn:
   yarn preview
   ```

## Design Decisions and Optimizations

### Virtualized Masonry Grid

- **Custom Layout**:
  - Implemented a responsive masonry grid without external layout libraries to reduce bundle size.
- **Virtualization**:
  - Each photo is wrapped in a VirtualizedItem component that uses the IntersectionObserver API to render only images near the viewport.

### Image Optimization

- **Responsive Images & Next‑Gen Formats**:
  - The <picture> element is used with multiple srcSet candidates (small, medium, large, and large2x) along with the sizes attribute. This ensures that the browser downloads the appropriate resolution based on the device’s viewport.
- **URL Query Parameter Management**:
  - Image URLs provided by the Pexels API already include query parameters. The project simply appends additional parameters (e.g., &fm=avif or &fm=webp) to serve next‑gen formats without breaking the URL structure.

### Code Splitting and Lazy Loading

- **Dynamic Imports**:
  - Routes and heavy components are loaded using React.lazy and Suspense to improve initial load performance.
- **JS Minification**:
  - Vite’s default esbuild-based minification is used, with the option to switch to Terser if further customization is needed.

### API Integration & Search

- **Pexels API**:
  - The app fetches curated photos and supports search functionality by querying the Pexels API.
- **Environment Variables**:
  - API keys are stored in environment variables (prefixed with VITE\_) and injected at build time.

### Additional Performance Enhancements

- **Preconnect Hints**:
  - Preconnect tags in the HTML head help reduce connection setup time for external resources (e.g., Pexels API).
- **Lazy Loading**:
  - Images are lazy loaded to reduce initial load times and improve perceived performance.
- **Memoization**:
  - Components and functions are memoized (using React.memo, useCallback, and useMemo) to prevent unnecessary re-renders.

## Testing

```bash
npm run test
# or using yarn:
yarn test
```
