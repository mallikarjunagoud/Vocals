/**
 * Domain Entity: Song
 * Represents a single audio track with metadata
 */
export interface Song {
  id: string
  filePath: string
  fileName: string
  title: string
  artist: string
  album: string
  albumArtist: string
  genre: string
  composer: string
  trackNumber: number
  discNumber: number
  year: number
  duration: number
  bitrate: number
  sampleRate: number
  fileSize: number
  format: 'mp3' | 'aac' | 'm4a' | 'wav' | 'flac' | 'aiff'
  albumArtworkPath?: string
  albumArtworkData?: string
  isFavorite: boolean
  lastPlayedAt?: number
  playCount: number
  dateAdded: number
  lastScannedAt: number
}

export interface Album {
  id: string
  name: string
  artist: string
  year?: number
  genre: string
  songCount: number
  totalDuration: number
  artworkPath?: string
  artworkData?: string
  songs: Song[]
}

export interface Artist {
  id: string
  name: string
  songCount: number
  albumCount: number
  totalDuration: number
  songs: Song[]
  albums: Album[]
}

export interface Playlist {
  id: string
  name: string
  description?: string
  songs: Song[]
  createdAt: number
  updatedAt: number
}
