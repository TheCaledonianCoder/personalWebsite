import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, CATEGORIES, type Category } from "./projects";

type FilterCategory = Category | "All";

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  // Projects currently available in the selected category
  const activeProjects = filteredProjects;

  // Track the currently selected project
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    activeProjects[0]?.id ?? null,
  );

  // Find the active project, or fall back to the first available
  const currentProject =
    activeProjects.find((p) => p.id === selectedProjectId) || activeProjects[0];

  return (
    <div className="w-[92%] lg:w-[75%] mx-auto pt-8 pb-16 text-white flex flex-col items-center">
      {/* Centered Page Title Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-semibold mb-2 block drop-shadow-sm">
          Selected Works
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-sm mb-4 select-none">
          PROJECTS
        </h1>

        <div className="w-24 h-1 bg-[#1A4D57] rounded-full shadow-sm mx-auto" />
      </div>

      {/* Category Filter Underline Navigation */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12 border-b border-white/10 pb-4 w-full">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);

                // Reset preview to the first project in the new category
                const nextFiltered =
                  category === "All"
                    ? projects
                    : projects.filter((p) => p.categories.includes(category));

                setSelectedProjectId(nextFiltered[0]?.id ?? null);
              }}
              className={`relative text-sm sm:text-base font-medium transition-colors duration-200 pb-2 cursor-pointer ${
                isActive ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {category}

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A4D57] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {activeProjects.length > 0 && currentProject ? (
        <div className="w-full flex flex-col space-y-10">
          {/* Large Project Preview Container */}
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {currentProject.name}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image */}
              <div className="lg:col-span-6">
                <img
                  src={currentProject.imageUrl}
                  alt={currentProject.name}
                  className="w-full h-72 sm:h-96 object-cover rounded-xl border border-white/10 shadow-md"
                />
              </div>

              {/* Right Column: Project Details */}
              <div className="lg:col-span-6 flex flex-col space-y-6 text-white/90">
                {/* Overview */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#1A4D57] font-bold mb-1">
                    Overview
                  </h3>

                  <p className="text-sm leading-relaxed text-white/80">
                    {currentProject.description}
                  </p>
                </div>

                {/* Challenge & Approach */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#1A4D57] font-bold mb-1">
                    Challenge & Approach
                  </h3>

                  <p className="text-sm leading-relaxed text-white/80">
                    Designed with user experience and modular scalability in
                    mind. The architecture streamlines interaction workflows
                    while establishing a distinct visual rhythm.
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#1A4D57] font-bold mb-1">
                    Technologies
                  </h3>

                  <p className="text-sm leading-relaxed text-white/80">
                    Built using modern web standards, responsive layout
                    structures, and high-performance component patterns.
                  </p>
                </div>

                {/* View Full Project */}
                <div className="pt-2">
                  <Link
                    to={`/projects/${currentProject.id}`}
                    className="inline-block text-sm font-medium text-white bg-[#1A4D57] px-5 py-2.5 rounded-full shadow hover:bg-[#153d44] transition-colors"
                  >
                    View Full Project &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel of Smaller Project Previews */}
          <div className="w-full">
            <h3 className="text-sm uppercase tracking-wider text-white/70 mb-4 text-center sm:text-left">
              More Projects
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20">
              {activeProjects.map((project) => {
                const isSelected = project.id === currentProject.id;

                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`flex-shrink-0 w-48 sm:w-56 text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white/20 border-[#1A4D57] ring-1 ring-[#1A4D57]"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-28 object-cover rounded-lg mb-2 border border-white/10"
                    />

                    <h4 className="text-sm font-semibold text-white truncate">
                      {project.name}
                    </h4>

                    <p className="text-xs text-white/60 truncate mt-0.5">
                      {project.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white/80 py-12 text-center">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
};

export default ProjectsPage;
