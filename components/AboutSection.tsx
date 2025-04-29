import React from 'react'

const AboutSection = () => {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Hi, I&apos;m Subhodeep, a passionate software developer with a strong interest in systems programming, web development, and open-source contributions.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          My journey in tech began with exploring low-level programming in C++ and Java, and over time, I&apos;ve expanded my expertise to include modern languages like TypeScript and Python. I enjoy building efficient, scalable solutions and contributing to projects that make a difference.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          When I&apos;m not coding, you can find me experimenting with new technologies, reading about computer science advancements, or collaborating with the open-source community. I&apos;m always eager to learn and take on new challenges!
        </p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Background</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Bachelor&apos;s in Computer Science (or relevant field)</li>
            <li>Contributed to multiple open-source projects on GitHub</li>
            <li>Experienced in full-stack development and system-level programming</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutSection