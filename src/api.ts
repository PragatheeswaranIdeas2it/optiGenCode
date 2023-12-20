import axios from 'axios';

const githubApiUrl = 'https://api.github.com';
const codeLamaApi = 'http://192.168.20.68:5000/llama?branch=';
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
const payload = {
  system_message: "Code: Kotlin suggestion - update templateModel",
  user_message: `fun update(id: String, entity: TemplateModel) {         val templateModel: TemplateModel? = repo.getById(entity.id) ?: throw DataNotFoundException(ExceptionMessage.NO_DATA_FOUND)entity._id = templateModel!!._idrepo.save(entity)}`,
  max_tokens: 10000
}

const getBranchUrl = `${githubApiUrl}/repos/${owner}/${repo}/branches`;
const getCommit = (branchName: string) => `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branchName}`
export const getBranchList = () => axios.get(getBranchUrl, { headers });
export const getCommitList = (branchName: any) => axios.get(getCommit(branchName), { headers });
export const getCodeLamaUrl = (branchName: string) => axios.post(codeLamaApi + branchName, payload, { headerLama });
