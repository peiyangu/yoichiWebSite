"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";

const STORAGE_KEY = "yoruichi_loaded";

export default function ClientWrapper({ children }: { children?: React.ReactNode }) {
  // null = 未判定（SSR / hydration 前）
  const [showLoading, setShowLoading] = useState<boolean | null>(null);

  useEffect(() => {
    // hydration 後のみ sessionStorage にアクセス
    const alreadyLoaded = sessionStorage.getItem(STORAGE_KEY);
    setShowLoading(alreadyLoaded === null); // 初回なら true
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoading === true && (
          <LoadingScreen onComplete={handleComplete} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
