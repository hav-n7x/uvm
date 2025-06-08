import { googleAuth } from "./google-auth"
import { GOOGLE_APIS } from "./google-config"

export class GoogleGmailAPI {
  // Listar mensajes
  async listMessages(maxResults = 10, query?: string) {
    let url = `${GOOGLE_APIS.gmail}/users/me/messages?maxResults=${maxResults}`

    if (query) {
      url += `&q=${encodeURIComponent(query)}`
    }

    const response = await googleAuth.makeAuthenticatedRequest(url)
    return await response.json()
  }

  // Obtener mensaje específico
  async getMessage(messageId: string) {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.gmail}/users/me/messages/${messageId}`)
    return await response.json()
  }

  // Listar etiquetas
  async listLabels() {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.gmail}/users/me/labels`)
    return await response.json()
  }

  // Obtener perfil del usuario
  async getProfile() {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.gmail}/users/me/profile`)
    return await response.json()
  }
}

export const googleGmail = new GoogleGmailAPI()
