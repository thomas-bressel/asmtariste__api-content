import MySQLContentModule from "../../infrastructure/database/mysql-content.connexion";
import { createPool, Pool } from "mysql2/promise";
import { SurveyQueries } from "../queries/survey.queries";


class SurveyRepository {
  private poolContent: Pool;
  private surveyQueries: SurveyQueries;

  constructor() {
    this.poolContent = createPool(MySQLContentModule.getDbConfig());
    this.surveyQueries = new SurveyQueries();

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
 * Get all surveys with join details
 * @returns 
 */
  public async getAllSurveysWithDetails(): Promise<unknown[]> {
    console.log('REPO ')
    let connection;
    if (!(await this.isDatabaseReachable(this.poolContent))) throw new Error("DATABASE_UNREACHABLE");
     
    try {
      connection = await this.poolContent.getConnection();
      const [rows] = await connection.query<any[]>(this.surveyQueries.getAllSurveysWithDetails());
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

export default SurveyRepository;
