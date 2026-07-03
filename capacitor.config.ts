import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.vocals.player',
  appName: 'Vocals',
  webDir: 'dist',
  server: { androidScheme: 'https' },
  plugins: { SplashScreen: { launchAutoHide: true, launchShowDuration: 2000 } },
}

export default config
