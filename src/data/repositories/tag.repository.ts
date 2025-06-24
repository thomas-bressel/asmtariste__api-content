import MySQLContentModule from "../../infrastructure/database/mysql-content.connexion";
import { createPool, Pool } from "mysql2/promise";
import { TagQueries } from "../../data/queries/tag.queries";
import TagEntity from "../../domain/entities/tag.entity";



class TagRepository {
  private poolContent: Pool;
  private tagQueries: TagQueries;

  constructor() {
    this.poolContent = createPool(MySQLContentModule.getDbConfig());
    this.tagQueries = new TagQueries();

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
 * Get all tags
 * @returns 
 */
  public async getAllTags(): Promise<TagEntity[]> {
    let connection;
    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");

    try {
      connection = await this.poolContent.getConnection();
      const [rows] = await connection.query<any[]>(this.tagQueries.getAllTags());
      if (!rows || rows.length === 0) throw new Error("No tags found");
      return rows;
    } catch (error) {
      console.error("Erreur MySQL:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }

  }



}

export default TagRepository;
