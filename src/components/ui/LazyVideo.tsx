"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  /** Path without extension, e.g. "/media/video/education" — .webm and .mp4 are both served */
  src: string;
  poster: string;
  /** Set false for videos that only exist as MP4 */
  webm?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

/**
 * Muted, looping background video that downloads nothing but its poster until
 * it scrolls near the viewport. autoPlay ignores preload="none", so the
 * <source> elements are only rendered once the video is in view.
 */
export default function LazyVideo({ src, poster, webm = true, className, style, ...rest }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    el.load();
    el.play().catch(() => {});
  }, [inView]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      style={style}
      aria-hidden={rest["aria-hidden"]}
    >
      {inView && webm && <source src={`${src}.webm`} type="video/webm" />}
      {inView && <source src={`${src}.mp4`} type="video/mp4" />}
    </video>
  );
}
