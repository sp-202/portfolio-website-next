'use client'

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface GithubStats {
  publicRepos: number;
  totalCommits: number;
  followers: number;
  languages: Record<string, number>;
}

const AboutPage = () => {
  const [githubStats, setGithubStats] = useState<GithubStats>({
    publicRepos: 0,
    totalCommits: 0,
    followers: 0,
    languages: {},
  });
  const [loading, setLoading] = useState(true);

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

  const languageValues = Object.values(githubStats.languages);
  const maxLanguageLines = Math.max(...languageValues);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">About Me</h1>

      {/* Repos & Commits */}
      <div className="flex space-x-8 mb-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2">
          <h3 className="text-xl font-semibold text-gray-800">Total Repos</h3>
          <p className="text-3xl font-bold text-blue-600">
            {!loading ? (
              <CountUp
                start={0}
                end={githubStats.publicRepos}
                duration={2.5}
                separator=","
              />
            ) : (
              'Loading...'
            )}
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2">
          <h3 className="text-xl font-semibold text-gray-800">Total Commits</h3>
          <p className="text-3xl font-bold text-blue-600">
            {!loading ? (
              <CountUp
                start={0}
                end={githubStats.totalCommits}
                duration={2.5}
                separator=","
              />
            ) : (
              'Loading...'
            )}
          </p>
        </div>
      </div>

      {/* Language Stats */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Popular Languages</h3>
        {Object.entries(githubStats.languages).length > 0 ? (
          <div>
            {Object.entries(githubStats.languages).map(([language, lines]) => (
              <div key={language} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-700">{language}</p>
                  <p className="text-sm text-gray-500">{lines} lines</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                      width: `${(lines / maxLanguageLines) * 100}%`,
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
    </div>
  );
};

export default AboutPage;
