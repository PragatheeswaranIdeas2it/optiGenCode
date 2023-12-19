import axios from 'axios';

const githubApiUrl = 'https://api.github.com';
const owner = 'sskmscss';
const repo = 'kotlin-template';
const branch = 'BRANCH';
const token = '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';

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

const getBranchUrl = `${githubApiUrl}/repos/${owner}/${repo}/branches`;
const getCommit = (branchName: string) => `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branchName}`
export const getBranchList = () => axios.get(getBranchUrl, { headers });
export const getCommitList = (branchName: any) => axios.get(getCommit(branchName), { headers });
