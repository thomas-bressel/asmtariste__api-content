import MySQLContentModule from "../../infrastructure/database/mysql-content.connexion";
import { createPool, Pool } from "mysql2/promise";
import { TagQueries } from "../../data/queries/tag.queries";
import Tag from "../../domain/entities/tag.entity";
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
  public async getAllTags(): Promise<Tag[]> {
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
  public async createTag(tag: Tag): Promise<number> {

    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");

    let connection;
    try {
      connection = await this.poolContent.getConnection();
      const [rows] = await connection.query<ResultSetHeader>(this.tagQueries.createTag(), [tag.label, tag.color, tag.background_color, tag.border_color, tag.is_display]);
      return rows.insertId;
    } catch (error) {
      console.error("Erreur MySQL:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }




  /**
   * Get a tag by its id
   * @param id 
   * @returns 
   */
  public async getTagById(id: number): Promise<boolean> {

    let connection;
    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");

    try {
      connection = await this.poolContent.getConnection();
      const [rows] = await connection.query<any[]>(this.tagQueries.getTagById(), [id]);
      if (!rows || rows.length === 0) throw new Error("Aucun tag trouvé avec cet id");
      return true;
    } catch (error) {
      console.error("Erreur MySQL:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }

  }




  /**
   * Delete tag in the association table and in tags table
   * @param id 
   * @returns 
   */
  public async deleteTag(id: number): Promise<{ success: boolean; removed: number }> {
    let connection;

    if (!(await this.isDatabaseReachable(this.poolContent))) {
      throw new Error("DATABASE_UNREACHABLE");
    }

    try {
      connection = await this.poolContent.getConnection();
      await connection.beginTransaction();

      const [assocResult] = await connection.query<any>(this.tagQueries.deleteTagAssociations(), [id]);

      const [tagResult] = await connection.query<any>(this.tagQueries.deleteTag(), [id]);

      await connection.commit();
      return {
        success: tagResult.affectedRows > 0,
        removed: tagResult.affectedRows
      };

    } catch (error) {
      if (connection) await connection.rollback();
      console.error("Erreur MySQL:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }
}

export default TagRepository;
