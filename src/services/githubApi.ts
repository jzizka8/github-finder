import axios from 'axios';

const githubApi = axios.create({
  baseURL: "https://api.github.com/",
});

export async function fetchUserInfo(username: string){
  return githubApi.get(`/users/${username}`);
}

export async function fetchUserRepos(username:string){
  return githubApi.get(`/users/${username}/repos`);
}

export async function fetchUserOrgs(username: string){
  return githubApi.get(`/users/${username}/org`);
}