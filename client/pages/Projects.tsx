import React from "react";
import { Link } from "react-router-dom";

type ProjectType = {
  id: string | number; // replace with actual data type if not string/number
  name: string;
  description: string;
  imageUrl: string; // URL of the project's image
};

const Project = ({ id, name, description, imageUrl }: ProjectType) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 p-8 border-b border-slate-200">
      <img src={imageUrl} alt={name} />
      <h3 className="text-xl font-bold mb-3 text-slate-900">{name}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      <Link
        to={`/projects/${id}`}
        className="inline-block mt-5 text-sm text-blue-600 font-medium hover:underline"
      >
        View Project &rarr;
      </Link>
    </div>
  );
};

type ProjectsProps = {
  projects: Array<ProjectType>;
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="grid grid-cols-3 gap-x-16 gap-y-6">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
