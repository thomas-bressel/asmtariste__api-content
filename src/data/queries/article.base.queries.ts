export abstract class ArticleBaseQueries {


    /**
     * Get all articles from database
     * @returns 
     */
    protected getAllArticlesQuery(): string {
        return `SELECT * FROM articles`;
    }
    /**
     * Get all articles from database with tag, author and category details
     * @returns 
     */
    protected getAllArticlesWithDetailsQuery(): string {
        return `SELECT 
          a.*,
          c.name AS category_name,
          JSON_OBJECT(
              'id_author', au.id_author,
              'user_uuid', au.user_uuid,
              'author_nickname', au.author_nickname
          ) AS author,
          (
              SELECT COALESCE(JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id_tags', t.id_tags,
                      'label', t.label,
                      'color', t.color,
                      'background_color', t.background_color,
                      'border_color', t.border_color
                  )
              ), JSON_ARRAY())
              FROM article_tags at2
              JOIN tags t ON t.id_tags = at2.id_tags
              WHERE at2.id_articles = a.id_articles 
              AND t.is_display = 1
          ) AS tags
      FROM articles a
      LEFT JOIN categories c ON c.id_categories = a.id_categories
      LEFT JOIN author au ON au.id_author = a.id_author
      
      ORDER BY a.creation_date ASC`;
    }

}