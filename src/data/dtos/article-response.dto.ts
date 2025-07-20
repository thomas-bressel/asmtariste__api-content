import  Article  from '../../domain/entities/article.entity';


export class ArticleResponseDTO {
  constructor(
    public id_articles: number,
    public title: string,
    public description: string,
    public creation_date: Date,
    public cover: string,
    public is_display: boolean,
    public id_categories: number,
    public update_date: Date,
    public id_author: number,
  ) {}

  /**
   * Create a DTO from an entity
   * @param article 
   * @returns 
   */
  static fromEntity(article: Article): ArticleResponseDTO {
    return new ArticleResponseDTO(
      article.id_articles,
      article.title,
      article.description,
      article.creation_date,
      article.cover,
      article.is_display,
      article.id_categories,
      article.update_date,
      article.id_author,
    );
  }


  /**
   * Convert an entities list into DTO
   * @param articles 
   * @returns 
   */
  static fromEntities(articles: Article[]): ArticleResponseDTO[] {
    return articles.map((article) => ArticleResponseDTO.fromEntity(article));
  }


}