const ProjectsSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        PROJECTS
      </h2>
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
        What i made so far
      </h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Android File Explorer</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
            A sleek and intuitive file explorer app for Android, designed to simplify file management with features like file browsing, search, and organization.
          </p>
          <div className="mt-auto">
            <a
              href="https://github.com/sp-202/FIle-Manager/tree/stable_beta_chanel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Real-Time Chat App (Beta)</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
            A Next.js-based chat application with Spring Boot and MongoDB backend, featuring real-time messaging using WebSocket. Currently in development.
          </p>
          <div className="mt-auto">
            <a
              href="https://github.com/sp-202/Chat-App-2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              View on GitHub →
            </a>
          </div>
          <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Beta
          </span>
        </div>

        <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-xl">🌦️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">React Weather App</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
            A React-based weather application that fetches real-time weather data from a weather API and displays it in a user-friendly interface.
          </p>
          <div className="mt-auto">
            <a
              href="https://github.com/sp-202/weather-app-frontend-2022"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;