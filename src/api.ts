import axios from 'axios';

const githubApiUrl = 'https://api.github.com';
const codeLamaApi = 'http://192.168.1.8:5000/llama?branch=';
const owner = 'sskmscss';
const repo = 'kotlin-template';
const token = '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';

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
};
const headerLama = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}


const getBranchUrl = `${githubApiUrl}/repos/${owner}/${repo}/branches`;
const getCommit = (branchName: string) => `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branchName}`
const getCommitData = (branchName: string, commitId: string) => `https://api.github.com/repos/${owner}/${repo}/commits/${commitId}?sha=${branchName}`
export const getBranchList = () => axios.get(getBranchUrl, { headers });
export const getCommitList = (branchName: any) => axios.get(getCommit(branchName), { headers });
export const getCommitDetails = (branchName: any, commitId: any) => axios.get(getCommitData(branchName, commitId), { headers });
export const getCodeLamaUrl = (branchName: string, payload: any) => axios.post(codeLamaApi + branchName, payload, { headerLama });
