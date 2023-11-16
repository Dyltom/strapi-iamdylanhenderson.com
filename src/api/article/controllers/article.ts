import { factories } from "@strapi/strapi";
import { calculateAndUpdateReadTime } from "../../../utils/strings";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const isId = Number.isInteger(parseInt(id));
      const entityQuery = isId
        ? { where: { $or: [{ slug: id }, { id: id }] } }
        : { where: { slug: id } };
      const article = await strapi.db
        .query("api::article.article")
        .findOne(entityQuery);

      if (!article) {
        return ctx.notFound("Article not found.");
      }

      if (article.Content) {
        return this.calculateAndUpdateReadTime(article, true);
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
