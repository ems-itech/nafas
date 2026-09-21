"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ServicesMenu.module.css";

export default function ServicesCategoryNav({ categories }: { categories: { id: string; title: string }[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-90px 0px -70% 0px" });
    categories.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    if (!active) return;
    const container = navInnerRef.current;
    const activeLink = linkRefs.current[active];
    if (!container || !activeLink) return;

    const left = activeLink.offsetLeft - (container.clientWidth - activeLink.offsetWidth) / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav className={styles.categoryNav} aria-label="Service categories">
      <div className={styles.navInner} ref={navInnerRef}>
        {categories.map(({ id, title }) => (
          <a
            key={id}
            ref={(node) => { linkRefs.current[id] = node; }}
            href={`#${id}`}
            className={active === id ? styles.activePill : ""}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setActive(id)}
          >
            {title}
          </a>
        ))}
      </div>
    </nav>
  );
}
