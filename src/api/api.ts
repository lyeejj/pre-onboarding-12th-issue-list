import { Octokit } from 'octokit';
import { API_INFO } from '../utils/constants';

const octokit = new Octokit({ auth: process.env.REACT_APP_API_TOKEN });

export const getIssueList = async (page: number) => {
	const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
		owner: API_INFO.OWNER,
		repo: API_INFO.REPO,
		state: 'open',
		sort: 'comments',
		page,
	});
	return res.data;
};

export const getIssueDetail = async (issue_number: number) => {
	const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
		owner: API_INFO.OWNER,
		repo: API_INFO.REPO,
		issue_number,
	});
	return res.data;
};
