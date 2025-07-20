// import layers
import ArticleRepository from "../repositories/article.repository";

// DTO and mapper import
import { ArticleResponseDTO } from "../dtos/article-response.dto";
import { ArticleWithDetailsMapper } from "../dtos/article-with-details.dto";
import { ArticleMapper } from "../mappers/article.mapper";

// Model import
import { ArticleWithDetailsDTO } from "../models/article-with-details.model";

// Entity import
import Article from "../../domain/entities/article.entity";



class ArticleService {
  private articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }


  /**
   * Get the list of all articles
   * @returns 
   */
  public async getAllArticles(): Promise<ArticleResponseDTO[]> {

    // 1. get raw datas from the database
    const rawArticles: Article[] = await this.articleRepository.getAllArticles();

    // 2. Convert datas into a ArticleEntity entity
    const articleEntities: Article[] = ArticleMapper.toEntities(rawArticles);

    // 3. Convert Entity into a Response DTO (the right format to expose to the client)
    const articleResponseDTOs: ArticleResponseDTO[] = ArticleResponseDTO.fromEntities(articleEntities);

    return articleResponseDTOs;
  }


  /**
   * Retrieves all articles with their associated details (tags and category).
   * @returns {Promise<ArticleWithDetailsDTO[]>} 
   * @throws {Error} 
   */
  public async getAllArticlesWithDetails(): Promise<ArticleWithDetailsDTO[]> {
    try {

      // 1. Fetch raw data from the repository
      const rawArticlesWithDetails = await this.articleRepository.getAllArticlesWithDetails();

      // 2. Convert the raw data to DTOs using the mapper
      const articlesWithDetails = ArticleWithDetailsMapper.fromRawDataArray(rawArticlesWithDetails);

      return articlesWithDetails;

    } catch (error) {
      console.error("Error in ArticleService - getAllArticlesWithDetails:", error);
      throw error;
    }
  }

}

export default ArticleService;
