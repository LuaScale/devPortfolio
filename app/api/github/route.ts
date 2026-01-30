import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  description: string;
  language: string;
  topics: string[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo');

  if (!repo) {
    return NextResponse.json(
      { error: 'Repository parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add GitHub token if you have one to increase rate limits
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const data: GitHubRepo = await response.json();

    return NextResponse.json({
      stars: data.stargazers_count,
      forks: data.forks_count,
      description: data.description,
      language: data.language,
      topics: data.topics || []
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository data', stars: 0, forks: 0 },
      { status: 500 }
    );
  }
}
