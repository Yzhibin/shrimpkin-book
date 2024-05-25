import axios from 'axios'
const repoAPI = axios.create({
  baseURL: import.meta.env.VITE_REPO_URL,
})

export const getContent = async (path: string): Promise<RepoContent[]> => {
  const res = await repoAPI.get(path)
  return res?.data
}

export const getConfig = async (path: string): Promise<Conf> => {
  const res = await repoAPI.get(`${path}/CONF.json`)
  const file: RepoContent = res?.data

  if (file?.download_url) {
    return (await repoAPI.get(file?.download_url))?.data
  }
  return {}
}
