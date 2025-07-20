import MySQLContentModule from "../../infrastructure/database/mysql-content.connexion";
import { createPool, Pool } from "mysql2/promise";
import { ArticleQueries } from "../../data/queries/article.queries";
import Article from "../../domain/entities/article.entity";


class ArticleRepository {
  private poolContent: Pool;
  private articleQueries: ArticleQueries;

  constructor() {
    this.poolContent = createPool(MySQLContentModule.getDbConfig());
    this.articleQueries = new ArticleQueries();

  }


  private async isDatabaseReachable(poolType: Pool): Promise<boolean> {
    try {

      if (!poolType) throw new Error("No database specified");
      const connection = await poolType.getConnection();
      connection.release();
      return true;
    } catch (error) {
      console.error("Database unreachable:", error);
      return false;
    }
  }


  /**
   * Get all articles
   * @returns 
   */
  public async getAllArticles(): Promise<Article[]> {
    let connection;
    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");

    try {
      connection = await this.poolContent.getConnection();
      const [rows] = await connection.query<any[]>(this.articleQueries.getAllArticles());
      if (!rows || rows.length === 0) throw new Error("No tags found");
      return rows;
    } catch (error) {
      console.error("Erreur MySQL:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }

  }


/**
 * Get all articles with join details
 * @returns 
 */
  public async getAllArticlesWithDetails(): Promise<unknown[]> {
    let connection;
    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");
     
    try {
      connection = await this.poolContent.getConnection();
      const [rows] = await connection.query<any[]>(this.articleQueries.getAllArticlesWithDetails());
      if (!rows || rows.length === 0) return [];
      return rows;
      
    } catch (error) {
      console.error("Erreur MySQL getAllArticlesWithDetailsRaw:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }


}

export default ArticleRepository;
