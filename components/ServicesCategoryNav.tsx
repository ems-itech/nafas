"use client";

import { useEffect, useState } from "react";
import styles from "./ServicesMenu.module.css";

export default function ServicesCategoryNav({ categories }: { categories: { id: string; title: string }[] }) {
  const [active, setActive] = useState(categories[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-90px 0px -70% 0px" });
    categories.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [categories]);

  return <nav className={styles.categoryNav} aria-label="Service categories"><div className={styles.navInner}>{categories.map(({ id, title }) => <a key={id} href={`#${id}`} className={active === id ? styles.activePill : ""} aria-current={active === id ? "location" : undefined}>{title}</a>)}</div></nav>;
}
