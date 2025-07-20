import { ArticleWithDetailsDTO } from "../models/article-with-details.model";



  export class ArticleWithDetailsMapper {
    
    /**
     * Convert raw datasfrom the databse to the DTO
     */
    static fromRawData(rawData: any): ArticleWithDetailsDTO {
      return {

        // Article
        id_articles: rawData.id_articles,
        title: rawData.title,
        description: rawData.description,
        creation_date: new Date(rawData.creation_date),
        cover: rawData.cover,
        is_display: rawData.is_display,
        id_categories: rawData.id_categories,
        update_date: new Date(rawData.update_date),
        id_author: rawData.id_author,

        // Category
        category_name: rawData.category_name,
        
        // Author
        author: typeof rawData.author === 'string' 
          ? JSON.parse(rawData.author) 
          : rawData.author,
        
          // Tags
        tags: typeof rawData.tags === 'string' 
          ? JSON.parse(rawData.tags) 
          : rawData.tags || []
      };
    }
  
    /**
     * Convert a raw data array into a DTOs array
     */
    static fromRawDataArray(rawDataArray: any[]): ArticleWithDetailsDTO[] {
      return rawDataArray.map(rawData => this.fromRawData(rawData));
    }
  }