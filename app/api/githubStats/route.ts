import { Octokit } from '@octokit/rest';
import { NextResponse } from 'next/server';
import { getCache, setCache } from '../cache'; // Import from cache.ts

// Determine username from environment variable or fallback to 'sp-202'
const username = process.env.GITHUB_USERNAME || 'sp-202';
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;

const octokit = new Octokit({ auth: token });

// Define the shape of the cache data
interface CacheData {
  publicRepos: number;
  totalCommits: number;
  followers: number;
  languages: Record<string, number>;
}

// Define types for contributor and language data
interface Contributor {
  login: string;
  contributions: number;
}

interface Languages {
  [key: string]: number;
}

// Define a type for the repository object (simplified)
// Ideally, this would come from Octokit's types, e.g. Endpoints["GET /users/{username}/repos"]["response"]["data"][number]
interface RepoType {
  name: string;
  // Add other properties if needed, or use a more specific Octokit type
}

// Define a type for the output of processRepo
interface ProcessRepoOutput {
  commits: number;
  languages: Record<string, number>;
}

async function processRepo(
  repo: RepoType,
  username: string,
  octokit: Octokit
): Promise<ProcessRepoOutput | null> {
  try {
    // Fetch contributors and languages for each repo in parallel
    const [contributorsRes, languagesRes] = await Promise.all([
      octokit.rest.repos
        .listContributors({
          owner: username, // Assuming username is the owner, adjust if owner can be different
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
        owner: username, // Assuming username is the owner
        repo: repo.name,
      }),
    ]);

    let repoCommits = 0;
    const repoLanguages: Record<string, number> = {};

    const contributors = contributorsRes.data as Contributor[];
    const self = Array.isArray(contributors)
      ? contributors.find((c) => c.login === username)
      : null;

    if (self) {
      repoCommits = self.contributions;
    } else {
      console.warn(`No contributions found for ${username} in repo ${repo.name}`);
    }

    const languagesData = languagesRes.data as Languages;
    for (const [language, lines] of Object.entries(languagesData)) {
      repoLanguages[language] = (repoLanguages[language] || 0) + lines;
    }

    return { commits: repoCommits, languages: repoLanguages };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error processing repo ${repo.name}: ${error.message}`);
    } else {
      console.error(`Error processing repo ${repo.name}: Unknown error`);
    }
    return null; // Return null if processing this specific repo fails
  }
}

async function fetchGitHubStats(username: string, octokit: Octokit): Promise<CacheData> {
  try {
    // Get user details
    const { data: user } = await octokit.rest.users.getByUsername({ username });

    // Get all repos (public and private)
    const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
      username,
      visibility: 'all', // Fetch both public and private repositories
      per_page: 100,
    });

    // Parallelize fetching and processing repo data
    const repoProcessingPromises = repos.map(repo =>
      processRepo(repo as RepoType, username, octokit)
    );

    const processedRepoResults = await Promise.all(repoProcessingPromises);

    let totalCommits = 0;
    const aggregateLanguageStats: Record<string, number> = {};

    for (const result of processedRepoResults) {
      if (result) { // Filter out null results (errors during individual repo processing)
        totalCommits += result.commits;
        for (const [language, lines] of Object.entries(result.languages)) {
          aggregateLanguageStats[language] = (aggregateLanguageStats[language] || 0) + lines;
        }
      }
    }

    // Prepare response data
    const responseData: CacheData = {
      publicRepos: user.public_repos,
      totalCommits,
      followers: user.followers,
      languages: aggregateLanguageStats, // Use aggregated stats
    };
    return responseData;
  } catch (error) {
    // Log and re-throw the error to be handled by the GET function's catch block
    if (error instanceof Error) {
      console.error('GitHub API error in fetchGitHubStats:', error.message);
    } else {
      console.error('Unknown error in fetchGitHubStats:', error);
    }
    throw error; // Re-throw the error
  }
}

export async function GET() {
  const cacheKey = `githubStats_${username}`;

  // Check if the data is already in cache
  const cachedData = getCache<CacheData>(cacheKey); // Use generic getCache
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    const responseData = await fetchGitHubStats(username, octokit);

    // Cache the response data
    setCache<CacheData>(cacheKey, responseData); // Use generic setCache

    // Return the response data
    return NextResponse.json(responseData);
  } catch (error: unknown) {
    // This will catch errors from fetchGitHubStats or setCache
    console.error('Error in GET handler:', error); // Log the error object for better inspection
    return NextResponse.json(
      {
        error: 'Failed to retrieve GitHub statistics',
        details: error instanceof Error ? error.message : String(error), // Use String(error) for unknown
      },
      { status: 500 }
    );
  }
}