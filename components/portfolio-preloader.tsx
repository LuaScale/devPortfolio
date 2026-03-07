"use client";

import { useState, useEffect } from "react";
import Preloader from "./preloader";

export function PortfolioPreloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader
        loading={loading}
        variant="stairs"
        position="fixed"
        duration={1800}
        loadingText="booting portfolio..."
        zIndex={100}
        bgColor="#0a0a0a"
        stairCount={10}
        stairsRevealFrom="left"
        stairsRevealDirection="up"
      />
      {children}
    </>
  );
}
