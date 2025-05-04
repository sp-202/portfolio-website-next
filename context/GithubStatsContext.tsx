'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface GithubStats {
  publicRepos: number;
  totalCommits: number;
  followers: number;
  languages: Record<string, number>;
}

interface GithubStatsContextProps {
  githubStats: GithubStats;
  loading: boolean;
}

const GithubStatsContext = createContext<GithubStatsContextProps>({
  githubStats: {
    publicRepos: 0,
    totalCommits: 0,
    followers: 0,
    languages: {},
  },
  loading: true,
});

export const GithubStatsProvider = ({ children }: { children: React.ReactNode }) => {
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
        const res = await fetch('/api/githubStats');
        const data = await res.json();
        setGithubStats(data);
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGithubStats();
  }, []);

  return (
    <GithubStatsContext.Provider value={{ githubStats, loading }}>
      {children}
    </GithubStatsContext.Provider>
  );
};

export const useGithubStats = () => useContext(GithubStatsContext);
