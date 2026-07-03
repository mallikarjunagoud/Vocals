import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonIcon } from '@ionic/react'
import { heart, play, trash } from 'ionicons/icons'
import { usePlayerStore } from '../hooks/usePlayerStore'
import './FavoritesPage.css'

export const FavoritesPage: React.FC = () => {
  const { favorites, play, toggleFavorite } = usePlayerStore()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="favorites-header">
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="favorites-content">
        {favorites.length > 0 ? (
          <IonList className="favorites-list">
            {favorites.map((song) => (
              <IonItem key={song.id} className="favorite-item">
                <div className="favorite-item-content">
                  <div className="favorite-item-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <p className="album">{song.album}</p>
                  </div>
                  <div className="favorite-item-actions">
                    <IonButton fill="clear" size="small" onClick={() => play(song)}>
                      <IonIcon icon={play} slot="icon-only" />
                    </IonButton>
                    <IonButton fill="clear" size="small" onClick={() => toggleFavorite(song.id)}>
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonButton>
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <div className="empty-favorites">
            <IonIcon icon={heart} />
            <p>No favorite songs yet</p>
            <p>Mark songs as favorites to see them here</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}
