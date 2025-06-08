# Portal UVM - Aplicación Estudiantil

Portal universitario integrado con Google Workspace para estudiantes de UVM.

## 🚀 Características

- ✅ Dashboard estudiantil completo
- ✅ Integración con Google Workspace (Drive, Sheets, Calendar, Gmail)
- ✅ Sistema de tareas con calificación automática
- ✅ Gestión de certificaciones y beneficios
- ✅ Calendario académico
- ✅ Perfil de estudiante
- ✅ Modo oscuro/claro
- ✅ Diseño responsive

## 🛠️ Tecnologías

- **Framework**: Next.js 14
- **UI**: Tailwind CSS + shadcn/ui
- **Autenticación**: Google OAuth 2.0
- **APIs**: Google Workspace APIs
- **Despliegue**: Vercel

## 📋 Configuración para Despliegue

### 1. Variables de Entorno en Vercel

Configura estas variables en tu dashboard de Vercel:

\`\`\`bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=403337264341-qpslao6kis46an8j6upt9ig923s8e53m.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXT_PUBLIC_GOOGLE_PROJECT_ID=axial-acrobat-458507-d8
NEXTAUTH_SECRET=genera-un-secret-seguro-aqui
\`\`\`

### 2. Configuración en Google Cloud Console

1. **Ve a Google Cloud Console**: https://console.cloud.google.com
2. **Selecciona tu proyecto**: `axial-acrobat-458507-d8`
3. **Ve a "APIs y servicios" > "Credenciales"**
4. **Edita tu OAuth 2.0 Client ID**
5. **Agrega estos URIs autorizados**:

#### Orígenes JavaScript autorizados:
\`\`\`
https://tu-app.vercel.app
https://myuvm.com
https://uvm.com
\`\`\`

#### URIs de redirección autorizados:
\`\`\`
https://tu-app.vercel.app
https://myuvm.com
\`\`\`

### 3. APIs que deben estar habilitadas:

- ✅ Google Drive API
- ✅ Google Sheets API
- ✅ Google Calendar API
- ✅ Gmail API
- ✅ Google+ API (para perfil de usuario)

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Opción 2: Desde CLI
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod

# Configurar variables de entorno
vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add NEXT_PUBLIC_GOOGLE_PROJECT_ID
vercel env add NEXTAUTH_SECRET
\`\`\`

## 🔧 Desarrollo Local

\`\`\`bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
\`\`\`

## 📱 Funcionalidades Principales

### Dashboard
- Vista general de actividades estudiantiles
- Slider de imágenes del campus
- Acceso rápido a todas las secciones

### Google Workspace
- **Drive**: Subir, gestionar y compartir archivos
- **Sheets**: Crear y editar hojas de cálculo
- **Calendar**: Ver eventos académicos
- **Gmail**: Leer correos (solo lectura)

### Sistema Académico
- **Tareas**: Entrega con calificación automática
- **Exámenes**: Programación y resultados
- **Certificaciones**: Gestión de certificados
- **Calendario**: Eventos y fechas importantes

### Perfil y Configuración
- Información personal del estudiante
- Configuración de notificaciones
- Preferencias de tema
- Gestión de privacidad

## 🔒 Seguridad

- Autenticación OAuth 2.0 con Google
- Variables de entorno para credenciales sensibles
- Headers de seguridad configurados
- Validación de permisos por API

## 📞 Soporte

Para soporte técnico o preguntas sobre la aplicación, contacta al equipo de desarrollo.

---

**Desarrollado para Universidad del Valle de México (UVM)**
\`\`\`

Ahora voy a crear un script de configuración automática:
