export const CATEGORIES = [
  "All",
  "Web Design",
  "Games",
  "Apps",
  "SAAS",
] as const;

export type Category = Exclude<(typeof CATEGORIES)[number], "All">;

export type ProjectType = {
  id: number; // or string — must match your data
  name: string;
  description: string;
  imageUrl: string;
  categories: Category[]; // 👈 required
};

export const projects: ProjectType[] = [
  {
    id: 1,
    name: "Lumina Portfolio",
    description:
      "A minimal portfolio site for a photographer, built with a custom CMS and responsive galleries.",
    imageUrl: "https://picsum.photos/seed/lumina/640/360",
    categories: ["Web Design"],
  },
  {
    id: 2,
    name: "Orbit Runner",
    description:
      "A fast-paced endless runner in the browser with canvas rendering and gamepad support.",
    imageUrl: "https://picsum.photos/seed/orbit/640/360",
    categories: ["Games"],
  },
  {
    id: 3,
    name: "TaskFlow",
    description:
      "A kanban-style task manager with drag-and-drop, offline support, and team workspaces.",
    imageUrl: "https://picsum.photos/seed/taskflow/640/360",
    categories: ["Apps", "SAAS"],
  },
  {
    id: 4,
    name: "Brew & Co.",
    description:
      "E-commerce site for a specialty coffee roaster, with subscriptions and a bean-matching quiz.",
    imageUrl: "https://picsum.photos/seed/brew/640/360",
    categories: ["Web Design", "SAAS"],
  },
  {
    id: 5,
    name: "Pixel Painter",
    description:
      "A collaborative pixel-art canvas where friends draw together in real time.",
    imageUrl: "https://picsum.photos/seed/pixel/640/360",
    categories: ["Games", "Apps"],
  },
  {
    id: 6,
    name: "Metricly Dashboard",
    description:
      "Analytics dashboard for small businesses with customizable widgets and email reports.",
    imageUrl: "https://picsum.photos/seed/metricly/640/360",
    categories: ["SAAS", "Web Design"],
  },
];
