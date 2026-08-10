"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServicesMenuSlider({ children }: { children: ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maximumScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    setCanGoBack(slider.scrollLeft > 1);
    setCanGoForward(slider.scrollLeft < maximumScroll - 1);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateControls();
    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(slider);
    slider.addEventListener("scroll", updateControls, { passive: true });

    return () => {
      resizeObserver.disconnect();
      slider.removeEventListener("scroll", updateControls);
    };
  }, [updateControls]);

  function moveSlider(direction: -1 | 1) {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll<HTMLElement>("[data-menu-card]"));
    if (!cards.length) return;

    const sliderLeft = slider.getBoundingClientRect().left;
    const cardPositions = cards.map(
      (card) => card.getBoundingClientRect().left - sliderLeft + slider.scrollLeft,
    );
    const currentIndex = cardPositions.reduce((closest, position, index) =>
      Math.abs(position - slider.scrollLeft) < Math.abs(cardPositions[closest] - slider.scrollLeft)
        ? index
        : closest,
    0);
    const nextIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));

    slider.scrollTo({ left: cardPositions[nextIndex], behavior: "smooth" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveSlider(event.key === "ArrowLeft" ? -1 : 1);
  }

  const buttonClassName = "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/25 bg-card/95 text-primary shadow-lg backdrop-blur transition-all enabled:hover:scale-105 enabled:hover:bg-primary enabled:hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-0 sm:h-14 sm:w-14 sm:opacity-0 sm:group-hover/slider:enabled:opacity-100 sm:focus:opacity-100";

  return (
    <div className="group/slider relative mx-auto w-full max-w-5xl">
      <div
        ref={sliderRef}
        aria-label="Services menu carousel"
        className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overflow-y-hidden px-1 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {children}
      </div>

      <button type="button" onClick={() => moveSlider(-1)} disabled={!canGoBack} className={`${buttonClassName} -left-2 sm:-left-5`} aria-label="Previous menu">
        <ChevronLeft size={21} />
      </button>
      <button type="button" onClick={() => moveSlider(1)} disabled={!canGoForward} className={`${buttonClassName} -right-2 sm:-right-5`} aria-label="Next menu">
        <ChevronRight size={21} />
      </button>
    </div>
  );
}
