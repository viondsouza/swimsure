/** Future programmes shown in the "Coming next" section. Photos are free Unsplash photos. */
export type Stage = "Next" | "Planned" | "Exploring";

export type Programme = {
  slug: string;
  title: string;
  text: string;
  stage: Stage;
  photo: string; // images.unsplash.com photo id
  alt: string;
};

export const PIPELINE: Programme[] = [
  {
    slug: "aqua-yoga",
    title: "Aqua yoga for women",
    text: "Women-only batches with a woman instructor. Gentle stretching, balance and breathing in the water.",
    stage: "Next",
    photo: "photo-1778137859976-0a59e7d98c4b",
    alt: "A group of women holding floats in a pool during a class",
  },
  {
    slug: "water-therapy",
    title: "Mind & calm in the water",
    text: "Guided floating and slow breathing to unwind after a long day, led by a trained practitioner.",
    stage: "Next",
    photo: "photo-1562271613-c3a4be2cc883",
    alt: "A woman floating calmly in deep blue water",
  },
  {
    slug: "summer-camp",
    title: "Summer swim camps",
    text: "Daily holiday camps in April and May, so children learn fast during the break.",
    stage: "Planned",
    photo: "photo-1660847427733-4986774f5f87",
    alt: "Children and coaches splashing and cheering in a pool",
  },
  {
    slug: "adults",
    title: "Learn to swim: teens & adults",
    text: "It's never too late. Separate batches for parents and teenagers who never learned.",
    stage: "Planned",
    photo: "photo-1778138315354-7b08322c533a",
    alt: "Young swimmers practising kicks while holding the pool edge",
  },
  {
    slug: "seniors",
    title: "Aqua fitness for seniors",
    text: "Low-impact water exercise that is kind to knees and joints, with a lifeguard on deck.",
    stage: "Exploring",
    photo: "photo-1649830762484-451be286eb02",
    alt: "Older adults sitting together on a pool step during an exercise class",
  },
  {
    slug: "junior-lifeguard",
    title: "Junior lifeguard course",
    text: "Teenagers learn rescue skills, CPR and pool safety from our lifeguards.",
    stage: "Exploring",
    photo: "photo-1536542469342-c301a284a36c",
    alt: "A lifeguard chair beside an outdoor swimming pool",
  },
];

export const programmeBySlug = (slug: string) => PIPELINE.find((p) => p.slug === slug);
