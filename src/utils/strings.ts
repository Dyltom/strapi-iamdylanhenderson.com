export function extractText(content: ParagraphNode[]): string {
  let allText = "";
  content.forEach((paragraph) => {
    paragraph.children.forEach((child) => {
      if (child.type === "text") {
        allText += child.text + " ";
      }
    });
  });
  return allText;
}
