import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle, IonButton, IonIcon, IonInput } from '@ionic/react'
import { cloudUpload } from 'ionicons/icons'
import { usePlayerStore } from '../hooks/usePlayerStore'
import './SettingsPage.css'

export const SettingsPage: React.FC = () => {
  const { addSongs } = usePlayerStore()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const filePaths = files.map((f) => f.name)

    if (files.length > 0) {
      await addSongs(files as File[], filePaths)
      alert(`${files.length} song(s) added successfully!`)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="settings-header">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="settings-content">
        <IonList className="settings-list">
          <IonItem className="settings-section-header">
            <IonLabel>
              <h2>Music Library</h2>
            </IonLabel>
          </IonItem>

          <IonItem className="import-item">
            <IonLabel>Import Songs</IonLabel>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <IonButton
              slot="end"
              fill="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <IonIcon icon={cloudUpload} slot="start" />
              Browse
            </IonButton>
          </IonItem>

          <IonItem className="settings-section-header">
            <IonLabel>
              <h2>Display</h2>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle slot="end" checked={true} disabled />
          </IonItem>

          <IonItem>
            <IonLabel>Show Album Art</IonLabel>
            <IonToggle slot="end" checked={true} />
          </IonItem>

          <IonItem className="settings-section-header">
            <IonLabel>
              <h2>About</h2>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Version</IonLabel>
            <IonLabel slot="end">1.0.0</IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Supported Formats</IonLabel>
          </IonItem>

          <IonItem lines="none" className="formats-list">
            <IonLabel>
              <p>MP3, AAC, M4A, WAV, FLAC, AIFF</p>
            </IonLabel>
          </IonItem>

          <IonItem className="settings-section-header">
            <IonLabel>
              <h2>Cache</h2>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Clear Cache</IonLabel>
            <IonButton slot="end" fill="outline" color="danger">
              Clear
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
