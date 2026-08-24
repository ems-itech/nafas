export type MenuRow = { name: string; price: number; refill?: number };
export type MenuSection = {
  title: string;
  rows: MenuRow[];
  priceLabels?: [string, string];
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
      { title: "Single Session", rows: [
        { name: "RF Microneedling Full", price: 150 },
        { name: "RF Microneedling Eyes", price: 40 },
        { name: "Nafas Dermapen Full", price: 75 },
        { name: "Amber Stimulate Face", price: 50 },
        { name: "Amber Stimulate Neck", price: 25 },
        { name: "Amber Stimulate Full", price: 60 },
        { name: "Salmon DNA Face", price: 40 },
        { name: "Salmon DNA Neck", price: 15 },
        { name: "Salmon DNA Full", price: 45 },
        { name: "Salmon DNA Eyes", price: 10 },
        { name: "Hydration Face", price: 40 },
        { name: "Hydration Neck", price: 15 },
        { name: "Hydration Full", price: 45 },
        { name: "Hydration Eyes", price: 10 },
        { name: "Whitening Face", price: 40 },
        { name: "Whitening Neck", price: 15 },
        { name: "Whitening Full", price: 45 },
        { name: "Wide Pores Face", price: 40 },
        { name: "Wide Pores Neck", price: 15 },
        { name: "Wide Pores Full", price: 45 },
        { name: "Antiaging Face", price: 40 },
        { name: "Antiaging Neck", price: 15 },
        { name: "Antiaging Full", price: 45 },
        { name: "Acne & Oily Skin Face", price: 40 },
        { name: "Acne & Oily Skin Neck", price: 15 },
        { name: "Acne & Oily Skin Full", price: 45 },
        { name: "Lip Tinting / Hydration Full", price: 5 },
        { name: "Velvet Hands Full", price: 10 },
      ] },
      { title: "Three Sessions", rows: [
        { name: "RF Microneedling Full", price: 380 },
        { name: "RF Microneedling Eyes", price: 100 },
        { name: "Nafas Dermapen Full", price: 190 },
        { name: "Amber Stimulate Face", price: 125 },
        { name: "Amber Stimulate Neck", price: 60 },
        { name: "Amber Stimulate Full", price: 150 },
        { name: "Salmon DNA Face", price: 100 },
        { name: "Salmon DNA Neck", price: 35 },
        { name: "Salmon DNA Full", price: 115 },
        { name: "Salmon DNA Eyes", price: 25 },
        { name: "Hydration Face", price: 100 },
        { name: "Hydration Neck", price: 35 },
        { name: "Hydration Full", price: 115 },
        { name: "Hydration Eyes", price: 25 },
        { name: "Whitening Face", price: 100 },
        { name: "Whitening Neck", price: 35 },
        { name: "Whitening Full", price: 115 },
        { name: "Wide Pores Face", price: 100 },
        { name: "Wide Pores Neck", price: 35 },
        { name: "Wide Pores Full", price: 115 },
        { name: "Antiaging Face", price: 100 },
        { name: "Antiaging Neck", price: 35 },
        { name: "Antiaging Full", price: 115 },
        { name: "Acne & Oily Skin Face", price: 100 },
        { name: "Acne & Oily Skin Neck", price: 35 },
        { name: "Acne & Oily Skin Full", price: 115 },
        { name: "Lip Tinting / Hydration Full", price: 10 },
        { name: "Velvet Hands Full", price: 25 },
      ] },
    ],
  },
];
