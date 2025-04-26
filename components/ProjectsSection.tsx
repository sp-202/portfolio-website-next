const ProjectsSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Project 1</h3>
          <p className="text-gray-600">Description of project 1.</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Project 2</h3>
          <p className="text-gray-600">Description of project 2.</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Project 3</h3>
          <p className="text-gray-600">Description of project 3.</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
