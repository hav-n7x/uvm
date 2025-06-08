// Configuración de Google OAuth para producción
export const GOOGLE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID!,

  // URLs dinámicas basadas en el entorno
  redirectUris: [
    process.env.NEXTAUTH_URL || "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    "https://myuvm.com", // Tu dominio personalizado
  ].filter(Boolean),

  // Orígenes autorizados
  javascriptOrigins: [
    process.env.NEXTAUTH_URL || "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    "https://uvm.com", // Tu dominio personalizado
    "https://myuvm.com",
  ].filter(Boolean),

  // Scopes necesarios para las APIs
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
}

// URLs de las APIs de Google
export const GOOGLE_APIS = {
  drive: "https://www.googleapis.com/drive/v3",
  sheets: "https://sheets.googleapis.com/v4/spreadsheets",
  gmail: "https://gmail.googleapis.com/gmail/v1",
  calendar: "https://www.googleapis.com/calendar/v3",
  oauth2: "https://www.googleapis.com/oauth2/v2",
}

// Configuración para desarrollo vs producción
export const isDevelopment = process.env.NODE_ENV === "development"
export const isProduction = process.env.NODE_ENV === "production"

// URL base de la aplicación
export const getBaseUrl = () => {
  if (isDevelopment) return "http://localhost:3000"
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NEXTAUTH_URL || "https://myuvm.com"
}
