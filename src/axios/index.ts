import axios from 'axios'
const repoAPI = axios.create({
  baseURL: import.meta.env.VITE_REPO_URL,
  headers: {
    // this token enable more requests per hour with GitHub API
    // however, this token should only be provided when running locally
    Authorization: import.meta.env.VITE_PUBLIC_READ_ACCESS_TOKEN
      ? `Bearer ${import.meta.env.VITE_PUBLIC_READ_ACCESS_TOKEN}`
      : undefined,
  },
})

export const getContent = async (path: string): Promise<RepoContent[]> => {
  const res = await repoAPI.get(path)
  return res?.data
}

export const getConfig = async (path: string): Promise<Conf> => {
  try {
    const res = await repoAPI.get(`${path}/CONF.json`)
    const file: RepoContent = res?.data

    if (file?.download_url) {
      return (await axios.get(file?.download_url))?.data
    }
  } catch (e) {
    console.error(`Failed to fetch CONF.json at ${path}`)
  }
  return {}
}
