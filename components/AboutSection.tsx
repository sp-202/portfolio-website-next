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
            <div className="rounded-2x p-2">
              <Image
                src="/images/profile_image.jpeg"
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
              I&apos;m <span className="font-semibold">Subhodeep Pal</span>, a B.Tech graduate in Mechanical Engineering from NIT Durgapur.
              I specialize in full-stack development with hands-on experience building modern web applications using <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong> on the frontend, and <strong>Node.js</strong>, <strong>Express</strong>, and <strong>Spring Boot</strong> on the backend.
              I enjoy architecting scalable backend systems and have worked extensively on server-side development.
              Additionally, I have experience in <strong>Android development</strong> using <strong>Java</strong>, enabling me to build cross-platform solutions.
              I’m passionate about open source, love contributing to the developer community, and am currently focused on sharpening my skills in <strong>Data Structures and Algorithms</strong> to become a more efficient problem solver.
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
              href="/Subhodeep_pal_Resume.pdf"
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
