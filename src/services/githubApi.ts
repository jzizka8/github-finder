import axios from 'axios';
import { GitHubOrganization, GitHubRepository, GitHubUser } from '../types/githubApiTypes';

const githubApi = axios.create({
  baseURL: "https://api.github.com/",
});

export async function fetchUserInfo(username: string): Promise<GitHubUser> {
  return (await githubApi.get(`/users/${username}`)).data;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepository[]> {
  return (await githubApi.get(`/users/${username}/repos`)).data;
}

export async function fetchUserOrgs(username: string): Promise<GitHubOrganization[]> {
  return (await githubApi.get(`/users/${username}/orgs`)).data;
}