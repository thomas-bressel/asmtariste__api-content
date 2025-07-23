import { SurveyBaseQueries } from "./survey.base.queries";

export class SurveyQueries extends SurveyBaseQueries {

    public getAllSurveysWithDetails(): string {
        return this.getAllSurveysWithDetailsQuery();
    }

   
}