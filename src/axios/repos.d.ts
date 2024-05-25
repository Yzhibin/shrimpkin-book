type RepoContent = {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  _links: {
    self: string
    git: string
    html: string
  }
  type: 'file' | 'dir'

  // for 'file' type
  content?: string
  encoding?: string

  // custom field
  conf?: Conf
}

type Conf = {
  en?: string
  zh?: string
  medium?: string
}
