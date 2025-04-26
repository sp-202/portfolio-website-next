import { Octokit } from '@octokit/rest';
import { NextRequest, NextResponse } from 'next/server';

const username = 'sp-202';  // Replace with your GitHub username
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;

const octokit = new Octokit({ auth: token });

// Simple in-memory cache with a TTL of 10 minutes (600,000ms)
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 600000; // Cache for 10 minutes

// Function to check cache and return data if available and not expired
const getCache = (key: string) => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

// Function to set cache with the current timestamp
const setCache = (key: string, data: any) => {
  cache[key] = { data, timestamp: Date.now() };
};

export async function GET(req: NextRequest) {
  const cacheKey = `githubStats_${username}`;
  
  // Check if the data is already in cache
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    // Get user details
    const { data: user } = await octokit.rest.users.getByUsername({ username });

    // Get all repos (public and private)
    const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
      username,
      visibility: 'all', // Fetch both public and private repositories
      per_page: 100,
    });

    let totalCommits = 0;
    let languageStats: Record<string, number> = {};

    // Parallelize fetching contributors and languages for all repos
    const fetchRepoDataPromises = repos.map(async (repo) => {
      // Fetch contributors and languages for each repo in parallel
      const [contributorsRes, languagesRes] = await Promise.all([
        octokit.rest.repos.listContributors({
          owner: username,
          repo: repo.name,
        }),
        octokit.request('GET /repos/{owner}/{repo}/languages', {
          owner: username,
          repo: repo.name,
        }),
      ]);

      const contributors = contributorsRes.data;
      const self = Array.isArray(contributors)
        ? contributors.find((c) => c.login === username)
        : null;

      if (self) totalCommits += self.contributions;

      const languages = languagesRes.data;

      // Accumulate language-specific data
      for (const [language, lines] of Object.entries(languages)) {
        if (languageStats[language]) {
          languageStats[language] += lines;
        } else {
          languageStats[language] = lines;
        }
      }
    });

    // Wait for all promises to resolve
    await Promise.all(fetchRepoDataPromises);

    // Filter out only popular languages (e.g., C++, JavaScript, Python, Java)
    const popularLanguages = ['C++', 'JavaScript', 'Python', 'Java', 'Ruby', 'TypeScript', 'Go'];
    const filteredLanguageStats = Object.fromEntries(
      Object.entries(languageStats).filter(([language]) =>
        popularLanguages.includes(language)
      )
    );

    // Prepare response data
    const responseData = {
      publicRepos: user.public_repos,
      totalCommits,
      followers: user.followers,
      languages: filteredLanguageStats,
    };

    // Cache the response data
    setCache(cacheKey, responseData);

    // Return the response data
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('GitHub API error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
