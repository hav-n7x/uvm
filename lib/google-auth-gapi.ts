import { GOOGLE_CONFIG, getBaseUrl } from "./google-config"

declare global {
  interface Window {
    gapi: any
    google: any
  }
}

class GoogleAuthGAPI {
  private isInitialized = false
  private authInstance: any = null

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Cargar Google API Script
      await this.loadGoogleAPI()

      // Inicializar gapi
      await new Promise<void>((resolve, reject) => {
        window.gapi.load("auth2:client", {
          callback: resolve,
          onerror: reject,
        })
      })

      // Configurar cliente con URLs dinámicas
      await window.gapi.client.init({
        clientId: GOOGLE_CONFIG.clientId,
        scope: GOOGLE_CONFIG.scopes.join(" "),
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
          "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        // Configurar redirect URI dinámicamente
        redirect_uri: getBaseUrl(),
      })

      this.authInstance = window.gapi.auth2.getAuthInstance()
      this.isInitialized = true

      console.log("✅ Google API inicializada correctamente")
      console.log("🌐 Base URL:", getBaseUrl())
      console.log("🔑 Client ID:", GOOGLE_CONFIG.clientId)
    } catch (error) {
      console.error("❌ Error inicializando Google API:", error)
      throw error
    }
  }

  private loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = "https://apis.google.com/js/api.js"
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log("✅ Google API script cargado")
        resolve()
      }
      script.onerror = () => {
        console.error("❌ Error cargando Google API script")
        reject(new Error("Failed to load Google API"))
      }
      document.head.appendChild(script)
    })
  }

  async signIn(): Promise<boolean> {
    try {
      await this.initialize()

      if (this.authInstance.isSignedIn.get()) {
        console.log("✅ Usuario ya autenticado")
        return true
      }

      console.log("🔐 Iniciando proceso de autenticación...")
      await this.authInstance.signIn({
        prompt: "select_account",
      })

      console.log("✅ Autenticación exitosa")
      return true
    } catch (error) {
      console.error("❌ Error en autenticación:", error)
      return false
    }
  }

  async signOut(): Promise<void> {
    if (this.authInstance) {
      await this.authInstance.signOut()
      console.log("✅ Sesión cerrada")
    }
  }

  isSignedIn(): boolean {
    return this.authInstance?.isSignedIn.get() || false
  }

  getCurrentUser(): any {
    return this.authInstance?.currentUser.get()
  }

  getAccessToken(): string | null {
    const user = this.getCurrentUser()
    return user?.getAuthResponse()?.access_token || null
  }

  getUserProfile(): any {
    const user = this.getCurrentUser()
    return user?.getBasicProfile()
  }
}

export const googleAuthGAPI = new GoogleAuthGAPI()
