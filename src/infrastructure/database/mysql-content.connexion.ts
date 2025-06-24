/**
 * MySQL Connection - Database configuration
 * 
 * @version 1.1.1
 * @author Thomas Bressel
 * @since 2024-05-15
 * 
 * @decorator Frozen - This class is frozen to prevent any modifications for security reasons
 * 
 * @remarks 
 * - Ensure that the required environment variables (`CONTENTDB_CONNEXION_LIMIT`, 
 *   `CONTENTDB_PORT_NUMBER`, `CONTENTDB_DATABASE_NAME`, `CONTENTDB_USERNAME`, `CONTENTDB_PASSWORD`, `CONTENTDB_HOST_SERVER`) are set.
 * - The middleware throws errors if any of the required keys are missing.
 * - This class is immutable after compilation - no methods or properties can be added, removed, or modified.
 * - Protected against malicious code injection and accidental modifications.
 * 
 * @security This class handles sensitive database credentials and is frozen for protection
 */


import mysql, { Pool } from 'mysql2';
import { Frozen } from '../../shared/utils/decorators/security.decorator'
import { DbConfig } from '../../shared/models/database/mysql.config';


@Frozen
class MySQLContentConnexion {
  private static poolContent: Pool;


  /**
   * Method to get the database configuration.
   * 
   * @returns object
   */
  public static getDbConfig(): DbConfig {
    return {
      connectionLimit: this.poolUserLimit,
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.dataName,
      port: this.listenPort
    };
  }


  /**
   * Method to check if the maximum number of connections is reached.
   * 
   * @returns boolean
   */
  public static async isMaxConnectionReached(): Promise<boolean> {
    try {
      const pool = this.connectionPool;

      const results: any = await new Promise((resolve, reject) => {
        pool.query('SHOW STATUS LIKE "Threads_connected";', (error, results) => {
          return error ? reject(error) : resolve(results);
        });
      });

      if (results.length === 0) {
        console.error("No connection status found");
        return false;
      }

      const allConnections: number = parseInt(results[0].Value);
      const connectionsLimit: number = pool.config.connectionLimit ?? 0;

      return (allConnections >= connectionsLimit) ? true : false;

    } catch (error) {
      console.error("Error fetching connection status: ", error);
      return false;
    }
  }


  /**
  * Create a new connection Pool to the database
  */
  public static get connectionPool(): Pool {
    if (!this.poolContent) {
      this.poolContent = mysql.createPool(this.getDbConfig());
    }
    return this.poolContent;
  }


  /**
  * Get the connexion limit from environement variable
  */
  private static get poolUserLimit(): number | undefined {
    const poolUserLimit = process.env.CONTENTDB_CONNEXION_LIMIT;
    if (poolUserLimit === undefined) {
      console.error("No connection limit set for the database");
      return undefined;
    }
    return parseInt(poolUserLimit);
  }


  /**
  * Get the adress port from environement variable
  */
  private static get listenPort(): number | undefined {
    const portConfig = process.env.CONTENTDB_PORT_NUMBER;
    if (!portConfig) {
      console.error("No port set for the database");
      return undefined;
    } else {
      return parseInt(portConfig);
    }
  }


  /**
   * Get the database name from environement variable
   */
  private static get dataName(): string | undefined {
    const dbName = process.env.CONTENTDB_DATABASE_NAME;
    if (!dbName) {
      console.error("No database name set");
    }
    return dbName;
  }


  /**
   * Get the user name from environement variable
   */
  private static get username(): string | undefined {
    const dbUser = process.env.CONTENTDB_USERNAME;
    if (!dbUser) {
      console.error("No user set for the database");
    }
    return dbUser;
  }


  /**
   * Get the password from environement variable
   */
  private static get password(): string | undefined {
    const dbPass = process.env.CONTENTDB_PASSWORD;
    if (!dbPass) {
      console.error("No password set for the database");
    }
    return dbPass;
  }


  /**
   * Get the host name from environement variable
   */
  private static get host(): string | undefined {
    const dbHost = process.env.CONTENTDB_HOST_SERVER;
    if (!dbHost) {
      console.error("No host set for the database");
    }
    return dbHost;
  }


}

export default MySQLContentConnexion;