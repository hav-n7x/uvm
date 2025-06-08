export interface PdfContentItem {
  type: "heading" | "subheading" | "paragraph" | "list" | "keyValue" | "divider"
  text?: string // Para heading, subheading, paragraph, título de lista/keyValue
  level?: 1 | 2 | 3 // Para heading
  items?: string[] // Para list
  data?: { key: string; value: string }[] // Para keyValue
}

export interface PdfPayload {
  documentTitle: string
  content: PdfContentItem[]
}
