import { factories } from "@strapi/strapi";
import { extractText } from "../../../utils/strings";

import readingTime from "reading-time";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;
      const article = await strapi.entityService.findOne(
        "api::article.article",
        id,
      );

      if (article.Content) {
        const text = extractText(article.Content as ParagraphNode[]);
        const readTimeResult = readingTime(text).time;

        const updatedArticle = await strapi.entityService.update(
          "api::article.article",
          id,
          {
            data: {
              views: (article.views || 0) + 1,
              readTime: readTimeResult,
            },
          },
        );

        return updatedArticle;
      }

      return article;
    },
  }),
);
