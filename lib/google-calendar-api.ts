import { googleAuth } from "./google-auth"
import { GOOGLE_APIS } from "./google-config"

export class GoogleCalendarAPI {
  // Listar calendarios
  async listCalendars() {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.calendar}/users/me/calendarList`)
    return await response.json()
  }

  // Listar eventos
  async listEvents(calendarId = "primary", maxResults = 10) {
    const response = await googleAuth.makeAuthenticatedRequest(
      `${GOOGLE_APIS.calendar}/calendars/${calendarId}/events?maxResults=${maxResults}&singleEvents=true&orderBy=startTime`,
    )
    return await response.json()
  }

  // Crear evento
  async createEvent(calendarId = "primary", event: any) {
    const response = await googleAuth.makeAuthenticatedRequest(
      `${GOOGLE_APIS.calendar}/calendars/${calendarId}/events`,
      {
        method: "POST",
        body: JSON.stringify(event),
      },
    )
    return await response.json()
  }

  // Eliminar evento
  async deleteEvent(calendarId = "primary", eventId: string) {
    const response = await googleAuth.makeAuthenticatedRequest(
      `${GOOGLE_APIS.calendar}/calendars/${calendarId}/events/${eventId}`,
      {
        method: "DELETE",
      },
    )
    return response.ok
  }
}

export const googleCalendar = new GoogleCalendarAPI()
