"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TopOnNavigate() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [pathname, search]);

  return null;
}

export default function ScrollTop() {
  return (
    <Suspense fallback={null}>
      <TopOnNavigate />
    </Suspense>
  );
}
