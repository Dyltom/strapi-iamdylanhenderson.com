import { factories } from "@strapi/strapi";
import readingTime from "reading-time";
import {
  calculateAndUpdateReadTime,
  extractText,
} from "../../../utils/strings";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params; // This could be either an ID or a slug

      // Check if the provided identifier is a numeric ID or a slug
      const isId = Number.isInteger(parseInt(id));

      // Find the article either by ID or slug
      const entityQuery = isId
        ? { where: { $or: [{ slug: id }, { id: id }] } }
        : { where: { slug: id } };
      const article = await strapi.db
        .query("api::article.article")
        .findOne(entityQuery);

      if (!article) {
        // Handle not found case
        return ctx.notFound("Article not found.");
      }

      if (article.Content) {
        const text = extractText(article.Content as ParagraphNode[]);
        const readTimeResult = readingTime(text).time;

        const updatedArticle = await strapi.entityService.update(
          "api::article.article",
          article.id, // Use the found article's ID for updating
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

    async find() {
      const articles = await strapi.entityService.findMany(
        "api::article.article",
      );

      const updatedArticles = await Promise.all(
        articles.map((article) => {
          if (article.Content) {
            return calculateAndUpdateReadTime(article);
          }
          return article;
        }),
      );

      return updatedArticles;
    },
  }),
);
