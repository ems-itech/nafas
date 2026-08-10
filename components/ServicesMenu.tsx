"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MenuRow = { name: string; price?: number; refill?: number; prices?: Array<number | null> };
type MenuSection = {
  title: string;
  rows: MenuRow[];
  priceLabels?: [string, string];
  priceColumns?: string[];
};
type MenuCard = { eyebrow: string; title: string; sections: MenuSection[] };

const menuCards: MenuCard[] = [
  {
    eyebrow: "Nafas Hair Beauty Bar",
    title: "Hair & Scalp Therapy",
    sections: [
      { title: "Dermapen Hair Growth", rows: [
        { name: "Single session", price: 35 }, { name: "3 sessions", price: 90 },
        { name: "6 sessions", price: 150 }, { name: "8 sessions", price: 180 },
        { name: "After Care Serum", price: 70 },
      ] },
      { title: "Hair Treatment · 20 Mins", rows: [
        { name: "Single session", price: 25 }, { name: "3 sessions", price: 65 },
        { name: "6 sessions", price: 120 },
      ] },
      { title: "Nafas Head Spa & Hair Treatment", rows: [
        { name: "90 minutes session", price: 65 },
      ] },
    ],
  },
  {
    eyebrow: "Nafas Nail Bar",
    title: "Pedicure",
    sections: [{ title: "Pedicure", rows: [
      { name: "Pedicure with no color", price: 10 },
      { name: "Pedicure with normal color", price: 12 },
      { name: "Normal French", price: 5 }, { name: "Normal color", price: 3 },
      { name: "Pedicure with gel color", price: 25 },
      { name: "Pedicure with gel color & hardener", price: 35 },
      { name: "Gel extension, gel color & clean", price: 60 },
      { name: "Soft gel extension, gel color & clean", price: 45 },
      { name: "Fake nails, normal color & clean", price: 20 },
      { name: "Fake nails, gel color & clean", price: 30 },
      { name: "Refill gel extension", price: 45 },
      { name: "Refill soft gel extension", price: 35 },
      { name: "Refill 1 nail gel extension", price: 5 },
      { name: "Refill 1 nail soft gel extension", price: 3 },
      { name: "Remove gel color", price: 5 },
      { name: "Remove gel extension or soft gel extension", price: 10 },
      { name: "Callus & heel repair treatment", price: 25 },
      { name: "Paraffin wax treatments", price: 6 },
    ] }],
  },
  {
    eyebrow: "Nafas Eye Beauty Bar",
    title: "Lashes & Eyebrows",
    sections: [
      { title: "Lash Extensions", priceLabels: ["Full Sets", "Refill"], rows: [
        { name: "Silk lashes", price: 60 },
        { name: "Classic lashes", price: 45, refill: 25 },
        { name: "L-shape lashes", price: 50, refill: 30 },
        { name: "Soft volume lashes (2D)", price: 55, refill: 35 },
        { name: "Volume lashes (3D)", price: 65, refill: 45 },
        { name: "Mega lashes (4D)", price: 70, refill: 50 },
        { name: "Removal", price: 10 },
      ] },
      { title: "LVL Lash Lift & Eyebrow Lamination", rows: [
        { name: "Lash Lift (LVL)", price: 25 },
        { name: "Eyebrow lamination", price: 35 },
      ] },
    ],
  },
  {
    eyebrow: "Nafas Relax Bar",
    title: "Relaxing Massage",
    sections: [
      { title: "60 Mins Massage", rows: [
        { name: "Strong massage", price: 50 }, { name: "Soft massage", price: 50 },
        { name: "Aroma massage", price: 55 }, { name: "Hot stones massage", price: 55 },
      ] },
      { title: "45 Mins Massage", rows: [
        { name: "Strong massage", price: 40 }, { name: "Soft massage", price: 40 },
        { name: "Aroma massage", price: 45 }, { name: "Hot stones massage", price: 45 },
        { name: "Nafas Head Spa", price: 45 },
      ] },
      { title: "30 Mins Massage", rows: [
        { name: "Strong massage", price: 30 }, { name: "Soft massage", price: 30 },
        { name: "Aroma massage", price: 35 }, { name: "Hot stones massage", price: 35 },
      ] },
      { title: "15 Mins Massage", rows: [
        { name: "Strong massage", price: 15 }, { name: "Soft massage", price: 15 },
      ] },
    ],
  },
  {
    eyebrow: "Nafas Nail Bar",
    title: "Manicure",
    sections: [{ title: "Manicure", rows: [
      { name: "Manicure with no color", price: 6 },
      { name: "Manicure with normal color", price: 8 },
      { name: "Normal French", price: 5 }, { name: "Normal color", price: 3 },
      { name: "Manicure with gel color", price: 20 },
      { name: "Manicure with gel color & hardener", price: 30 },
      { name: "Gel extension, gel color & clean", price: 50 },
      { name: "Soft gel extension, gel color & clean", price: 35 },
      { name: "Fake nails, gel color & clean", price: 25 },
      { name: "Fake nails, normal color & clean", price: 15 },
      { name: "Refill gel extension", price: 35 },
      { name: "Refill soft gel extension", price: 25 },
      { name: "Refill 1 nail gel extension", price: 5 },
      { name: "Refill 1 nail soft gel extension", price: 3 },
      { name: "Remove gel color", price: 5 },
      { name: "Remove gel extension or soft gel extension", price: 10 },
      { name: "Paraffin wax treatments", price: 6 },
      { name: "Manicure & pedicure with no color", price: 15 },
      { name: "Manicure & pedicure with normal color", price: 20 },
      { name: "Manicure & pedicure with gel color", price: 40 },
    ] }],
  },
  {
    eyebrow: "Nafas Skin Bar",
    title: "Skin Care & Skin Therapy",
    sections: [
      { title: "Facial & Hydrafacial", rows: [
        { name: "Nafas Express Clean Facial", price: 20 },
        { name: "Nafas Classic Facial (Clean)", price: 30 },
        { name: "Nafas Hydra Facial (Hydrate)", price: 45 },
        { name: "Nafas Hydra Face Gym (Revive)", price: 55 },
        { name: "Nafas Ultimate Glow Ritual (Ultimate Glow)", price: 65 },
        { name: "Nafas Oxy Glow & Hydration Facial", price: 30 },
        { name: "Nafas MCA35 Glow & Renew Facial", price: 20 },
      ] },
      { title: "Microneedling & Mesotherapy", rows: [
        { name: "RF Microneedling", price: 150 }, { name: "Nafas Dermapen", price: 75 },
        { name: "Amber Stimulate", price: 60 }, { name: "Salmon DNA", price: 45 },
        { name: "Hydration", price: 45 }, { name: "Whitening", price: 45 },
        { name: "Wide Pores", price: 45 }, { name: "Antiaging", price: 45 },
        { name: "Acne & Oily Skin", price: 45 }, { name: "Lip Tinting", price: 5 },
        { name: "Velvet Hands", price: 10 },
      ] },
    ],
  },
  {
    eyebrow: "Lymphatic Drainage",
    title: "Wood Therapy & G9 Vibration",
    sections: [
      { title: "45 Mins Massage", rows: [
        { name: "Single session", price: 45 }, { name: "Five sessions", price: 200 },
        { name: "Ten sessions", price: 360 },
      ] },
      { title: "60 Mins Massage", rows: [
        { name: "Single session", price: 50 }, { name: "Five sessions", price: 225 },
        { name: "Ten sessions", price: 400 },
      ] },
    ],
  },
  {
    eyebrow: "Lymphatic Drainage",
    title: "Wood Therapy",
    sections: [
      { title: "15 Mins Massage", rows: [
        { name: "Single session", price: 15 }, { name: "Five sessions", price: 65 },
        { name: "Ten sessions", price: 120 },
      ] },
      { title: "30 Mins Massage", rows: [
        { name: "Single session", price: 30 }, { name: "Five sessions", price: 135 },
        { name: "Ten sessions", price: 240 },
      ] },
      { title: "45 Mins Massage", rows: [
        { name: "Single session", price: 35 }, { name: "Five sessions", price: 155 },
        { name: "Ten sessions", price: 280 },
      ] },
      { title: "60 Mins Massage", rows: [
        { name: "Single session", price: 40 }, { name: "Five sessions", price: 180 },
        { name: "Ten sessions", price: 320 },
      ] },
    ],
  },
  {
    eyebrow: "Lymphatic Drainage",
    title: "G9 Vibration",
    sections: [
      { title: "15 Mins Massage", rows: [
        { name: "Single session", price: 15 }, { name: "Five sessions", price: 65 },
        { name: "Ten sessions", price: 120 },
      ] },
      { title: "30 Mins Massage", rows: [
        { name: "Single session", price: 35 }, { name: "Five sessions", price: 155 },
        { name: "Ten sessions", price: 280 },
      ] },
      { title: "45 Mins Massage", rows: [
        { name: "Single session", price: 40 }, { name: "Five sessions", price: 180 },
        { name: "Ten sessions", price: 320 },
      ] },
    ],
  },
  {
    eyebrow: "Nafas Body Bar",
    title: "Waxing & Threading",
    sections: [
      { title: "Face & Body Wax", rows: [
        { name: "Full body", price: 35 }, { name: "Full body & full back", price: 40 },
        { name: "Half body", price: 25 }, { name: "Half arm", price: 5 },
        { name: "Full arm", price: 8 }, { name: "Half legs", price: 10 },
        { name: "Full legs", price: 15 }, { name: "Bikini", price: 10 },
        { name: "Under arm", price: 5 }, { name: "Full back", price: 5 },
        { name: "Butt, lower back (if any)", price: 5 }, { name: "Tummy", price: 5 },
        { name: "Upper lip", price: 3 }, { name: "Full face", price: 12 },
      ] },
      { title: "Face Thread", rows: [
        { name: "Eyebrows", price: 5 }, { name: "Upper lip", price: 2 },
        { name: "Eyebrows & upper lip", price: 6 }, { name: "Full face", price: 10 },
      ] },
    ],
  },
  {
    eyebrow: "Nafas Skin Therapy",
    title: "Microneedling & Mesotherapy",
    sections: [
      { title: "Single Session", priceColumns: ["Face", "Neck", "Full", "Eyes"], rows: [
        { name: "RF Microneedling", prices: [null, null, 150, 40] },
        { name: "Nafas Dermapen", prices: [null, null, 75, null] },
        { name: "Amber Stimulate", prices: [50, 25, 60, null] },
        { name: "Salmon DNA", prices: [40, 15, 45, 10] },
        { name: "Hydration", prices: [40, 15, 45, 10] },
        { name: "Whitening", prices: [40, 15, 45, null] },
        { name: "Wide Pores", prices: [40, 15, 45, null] },
        { name: "Antiaging", prices: [40, 15, 45, null] },
        { name: "Acne & Oily Skin", prices: [40, 15, 45, null] },
        { name: "Lip Tinting / Hydration", prices: [null, null, 5, null] },
        { name: "Velvet Hands", prices: [null, null, 10, null] },
      ] },
      { title: "Three Sessions", priceColumns: ["Face", "Neck", "Full", "Eyes"], rows: [
        { name: "RF Microneedling", prices: [null, null, 380, 100] },
        { name: "Nafas Dermapen", prices: [null, null, 190, null] },
        { name: "Amber Stimulate", prices: [125, 60, 150, null] },
        { name: "Salmon DNA", prices: [100, 35, 115, 25] },
        { name: "Hydration", prices: [100, 35, 115, 25] },
        { name: "Whitening", prices: [100, 35, 115, null] },
        { name: "Wide Pores", prices: [100, 35, 115, null] },
        { name: "Antiaging", prices: [100, 35, 115, null] },
        { name: "Acne & Oily Skin", prices: [100, 35, 115, null] },
        { name: "Lip Tinting / Hydration", prices: [null, null, 10, null] },
        { name: "Velvet Hands", prices: [null, null, 25, null] },
      ] },
    ],
  },
];

