export const projects: ProjectType[] = [
  {
    id: 1,
    name: "Project 1",
    description: "This is the first project.",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Project 2",
    description: "This is the second project.",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Project 3",
    description: "This is the third project.",
    imageUrl: "https://via.placeholder.com/300",
  },
];

export type ProjectType = {
  id: string | number; // replace with actual data type if not string/number
  name: string;
  description: string;
  imageUrl: string; // URL of the project's image
};
