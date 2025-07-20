import Article from "../../domain/entities/article.entity";

export class ArticleMapper {

    /**
     * Converts a raw data row into an Article entity instance.
     * @param row The raw data row (e.g., from an SQL query).
     * @returns An instance of the Article entity.
     */
    static toEntity(row: any): Article {
        return new Article(
        row.id_articles,
        row.title,
        row.description,
        row.creation_date,
        row.cover,
        row.is_display,
        row.id_categories,
        row.update_date,
        row.id_author,
        );
    }


    /**
     * Converts an array of raw data rows into an array of Article entities.
     * @param rows The array of raw data rows.
     * @returns An array of Article entity instances.
     */
    static toEntities(rows: any[]): Article[] {
        return rows.map(row => this.toEntity(row));
    }
}