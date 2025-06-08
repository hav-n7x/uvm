import { googleAuthGAPI } from "./google-auth-gapi"

export class GoogleDriveService {
  async listFiles(pageSize = 10, query?: string) {
    await googleAuthGAPI.initialize()

    const params: any = {
      pageSize,
      fields: "files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink)",
    }

    if (query) {
      params.q = `name contains '${query}'`
    }

    const response = await window.gapi.client.drive.files.list(params)
    return response.result
  }

  async uploadFile(file: File, parentId?: string) {
    await googleAuthGAPI.initialize()

    const metadata = {
      name: file.name,
      parents: parentId ? [parentId] : undefined,
    }

    // Usar la API de upload multipart
    const form = new FormData()
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }))
    form.append("file", file)

    const accessToken = googleAuthGAPI.getAccessToken()

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    })

    return await response.json()
  }

  async deleteFile(fileId: string) {
    await googleAuthGAPI.initialize()
    const response = await window.gapi.client.drive.files.delete({ fileId })
    return response.status === 200
  }

  async createFolder(name: string, parentId?: string) {
    await googleAuthGAPI.initialize()

    const metadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : undefined,
    }

    const response = await window.gapi.client.drive.files.create({
      resource: metadata,
    })

    return response.result
  }
}

export class GoogleSheetsService {
  async createSpreadsheet(title: string) {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.sheets.spreadsheets.create({
      resource: {
        properties: {
          title,
        },
      },
    })

    return response.result
  }

  async getValues(spreadsheetId: string, range: string) {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    return response.result
  }

  async updateValues(spreadsheetId: string, range: string, values: any[][]) {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: {
        values,
      },
    })

    return response.result
  }
}

export class GoogleCalendarService {
  async listCalendars() {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.calendar.calendarList.list()
    return response.result
  }

  async listEvents(calendarId = "primary", maxResults = 10) {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.calendar.events.list({
      calendarId,
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
    })

    return response.result
  }

  async createEvent(calendarId = "primary", event: any) {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.calendar.events.insert({
      calendarId,
      resource: event,
    })

    return response.result
  }
}

export class GoogleGmailService {
  async listMessages(maxResults = 10, query?: string) {
    await googleAuthGAPI.initialize()

    const params: any = {
      userId: "me",
      maxResults,
    }

    if (query) {
      params.q = query
    }

    const response = await window.gapi.client.gmail.users.messages.list(params)
    return response.result
  }

  async getMessage(messageId: string) {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.gmail.users.messages.get({
      userId: "me",
      id: messageId,
    })

    return response.result
  }

  async listLabels() {
    await googleAuthGAPI.initialize()

    const response = await window.gapi.client.gmail.users.labels.list({
      userId: "me",
    })

    return response.result
  }
}

// Instancias exportadas
export const googleDriveService = new GoogleDriveService()
export const googleSheetsService = new GoogleSheetsService()
export const googleCalendarService = new GoogleCalendarService()
export const googleGmailService = new GoogleGmailService()
