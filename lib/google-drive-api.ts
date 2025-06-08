import { googleAuth } from "./google-auth"
import { GOOGLE_APIS } from "./google-config"

export class GoogleDriveAPI {
  // Listar archivos
  async listFiles(pageSize = 10, query?: string) {
    let url = `${GOOGLE_APIS.drive}/files?pageSize=${pageSize}&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink)`

    if (query) {
      url += `&q=name contains '${query}'`
    }

    const response = await googleAuth.makeAuthenticatedRequest(url)
    return await response.json()
  }

  // Subir archivo
  async uploadFile(file: File, parentId?: string) {
    const metadata = {
      name: file.name,
      parents: parentId ? [parentId] : undefined,
    }

    const form = new FormData()
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }))
    form.append("file", file)

    const response = await fetch(`${GOOGLE_APIS.drive}/files?uploadType=multipart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await googleAuth.getValidToken()}`,
      },
      body: form,
    })

    return await response.json()
  }

  // Eliminar archivo
  async deleteFile(fileId: string) {
    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.drive}/files/${fileId}`, {
      method: "DELETE",
    })
    return response.ok
  }

  // Crear carpeta
  async createFolder(name: string, parentId?: string) {
    const metadata = {
      name: name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : undefined,
    }

    const response = await googleAuth.makeAuthenticatedRequest(`${GOOGLE_APIS.drive}/files`, {
      method: "POST",
      body: JSON.stringify(metadata),
    })

    return await response.json()
  }
}

export const googleDrive = new GoogleDriveAPI()
