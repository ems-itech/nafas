export type MenuRow = { name: string; price?: number; refill?: number; prices?: Array<number | null> };
export type MenuSection = {
  title: string;
  rows: MenuRow[];
  priceLabels?: [string, string];
  priceColumns?: string[];
};
export type MenuCard = { eyebrow: string; title: string; sections: MenuSection[] };

export const menuCards: MenuCard[] = [
  {
    eyebrow: "Nafas Hair Beauty Bar",
    title: "Hair & Scalp Therapy",
    sections: [
      { title: "Dermapen Hair Growth", rows: [
        { name: "Single session", price: 35 }, { name: "3 sessions", price: 90 },
        { name: "6 sessions", price: 150 }, { name: "8 sessions", price: 180 },
        { name: "After Care Serum", price: 70 },
      ] },
      { title: "Hair Treatment - 20 Mins", rows: [
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
      { name: "Pedicure with jell color", price: 25 },
      { name: "Pedicure with jell color & hardener", price: 35 },
      { name: "Jell extension, jell color & clean", price: 60 },
      { name: "Soft jell extension, jell color & clean", price: 45 },
      { name: "Fake nails, normal color & clean", price: 20 },
      { name: "Fake nails, jell color & clean", price: 30 },
      { name: "Refill jell extension", price: 45 },
      { name: "Refill soft jell extension", price: 35 },
      { name: "Refill 1 nail jell extension", price: 5 },
      { name: "Refill 1 nail soft jell extension", price: 3 },
      { name: "Remove jell color", price: 5 },
      { name: "Remove jell extension or soft jell extension", price: 10 },
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
      { name: "Manicure with jell color", price: 20 },
      { name: "Manicure with jell color & hardener", price: 30 },
      { name: "Jell extension, jell color & clean", price: 50 },
      { name: "Soft jell extension, jell color & clean", price: 35 },
      { name: "Fake nails, jell color & clean", price: 25 },
      { name: "Fake nails, normal color & clean", price: 15 },
      { name: "Refill jell extension", price: 35 },
      { name: "Refill soft jell extension", price: 25 },
      { name: "Refill 1 nail jell extension", price: 5 },
      { name: "Refill 1 nail soft jell extension", price: 3 },
      { name: "Remove jell color", price: 5 },
      { name: "Remove jell extension or soft jell extension", price: 10 },
      { name: "Paraffin wax treatments", price: 6 },
      { name: "Manicure & pedicure with no color", price: 15 },
      { name: "Manicure & pedicure with normal color", price: 20 },
      { name: "Manicure & pedicure with jell color", price: 40 },
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
        { name: "RF Microneedling", price: 150 },
        { name: "Nafas Dermapen", price: 75 },
        { name: "Amber Stimulate", price: 60 },
        { name: "Salmon DNA", price: 45 },
        { name: "Hydration", price: 45 },
        { name: "Whitening", price: 45 },
        { name: "Wide Pores", price: 45 },
        { name: "Antiaging", price: 45 },
        { name: "Acne & Oily Skin", price: 45 },
        { name: "Lip Tinting", price: 5 },
        { name: "Velvet Hands", price: 10 },
      ] },
    ],
  },
  {
    eyebrow: "Lymphatic Drainage",
    title: "Wood Therapy & G9 Vibration",
    sections: [
      { title: "45 Mins Massage", rows: [
        { name: "Single session", price: 45 }, { name: "Five session", price: 200 },
        { name: "Ten session", price: 360 },
      ] },
      { title: "60 Mins Massage", rows: [
        { name: "Single session", price: 50 }, { name: "Five session", price: 225 },
        { name: "Ten session", price: 400 },
      ] },
    ],
  },
  {
    eyebrow: "Lymphatic Drainage",
    title: "Wood Therapy",
    sections: [
      { title: "15 Mins Massage", rows: [
        { name: "Single session", price: 15 }, { name: "Five session", price: 65 },
        { name: "Ten session", price: 120 },
      ] },
      { title: "30 Mins Massage", rows: [
        { name: "Single session", price: 30 }, { name: "Five session", price: 135 },
        { name: "Ten session", price: 240 },
      ] },
      { title: "45 Mins Massage", rows: [
        { name: "Single session", price: 35 }, { name: "Five session", price: 155 },
        { name: "Ten session", price: 280 },
      ] },
      { title: "60 Mins Massage", rows: [
        { name: "Single session", price: 40 }, { name: "Five session", price: 180 },
        { name: "Ten session", price: 320 },
      ] },
    ],
  },
  {
    eyebrow: "Lymphatic Drainage",
    title: "G9 Vibration",
    sections: [
      { title: "15 Mins Massage", rows: [
        { name: "Single session", price: 15 }, { name: "Five session", price: 65 },
        { name: "Ten session", price: 120 },
      ] },
      { title: "30 Mins Massage", rows: [
        { name: "Single session", price: 35 }, { name: "Five session", price: 155 },
        { name: "Ten session", price: 280 },
      ] },
      { title: "45 Mins Massage", rows: [
        { name: "Single session", price: 40 }, { name: "Five session", price: 180 },
        { name: "Ten session", price: 320 },
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
      { title: "Single Session", priceColumns: ["Face", "Nick", "Full", "Eyes"], rows: [
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
      { title: "Three Sessions", priceColumns: ["Face", "Nick", "Full", "Eyes"], rows: [
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
