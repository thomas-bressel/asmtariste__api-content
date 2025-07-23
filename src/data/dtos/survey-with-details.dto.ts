import { SurveyWithDetailsDTO } from "../models/survey-with-details.model";



export class SurveyWithDetailsMapper {

    /**
     * Convert raw datasfrom the databse to the DTO
     */
    static fromRawData(rawData: any): SurveyWithDetailsDTO {
        return {
            id_surveys: rawData.id_surveys,
            is_display: rawData.is_display,
            id_articles: rawData.id_articles,
            id_type: rawData.id_type,
            type_name: rawData.type_name,
            title_article: rawData.title_article,
            nbr_de_questions: rawData.nbr_de_questions,
        };
    }

    /**
     * Convert a raw data array into a DTOs array
     */
    static fromRawDataArray(rawDataArray: any[]): SurveyWithDetailsDTO[] {
        return rawDataArray.map(rawData => this.fromRawData(rawData));
    }
}