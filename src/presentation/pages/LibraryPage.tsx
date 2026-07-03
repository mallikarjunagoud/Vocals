import React, { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonButton, IonIcon, IonRefresher, IonRefresherContent } from '@ionic/react'
import { heart, heartOutline, play } from 'ionicons/icons'
import { usePlayerStore } from '../hooks/usePlayerStore'
import './LibraryPage.css'

type ViewMode = 'songs' | 'artists' | 'albums'

export const LibraryPage: React.FC = () => {
  const { songs, filteredSongs, search, play, toggleFavorite } = usePlayerStore()
  const [viewMode, setViewMode] = useState<ViewMode>('songs')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    search(query)
  }

  const handleRefresh = async (event: any) => {
    setTimeout(() => { event.detail.complete() }, 1000)
  }

  const displaySongs = searchQuery ? filteredSongs : songs

  const artists = Array.from(
    new Map(
      displaySongs.map((song) => [
        song.artist,
        {
          name: song.artist,
          songCount: displaySongs.filter((s) => s.artist === song.artist).length,
        },
      ]),
    ).values(),
  )

  const albums = Array.from(
    new Map(
      displaySongs.map((song) => [
        `${song.album}-${song.albumArtist}`,
        {
          name: song.album,
          artist: song.albumArtist,
          songCount: displaySongs.filter((s) => s.album === song.album && s.albumArtist === song.albumArtist).length,
          artwork: song.albumArtworkData,
        },
      ]),
    ).values(),
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="library-header">
          <IonTitle>Library</IonTitle>
        </IonToolbar>
        <IonToolbar className="search-toolbar">
          <IonSearchbar value={searchQuery} onIonInput={(e) => handleSearch(e.detail.value || '')} placeholder="Search songs..." />
        </IonToolbar>
        <IonToolbar className="segment-toolbar">
          <IonSegment value={viewMode} onIonChange={(e) => setViewMode(e.detail.value as ViewMode)}>
            <IonSegmentButton value="songs">
              <IonLabel>Songs</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="artists">
              <IonLabel>Artists</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="albums">
              <IonLabel>Albums</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="library-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {viewMode === 'songs' && (
          <IonList className="songs-list">
            {displaySongs.length > 0 ? (
              displaySongs.map((song) => (
                <IonItem key={song.id} className="song-item">
                  <div className="song-item-content">
                    <div className="song-item-info">
                      <h3>{song.title}</h3>
                      <p>{song.artist}</p>
                    </div>
                    <div className="song-item-actions">
                      <IonButton fill="clear" size="small" onClick={() => toggleFavorite(song.id)}>
                        <IonIcon icon={song.isFavorite ? heart : heartOutline} slot="icon-only" />
                      </IonButton>
                      <IonButton fill="clear" size="small" onClick={() => play(song)}>
                        <IonIcon icon={play} slot="icon-only" />
                      </IonButton>
                    </div>
                  </div>
                </IonItem>
              ))
            ) : (
              <div className="empty-state"><p>No songs found</p></div>
            )}
          </IonList>
        )}

        {viewMode === 'artists' && (
          <div className="artists-grid">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div key={artist.name} className="artist-card">
                  <div className="artist-placeholder">♪</div>
                  <h3>{artist.name}</h3>
                  <p>{artist.songCount} songs</p>
                </div>
              ))
            ) : (
              <div className="empty-state"><p>No artists found</p></div>
            )}
          </div>
        )}

        {viewMode === 'albums' && (
          <div className="albums-grid">
            {albums.length > 0 ? (
              albums.map((album) => (
                <div key={`${album.name}-${album.artist}`} className="album-card">
                  {album.artwork ? <img src={album.artwork} alt={album.name} /> : <div className="album-placeholder">♪</div>}
                  <h3>{album.name}</h3>
                  <p>{album.artist}</p>
                  <p className="song-count">{album.songCount} songs</p>
                </div>
              ))
            ) : (
              <div className="empty-state"><p>No albums found</p></div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}
