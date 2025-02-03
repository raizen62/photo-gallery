import React, { useState, useRef, useEffect } from "react";

interface VirtualizedItemProps {
  placeholderHeight: number;
  children: React.ReactNode;
}

export const VirtualizedItem: React.FC<VirtualizedItemProps> = ({
  placeholderHeight,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: placeholderHeight }}>
      {isVisible ? children : null}
    </div>
  );
};
