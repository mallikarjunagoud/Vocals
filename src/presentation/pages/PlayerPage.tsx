import React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonProgressBar
} from '@ionic/react'

import {
  play,
  pause,
  playSkipForward,
  playSkipBack,
  shuffle,
  repeat
} from 'ionicons/icons'

import { usePlayerStore } from '../hooks/usePlayerStore'
import './PlayerPage.css'

export const PlayerPage: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeat,
    volume,
    play,
    pause: pausePlay,
    next,
    previous,
    toggleShuffle,
    toggleRepeat,
    setVolume,
    seek
  } = usePlayerStore()

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    seek(percent * duration)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="player-header">
          <IonTitle>Now Playing</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="player-content">
        <div className="player-container">
          {currentSong ? (
            <>
              <div className="album-artwork">
                {currentSong.albumArtworkData ? (
                  <img
                    src={currentSong.albumArtworkData}
                    alt={currentSong.album}
                  />
                ) : (
                  <div className="artwork-placeholder">♪</div>
                )}
              </div>

              <div className="song-info">
                <h1 className="song-title">{currentSong.title}</h1>
                <p className="song-artist">{currentSong.artist}</p>
                <p className="song-album">{currentSong.album}</p>
              </div>

              <div className="progress-section">
                <div className="progress-time">
                  {formatTime(currentTime)}
                </div>

                <div
                  className="progress-bar-container"
                  onClick={handleProgressClick}
                >
                  <IonProgressBar
                    value={duration ? currentTime / duration : 0}
                    className="progress-bar"
                  />
                </div>

                <div className="progress-time">
                  {formatTime(duration - currentTime)}
                </div>
              </div>

              <div className="player-controls">
                <IonButton
                  fill="clear"
                  size="large"
                  onClick={toggleShuffle}
                  className={shuffle ? 'active' : ''}
                >
                  <IonIcon icon={shuffle} slot="icon-only" />
                </IonButton>

                <IonButton fill="clear" size="large" onClick={previous}>
                  <IonIcon icon={playSkipBack} slot="icon-only" />
                </IonButton>

                <IonButton
                  fill="solid"
                  size="large"
                  onClick={() =>
                    isPlaying ? pausePlay() : play(currentSong)
                  }
                  className="play-btn"
                >
                  <IonIcon
                    icon={isPlaying ? pause : play}
                    slot="icon-only"
                  />
                </IonButton>

                <IonButton fill="clear" size="large" onClick={next}>
                  <IonIcon icon={playSkipForward} slot="icon-only" />
                </IonButton>

                <IonButton
                  fill="clear"
                  size="large"
                  onClick={toggleRepeat}
                  className={repeat !== 'off' ? 'active' : ''}
                >
                  <IonIcon icon={repeat} slot="icon-only" />
                </IonButton>
              </div>

              <div className="volume-section">
                <label>Volume: {volume}%</label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="volume-slider"
                />
              </div>
            </>
          ) : (
            <div className="empty-player">
              <p>No song selected</p>
              <p>Go to Library to add and play songs</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
