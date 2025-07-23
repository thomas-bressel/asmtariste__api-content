export abstract class SurveyBaseQueries {


    /**
     * Get all surveys from database wirth details
     * @returns 
     */
    protected getAllSurveysWithDetailsQuery(): string {
        return `SELECT 
                	s.*,
                	t.type_name,
                	a.title as title_article,
                    COUNT(q.text) AS nbr_de_questions
                FROM 
                    surveys s
                JOIN 
                	articles a ON a.id_articles = s.id_articles
                LEFT JOIN
                    questions q ON s.id_surveys = q.id_surveys
                JOIN
                	type t ON s.id_type = t.id_type
                GROUP BY
                    s.id_surveys;`;
    }


}