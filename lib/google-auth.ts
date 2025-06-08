import { GOOGLE_CONFIG } from "./google-config"

class GoogleAuthService {
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private tokenExpiry: number | null = null

  constructor() {
    // Cargar tokens del localStorage si existen
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("google_access_token")
      this.refreshToken = localStorage.getItem("google_refresh_token")
      const expiry = localStorage.getItem("google_token_expiry")
      this.tokenExpiry = expiry ? Number.parseInt(expiry) : null
    }
  }

  // Iniciar el flujo de autenticación OAuth
  async signIn(): Promise<void> {
    const authUrl = new URL(GOOGLE_CONFIG.authUri)
    authUrl.searchParams.append("client_id", GOOGLE_CONFIG.clientId)
    authUrl.searchParams.append("redirect_uri", GOOGLE_CONFIG.redirectUris[0])
    authUrl.searchParams.append("scope", GOOGLE_CONFIG.scopes.join(" "))
    authUrl.searchParams.append("response_type", "code")
    authUrl.searchParams.append("access_type", "offline")
    authUrl.searchParams.append("prompt", "consent")

    // Redirigir al usuario a Google OAuth
    window.location.href = authUrl.toString()
  }

  // Intercambiar código de autorización por tokens
  async exchangeCodeForTokens(code: string): Promise<void> {
    const response = await fetch(GOOGLE_CONFIG.tokenUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: GOOGLE_CONFIG.redirectUris[0],
      }),
    })

    const data = await response.json()

    if (data.access_token) {
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token
      this.tokenExpiry = Date.now() + data.expires_in * 1000

      // Guardar en localStorage
      localStorage.setItem("google_access_token", this.accessToken)
      if (this.refreshToken) {
        localStorage.setItem("google_refresh_token", this.refreshToken)
      }
      localStorage.setItem("google_token_expiry", this.tokenExpiry.toString())
    }
  }

  // Renovar token de acceso
  async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await fetch(GOOGLE_CONFIG.tokenUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: "refresh_token",
      }),
    })

    const data = await response.json()

    if (data.access_token) {
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + data.expires_in * 1000

      localStorage.setItem("google_access_token", this.accessToken)
      localStorage.setItem("google_token_expiry", this.tokenExpiry.toString())
    }
  }

  // Obtener token válido (renovar si es necesario)
  async getValidToken(): Promise<string> {
    if (!this.accessToken) {
      throw new Error("No access token available")
    }

    // Verificar si el token ha expirado
    if (this.tokenExpiry && Date.now() >= this.tokenExpiry - 60000) {
      // 1 minuto antes
      await this.refreshAccessToken()
    }

    return this.accessToken
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  // Cerrar sesión
  signOut(): void {
    this.accessToken = null
    this.refreshToken = null
    this.tokenExpiry = null

    localStorage.removeItem("google_access_token")
    localStorage.removeItem("google_refresh_token")
    localStorage.removeItem("google_token_expiry")
  }

  // Hacer petición autenticada a las APIs de Google
  async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await this.getValidToken()

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }
}

export const googleAuth = new GoogleAuthService()
