// components/HomeSection.tsx
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

const HomeSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 min-h-screen">
      {/* Left Side */}
      <div className="text-left space-y-6">
        <h1 className="text-5xl font-bold text-blue-600">Hi, I'm Subhodeep 👋</h1>

        {/* Typewriter effect */}
        <div className="h-10 md:h-12 overflow-hidden">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 font-semibold">
            <Typewriter
              words={[
                "Backend Developer",
                "Frontend Developer",
                "AI/ML Enthusiast",
                "Android Developer",
                "Embedded Systems Builder",
              ]}
              loop={0} // 0 for infinite
              cursor={false}
              // cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
        </div>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          I'm a passionate developer who loves building web applications,
          exploring embedded systems, and solving challenging problems.
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Contact Me
        </button>
      </div>

      {/* Right Side */}
      <div className="mt-10 md:mt-0 md:ml-12">
        <Image
          src="/coding.svg" // replace with your actual image
          alt="Coding Illustration"
          width={400}
          height={400}
          className="rounded-xl shadow-lg dark:shadow-white/10"
        />
      </div>
    </div>
  );
};

export default HomeSection;
