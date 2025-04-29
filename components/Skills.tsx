'use client'

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface GithubStats {
  publicRepos: number;
  totalCommits: number;
  followers: number;
  languages: Record<string, number>;
}

const Skills = () => {
  const [githubStats, setGithubStats] = useState<GithubStats>({
    publicRepos: 0,
    totalCommits: 0,
    followers: 0,
    languages: {},
  });
  const [loading, setLoading] = useState(true);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch('/api/githubStats');
        const data = await response.json();
        setGithubStats(data);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  // Define programming languages to display (excluding C)
  const programmingLanguages = [
    'C++',
    'Java',
    'TypeScript',
    'Perl',
    'Python',
    'Go',
    'JavaScript',
    'Shell',
    'Assembly',
  ];

  // Filter languages and compute max lines for displayed languages only
  const filteredLanguages = Object.entries(githubStats.languages)
    .filter(([language]) => programmingLanguages.includes(language))
    .reduce((acc, [language, lines]) => {
      acc[language] = lines;
      return acc;
    }, {} as Record<string, number>);

  const languageValues = Object.values(filteredLanguages);
  const maxLanguageLines = Math.max(...languageValues, 1); // Prevent division by zero

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="flex space-x-8 mb-6">
        <div className="bg-gray-200 p-6 rounded-lg w-1/2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg w-1/2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!loading) {
      // Trigger bar animation after a short delay when loading is complete
      const timer = setTimeout(() => {
        setAnimateBars(true);
      }, 100); // Small delay to ensure smooth transition
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Skills</h1>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Repos & Commits */}
          <div className="flex space-x-8 mb-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2">
              <h3 className="text-xl font-semibold text-gray-800">Total Repos</h3>
              <p className="text-3xl font-bold text-blue-600">
                <CountUp
                  start={0}
                  end={githubStats.publicRepos}
                  duration={2.5}
                  separator=","
                  suffix="+"
                />
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2">
              <h3 className="text-xl font-semibold text-gray-800">Total Commits</h3>
              <p className="text-3xl font-bold text-blue-600">
                <CountUp
                  start={0}
                  end={githubStats.totalCommits}
                  duration={2.5}
                  separator=","
                  suffix="+"
                />
              </p>
            </div>
          </div>

          {/* Language Stats */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Popular Languages</h3>
            {Object.entries(filteredLanguages).length > 0 ? (
              <div>
                {Object.entries(filteredLanguages)
                  .sort(([, linesA], [, linesB]) => linesB - linesA) // Sort by lines, descending
                  .slice(0, 10) // Limit to top 10
                  .map(([language, lines]) => (
                    <div key={language} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-gray-700">{language}</p>
                        {/* <p className="text-sm text-gray-500">{lines} lines</p> */}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-in-out"
                          style={{
                            width: animateBars ? `${(lines / maxLanguageLines) * 100}%` : '0%',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No language data available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Skills;