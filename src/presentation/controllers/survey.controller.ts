// Express importation
import { Request, Response } from "express";

// Service importation
import SurveyService from "../../data/services/survey.service";
import { SurveyWithDetailsDTO } from "src/data/models/survey-with-details.model";


class SurveyController {
  private surveyService: SurveyService;

  constructor(surveyService: SurveyService) {
    this.surveyService = surveyService;
  }


/**
 * Get the list of all articles
 * @param req 
 * @param res 
 * @returns 
 */
  public async getAllSurveys(req: Request, res: Response): Promise<Response> {
    const option = req.query.option as string;
    console.log('Valeur que query.option : ',option)

    try {
      if (!option) return res.status(400).json({ message: `Paramètre '${option}' non reconnu` });

      if (option === 'details') {
        const response: SurveyWithDetailsDTO[] = await this.surveyService.getAllSurveysWithDetails();
        if (!response || response.length === 0) throw new Error("Résultat vide dans articles");
        return res.status(200).json(response);
      }
      return res.status(400).json({ message: `Paramètre '${option}' non reconnu` })

    }
    catch (error) {
      console.error("Erreur dans SurveyController - articles :", error);
      return res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur interne du serveur") });
    }
  }
}

export default SurveyController;