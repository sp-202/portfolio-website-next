import { Octokit } from '@octokit/rest';
import { NextResponse } from 'next/server';

const username = 'sp-202'; // Replace with your GitHub username
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;

const octokit = new Octokit({ auth: token });

// Define the shape of the cache data
interface CacheData {
  publicRepos: number;
  totalCommits: number;
  followers: number;
  languages: Record<string, number>;
}

// Simple in-memory cache with a TTL of 10 minutes (600,000ms)
const cache: Record<string, { data: CacheData; timestamp: number }> = {};
const CACHE_TTL = 0; // Cache for 10 minutes

// Function to check cache and return data if available and not expired
const getCache = (key: string): CacheData | null => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

// Function to set cache with the current timestamp
const setCache = (key: string, data: CacheData): void => {
  cache[key] = { data, timestamp: Date.now() };
};

// Define types for contributor and language data
interface Contributor {
  login: string;
  contributions: number;
}

interface Languages {
  [key: string]: number;
}

export async function GET() {
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
    const languageStats: Record<string, number> = {};

    // Parallelize fetching contributors and languages for all repos
    const fetchRepoDataPromises = repos.map(async (repo) => {
      try {
        // Fetch contributors and languages for each repo in parallel
        const [contributorsRes, languagesRes] = await Promise.all([
          octokit.rest.repos
            .listContributors({
              owner: username,
              repo: repo.name,
            })
            .catch((error: unknown) => {
              if (error instanceof Error && error.message.includes('contributor list is too large')) {
                console.warn(
                  `Skipping contributors for repo ${repo.name}: ${error.message}`
                );
                return { data: [] }; // Return empty contributors list to continue processing
              }
              throw error; // Rethrow other errors
            }),
          octokit.request('GET /repos/{owner}/{repo}/languages', {
            owner: username,
            repo: repo.name,
          }),
        ]);

        const contributors = contributorsRes.data as Contributor[];
        const self = Array.isArray(contributors)
          ? contributors.find((c) => c.login === username)
          : null;

        if (self) {
          totalCommits += self.contributions;
        } else {
          console.warn(`No contributions found for ${username} in repo ${repo.name}`);
        }

        const languages = languagesRes.data as Languages;

        // Accumulate language-specific data
        for (const [language, lines] of Object.entries(languages)) {
          if (languageStats[language]) {
            languageStats[language] += lines;
          } else {
            languageStats[language] = lines;
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Error processing repo ${repo.name}: ${error.message}`);
        } else {
          console.error(`Error processing repo ${repo.name}: Unknown error`);
        }
        // Continue processing other repos instead of failing
      }
    });

    // Wait for all promises to resolve
    await Promise.all(fetchRepoDataPromises);

    // Prepare response data
    const responseData: CacheData = {
      publicRepos: user.public_repos,
      totalCommits,
      followers: user.followers,
      languages: languageStats, // Include all languages without filtering
    };

    // Cache the response data
    setCache(cacheKey, responseData);

    // Return the response data
    return NextResponse.json(responseData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('GitHub API error:', error.message);
      return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
    console.error('GitHub API error: Unknown error');
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}