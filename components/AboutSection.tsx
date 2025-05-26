'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useGithubStats } from '@/context/GithubStatsContext';
import CountUp from 'react-countup';

const StatCard = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: number;
  loading: boolean;
}) => {
  return (
    <div>
      {loading ? (
        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto animate-pulse mb-1" />
      ) : (
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <CountUp start={0} end={value} duration={2.5} separator="," suffix="+" />
        </p>
      )}
      <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
    </div>
  );
};


const AboutMe = () => {
  const { githubStats, loading } = useGithubStats();
  const { totalCommits, publicRepos } = githubStats;

  return (
    <section id="about" className="py-16 px-6 md:px-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">About Me</h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">My introduction</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="flex justify-center">
            <div className="rounded-2xl bg-indigo-500 p-2">
              <Image
                src="/your-photo.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Right: Text + Stats + CV */}
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I&apos;m <span className="font-semibold">Subhodeep Pal</span>, a Mechanical Engineering B.Tech graduate from NIT Durgapur.
              Over the past year, I have been extensively working on projects based on <strong>React</strong> and <strong>Next.js</strong> using <strong>TypeScript</strong>.
              I also have a strong knowledge of <strong>Spring Boot</strong> and backend development.
              I believe in the power of open source and love contributing to the community. Currently, I&apos;m focused on enhancing my <strong>Data Structures and Algorithms</strong> skills.
            </p>

            {/* Stats with shimmer animation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-center">
              <StatCard label="Years Experience" value={1} loading={loading} />
              <StatCard label="Commits on GitHub" value={totalCommits} loading={loading} />
              <StatCard label="Repositories" value={publicRepos} loading={loading} />
              <StatCard label="Fullstack Projects" value={10} loading={loading} />
            </div>

            {/* Download CV */}
            <Link
              href="/subhodeep_pal_resume.pdf"
              download
              className="inline-block px-6 py-3 bg-indigo-500 text-slate-50 rounded-xl hover:bg-indigo-800 transition"
            >
              Download CV →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
