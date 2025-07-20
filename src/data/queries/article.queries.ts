import { ArticleBaseQueries } from "./article.base.queries";

export class ArticleQueries extends ArticleBaseQueries {

    public getAllArticles(): string {
        return this.getAllArticlesQuery();
    }
    public getAllArticlesWithDetails(): string {
        return this.getAllArticlesWithDetailsQuery();
    }

}