import { PDFDocument, rgb, StandardFonts, type PDFFont, PageSizes } from "pdf-lib"
import { NextResponse } from "next/server"
import type { PdfPayload } from "@/types/pdf-types" // Importar tipos

const MARGIN = 50
const HEADER_FOOTER_MARGIN = 30 // Margen más pequeño para header/footer
const LINE_HEIGHT_NORMAL = 16
const LINE_HEIGHT_HEADING = 22
const LINE_HEIGHT_SUBHEADING = 18
const FONT_SIZE_NORMAL = 10
const FONT_SIZE_SMALL = 8
const FONT_SIZE_HEADING = 16
const FONT_SIZE_SUBHEADING = 12

async function drawPdfContent(pdfDoc: PDFDocument, payload: PdfPayload) {
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // 1. Añadir la primera página INMEDIATAMENTE y obtener sus dimensiones
  let page = pdfDoc.addPage(PageSizes.A4)
  const { width, height } = page.getSize() // Ahora 'page' está definida
  let currentPageIndex = 0 // El índice de la página actual (0 para la primera)

  // y se inicializa después de definir drawHeader y antes de dibujar el contenido principal
  // let y = height - MARGIN - LINE_HEIGHT_HEADING; // Se moverá después de drawHeader

  const drawHeader = (currentPageArg: typeof page, title: string) => {
    // Renombrar currentPage a currentPageArg para evitar conflicto
    currentPageArg.drawText(title, {
      x: MARGIN,
      y: height - HEADER_FOOTER_MARGIN - 10,
      font: fontRegular,
      size: FONT_SIZE_SMALL,
      color: rgb(0.3, 0.3, 0.3),
    })
    currentPageArg.drawLine({
      start: { x: MARGIN, y: height - HEADER_FOOTER_MARGIN - 15 },
      end: { x: width - MARGIN, y: height - HEADER_FOOTER_MARGIN - 15 },
      thickness: 0.5,
      color: rgb(0.7, 0.7, 0.7),
    })
  }

  // Inicializar 'y' después de que 'height' y 'LINE_HEIGHT_HEADING' estén definidos y drawHeader exista
  let y = height - MARGIN - LINE_HEIGHT_HEADING

  // 2. Dibujar header en la primera página (que ya fue creada)
  drawHeader(page, payload.documentTitle)
  // y ya está inicializado correctamente arriba

  const addNewPage = (): typeof page => {
    const newPage = pdfDoc.addPage(PageSizes.A4)
    currentPageIndex++
    drawHeader(newPage, payload.documentTitle)
    y = height - MARGIN - LINE_HEIGHT_HEADING // Reset y para la nueva página
    return newPage
  }

  // Función para añadir texto y manejar saltos de página
  const addText = (
    text: string,
    font: PDFFont,
    size: number,
    lineHeight: number,
    xOffset: number = MARGIN,
    isListItem = false,
  ) => {
    const textWidthMax = width - MARGIN - xOffset // Ancho disponible
    const lines = []
    let currentLine = ""
    const words = text.split(" ")

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word
      if (font.widthOfTextAtSize(testLine, size) < textWidthMax) {
        currentLine = testLine
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)

    for (const line of lines) {
      if (y - lineHeight < MARGIN + HEADER_FOOTER_MARGIN) {
        // Considerar espacio para footer
        page = addNewPage()
      }
      page.drawText(line, { x: xOffset, y, font, size, color: rgb(0, 0, 0) })
      y -= lineHeight
    }
  }

  // Dibujar título principal del documento (debajo del header)
  addText(payload.documentTitle, fontBold, FONT_SIZE_HEADING, LINE_HEIGHT_HEADING * 1.2)
  y -= LINE_HEIGHT_NORMAL * 0.5

  for (const item of payload.content) {
    if (y < MARGIN + HEADER_FOOTER_MARGIN + LINE_HEIGHT_NORMAL * 2) {
      page = addNewPage()
    }

    switch (item.type) {
      case "heading":
        addText(
          item.text || "",
          fontBold,
          item.level === 1 ? FONT_SIZE_SUBHEADING + 2 : FONT_SIZE_SUBHEADING,
          item.level === 1 ? LINE_HEIGHT_HEADING : LINE_HEIGHT_SUBHEADING,
        )
        y -= LINE_HEIGHT_NORMAL * 0.3
        break
      case "subheading":
        addText(item.text || "", fontBold, FONT_SIZE_SUBHEADING, LINE_HEIGHT_SUBHEADING)
        y -= LINE_HEIGHT_NORMAL * 0.2
        break
      case "paragraph":
        addText(item.text || "", fontRegular, FONT_SIZE_NORMAL, LINE_HEIGHT_NORMAL)
        y -= LINE_HEIGHT_NORMAL * 0.5
        break
      case "list":
        if (item.text) {
          addText(item.text, fontBold, FONT_SIZE_NORMAL + 1, LINE_HEIGHT_SUBHEADING)
          y -= LINE_HEIGHT_NORMAL * 0.2
        }
        item.items?.forEach((listItem) => {
          addText(`• ${listItem}`, fontRegular, FONT_SIZE_NORMAL, LINE_HEIGHT_NORMAL, MARGIN + 10, true)
        })
        y -= LINE_HEIGHT_NORMAL * 0.5
        break
      case "keyValue":
        if (item.text) {
          addText(item.text, fontBold, FONT_SIZE_NORMAL + 1, LINE_HEIGHT_SUBHEADING)
          y -= LINE_HEIGHT_NORMAL * 0.2
        }
        item.data?.forEach((pair) => {
          const keyText = `${pair.key}: `
          const valueText = pair.value

          if (y - LINE_HEIGHT_NORMAL < MARGIN + HEADER_FOOTER_MARGIN) {
            page = addNewPage()
          }

          const keyWidth = fontBold.widthOfTextAtSize(keyText, FONT_SIZE_NORMAL)
          // Dibujar clave
          page.drawText(keyText, { x: MARGIN, y, font: fontBold, size: FONT_SIZE_NORMAL, color: rgb(0, 0, 0) })
          // Dibujar valor, ajustando para que no se solape si es largo
          addText(valueText, fontRegular, FONT_SIZE_NORMAL, LINE_HEIGHT_NORMAL, MARGIN + keyWidth + 2)
          // 'addText' ya decrementa 'y', así que no necesitamos hacerlo aquí explícitamente para el valor
          // si el valor ocupa múltiples líneas. Si es una sola línea, el 'y' global se decrementa una vez.
        })
        y -= LINE_HEIGHT_NORMAL * 0.5 // Espacio después del grupo K/V
        break
      case "divider":
        if (y - 20 < MARGIN + HEADER_FOOTER_MARGIN) {
          page = addNewPage()
        }
        page.drawLine({
          start: { x: MARGIN, y: y - 5 },
          end: { x: width - MARGIN, y: y - 5 },
          thickness: 0.5,
          color: rgb(0.7, 0.7, 0.7),
        })
        y -= 20
        break
    }
  }

  // Dibujar Footer en todas las páginas
  const totalPages = pdfDoc.getPageCount()
  pdfDoc.getPages().forEach((p, index) => {
    p.drawText(`Página ${index + 1} de ${totalPages}`, {
      x: width / 2 - fontRegular.widthOfTextAtSize(`Página ${index + 1} de ${totalPages}`, FONT_SIZE_SMALL) / 2,
      y: HEADER_FOOTER_MARGIN,
      font: fontRegular,
      size: FONT_SIZE_SMALL,
      color: rgb(0.3, 0.3, 0.3),
    })
  })
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PdfPayload

    if (!payload || !payload.documentTitle || !payload.content) {
      return NextResponse.json({ message: "Payload inválido" }, { status: 400 })
    }

    const pdfDoc = await PDFDocument.create()
    pdfDoc.setAuthor("Portal UVM")
    pdfDoc.setTitle(payload.documentTitle)
    pdfDoc.setCreator("Generador PDF UVM v0")
    pdfDoc.setProducer("pdf-lib")

    await drawPdfContent(pdfDoc, payload) // La función ahora añade la primera página

    const pdfBytes = await pdfDoc.save()
    const safeFileName = payload.documentTitle.replace(/[^a-z0-9_.-]/gi, "_") + ".pdf"

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}"`,
      },
    })
  } catch (error) {
    console.error("Error generando PDF:", error)
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    return NextResponse.json({ message: "Error al generar el PDF", error: errorMessage }, { status: 500 })
  }
}
