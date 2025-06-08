import { googleAuth } from "./google-auth"
import { GOOGLE_APIS } from "./google-config"

export class GoogleSheetsAPI {
  // Crear nueva hoja de cálculo
  async createSpreadsheet(title: string) {
    const response = await googleAuth.makeAuthenticatedRequest(GOOGLE_APIS.sheets, {
      method: "POST",
      body: JSON.stringify({
        properties: {
          title: title,
        },
      }),
    })
    return await response.json()
  }

  // Leer datos de una hoja
  async getValues(spreadsheetId: string, range: string) {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.sheets}/${spreadsheetId}/values/${range}`)
    return await response.json()
  }

  // Escribir datos en una hoja
  async updateValues(spreadsheetId: string, range: string, values: any[][]) {
    const response = await googleAuth.makeAuthenticatedRequest(
      `${GOOGLE_APIS.sheets}/${spreadsheetId}/values/${range}?valueInputOption=RAW`,
      {
        method: "PUT",
        body: JSON.stringify({
          values: values,
        }),
      },
    )
    return await response.json()
  }

  // Obtener información de la hoja
  async getSpreadsheet(spreadsheetId: string) {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.sheets}/${spreadsheetId}`)
    return await response.json()
  }
}

export const googleSheets = new GoogleSheetsAPI()
