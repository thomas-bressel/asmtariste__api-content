// import layers
import SurveyRepository from "../repositories/survey.repository";

// DTO and mapper import
import { SurveyWithDetailsMapper } from "../dtos/survey-with-details.dto";

// Model import
import { SurveyWithDetailsDTO } from "../models/survey-with-details.model";


class SurveyService {
  private surveyRepository: SurveyRepository;

  constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }



  /**
   * Retrieves all surveys with their associated details (articles and questions).
   * @returns {Promise<SurveyWithDetailsDTO[]>} 
   * @throws {Error} 
   */
  public async getAllSurveysWithDetails(): Promise<SurveyWithDetailsDTO[]> {
    console.log('SERVICE')
    try {

      // 1. Fetch raw data from the repository
      const rawSurveysWithDetails = await this.surveyRepository.getAllSurveysWithDetails();

      // 2. Convert the raw data to DTOs using the mapper
      const surveysWithDetails = SurveyWithDetailsMapper.fromRawDataArray(rawSurveysWithDetails);

      return surveysWithDetails;

    } catch (error) {
      console.error("Error in SurveyService - getAllArticlesWithDetails:", error);
      throw error;
    }
  }

}

export default SurveyService;
