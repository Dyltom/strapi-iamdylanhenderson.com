import { Attribute } from "@strapi/strapi";
import readingTime from "reading-time";

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

export const calculateAndUpdateReadTime = (
  article: Attribute.GetValues<
    "api::article.article",
    Attribute.GetNonPopulatableKeys<"api::article.article">
  >,
  updateViews: boolean = false,
) => {
  const text = extractText(article.content as ParagraphNode[]);
  const readTimeResult = readingTime(text).time;
  const updateData: { data: { views?: number; readTime: number } } = {
    data: { readTime: readTimeResult },
  };

  if (updateViews) {
    updateData.data.views = (article.views || 0) + 1;
  }

  return strapi.entityService.update(
    "api::article.article",
    article.id,
    updateData,
  );
};
