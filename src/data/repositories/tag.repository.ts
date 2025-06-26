import MySQLContentModule from "../../infrastructure/database/mysql-content.connexion";
import { createPool, Pool } from "mysql2/promise";
import { TagQueries } from "../../data/queries/tag.queries";
import TagEntity from "../../domain/entities/tag.entity";
import { ResultSetHeader } from 'mysql2';


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


/**
 * Check if the label already exists in the database
 * @param label 
 * @returns 
 */
  public async isTagLabelExist(label: string): Promise<boolean> {
    let connection;
    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");

    try {
      connection = await this.poolContent.getConnection();

        const [rows] = await connection.query<any[]>(this.tagQueries.isTagLabelExist(), [label]);
        if (!rows || rows.length === 0) return false;
        return true;

    } catch (error) {
      console.error("Erreur MySQL:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }






/**
 * create a new tag in the database
 * @param validatedDataTag 
 * @returns the created data
 */
public async createTag(tagEntity: TagEntity): Promise<number> {
  
  if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");

  let connection;
  try {
    connection = await this.poolContent.getConnection();
    const [rows] = await connection.query<ResultSetHeader>(this.tagQueries.createTag(), [ tagEntity.label, tagEntity.color, tagEntity.background_color, tagEntity.border_color, tagEntity.is_display]);
    return rows.insertId;
  } catch (error) {
    console.error("Erreur MySQL:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

}

export default TagRepository;
