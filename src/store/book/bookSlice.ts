import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { getConfig, getContent } from '../../axios'

export interface Album {
  id: string
  title?: string
  conf?: Conf
  images?: string[]
}

export interface BookState {
  albums: Album[]
}

const initialState: BookState = {
  albums: [],
}

export const fetchAlbums = createAsyncThunk('book/fetchAlbums', async () => {
  const root = await getContent('')
  const dirs = root.filter(({ type }) => type === 'dir') ?? []
  const albums: Album[] = dirs.map(({ name }) => ({
    id: name,
  }))
  albums.reverse()
  return albums
})

export const fetchConfig = createAsyncThunk(
  'book/fetchConfig',
  async (id: string) => {
    const conf = await getConfig(id)
    return { id, conf }
  },
)

export const fetchImages = createAsyncThunk(
  'book/fetchImages',
  async (id: string) => {
    const content = await getContent(id)
    const files =
      content.filter(
        ({ type, name }) => type !== 'dir' && !name.startsWith('CONF'),
      ) ?? []
    const images: string[] = files.map(({ download_url }) => download_url)
    return { id, images }
  },
)

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        for (const album of state.albums) {
          if (album.id === action.payload.id) {
            album.conf = action.payload.conf
            break
          }
        }
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        for (const album of state.albums) {
          if (album.id === action.payload.id) {
            album.images = action.payload.images
            break
          }
        }
      })
  },
})

export default bookSlice.reducer

export const selectAllAlbums = (state: RootState) => state.book.albums
export const selectAlbum = (state: RootState, albumId: string | undefined) =>
  state.book.albums.find(({ id }) => id === albumId)