function PriceRow({ row, hasRefill }: { row: MenuRow; hasRefill: boolean }) {
  return (
    <div className={`grid items-baseline gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/75 sm:text-xs ${hasRefill ? "grid-cols-[1fr_auto_auto]" : "grid-cols-[1fr_auto]"}`}>
      <span>{row.name}</span>
      <span className="whitespace-nowrap font-semibold text-primary">{row.price} JOD</span>
      {hasRefill ? <span className="w-12 whitespace-nowrap text-end font-semibold text-primary">{row.refill ? `${row.refill} JOD` : "—"}</span> : null}
    </div>
  );
}

export default function ServicesMenu() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function moveSlider(direction: -1 | 1) {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector<HTMLElement>("[data-menu-card]");
    const distance = card ? card.offsetWidth + 24 : slider.clientWidth;
    slider.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background pb-24 pt-8 sm:pb-32 sm:pt-12">
        <div aria-hidden="true" className="absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        <div className="container-narrow relative">

          <div className="group/slider relative mx-auto w-full max-w-5xl">
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overflow-y-hidden px-1 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {menuCards.map((menu, index) => (
                <article key={menu.title} data-menu-card className="w-full shrink-0 snap-center">
                  <div className="flex h-[680px] flex-col rounded-[2rem] border border-primary/15 bg-[linear-gradient(145deg,hsl(var(--card)),hsl(var(--secondary)/.72))] px-5 py-7 sm:h-[760px] sm:rounded-[2.75rem] sm:px-12 sm:py-10 lg:px-20">
                    <div className="mx-auto mb-7 w-full max-w-3xl shrink-0 text-center sm:mb-9">
                      <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">{menu.eyebrow}</p>
                      <h2 className="mt-2 text-3xl sm:text-5xl">{menu.title}</h2>
                    </div>

                    <div className="menu-scrollbar mx-auto w-full max-w-3xl flex-1 space-y-8 overflow-y-auto pe-2 sm:space-y-10 sm:pe-4">
                      {menu.sections.map((section) => (
                        <section key={section.title}>
                          <div className="mb-3 flex items-end justify-between gap-3 border-b border-primary/25 pb-2">
                            <h4 className="font-serif text-xl font-medium text-primary sm:text-2xl">{section.title}</h4>
                            {section.priceLabels ? (
                              <div className="grid shrink-0 grid-cols-2 gap-3 font-sans text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                                <span>{section.priceLabels[0]}</span><span>{section.priceLabels[1]}</span>
                              </div>
                            ) : null}
                          </div>
                          {section.priceColumns ? (
                            <div className="overflow-x-auto pb-2">
                              <table className="w-full min-w-[620px] table-fixed border-collapse font-sans">
                                <colgroup>
                                  <col className="w-[40%]" />
                                  {section.priceColumns.map((column) => <col key={column} />)}
                                </colgroup>
                                <thead className="sticky top-0 z-[1] bg-card/95 backdrop-blur-sm">
                                  <tr className="border-b border-primary/25">
                                    <th scope="col" className="px-3 py-3 text-start text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Service</th>
                                    {section.priceColumns.map((column) => (
                                      <th key={column} scope="col" className="px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{column}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.rows.map((row) => (
                                    <tr key={row.name} className="border-b border-primary/10 last:border-0">
                                      <th scope="row" className="px-3 py-3 text-start text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/75 sm:text-xs">{row.name}</th>
                                      {row.prices?.map((price, priceIndex) => (
                                        <td key={`${row.name}-${section.priceColumns?.[priceIndex]}`} className="px-2 py-3 text-center text-[10px] font-semibold text-primary sm:text-xs">
                                          <span className="whitespace-nowrap">{price === null ? "—" : `${price} JOD`}</span>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="space-y-2.5">
                              {section.rows.map((row) => <PriceRow key={row.name} row={row} hasRefill={Boolean(section.priceLabels)} />)}
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                    <div className="mx-auto mt-5 w-full max-w-3xl shrink-0 border-t border-primary/15 pt-4 text-center">
                      <span className="font-ui text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(menuCards.length).padStart(2, "0")}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" onClick={() => moveSlider(-1)} className="absolute -left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/25 bg-card/95 text-primary shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground sm:-left-5 sm:h-14 sm:w-14 sm:opacity-0 sm:group-hover/slider:opacity-100 sm:focus:opacity-100" aria-label="Previous menu">
              <ChevronLeft size={21} />
            </button>
            <button type="button" onClick={() => moveSlider(1)} className="absolute -right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/25 bg-card/95 text-primary shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground sm:-right-5 sm:h-14 sm:w-14 sm:opacity-0 sm:group-hover/slider:opacity-100 sm:focus:opacity-100" aria-label="Next menu">
              <ChevronRight size={21} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
