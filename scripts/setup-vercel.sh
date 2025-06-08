#!/bin/bash

echo "🚀 Configurando Portal UVM para despliegue en Vercel..."

# Verificar que Vercel CLI esté instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado. Instalando..."
    npm install -g vercel
fi

echo "📝 Configurando variables de entorno..."

# Configurar variables de entorno en Vercel
vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add NEXT_PUBLIC_GOOGLE_PROJECT_ID production
vercel env add NEXTAUTH_SECRET production

echo "🔧 Configurando dominio personalizado..."
echo "Recuerda configurar tu dominio personalizado en Vercel Dashboard"

echo "☁️ Desplegando aplicación..."
vercel --prod

echo "✅ ¡Despliegue completado!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a Google Cloud Console"
echo "2. Agrega tu URL de Vercel a los orígenes autorizados"
echo "3. Agrega tu URL de Vercel a las URIs de redirección"
echo "4. Verifica que todas las APIs estén habilitadas"
echo ""
echo "🌐 Tu aplicación estará disponible en:"
echo "https://tu-app.vercel.app"
