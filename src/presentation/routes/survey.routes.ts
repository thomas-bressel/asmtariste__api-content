// Express importation
import express, {Request, Response, NextFunction, RequestHandler} from "express";

// Controllers importation
import SurveyController from "../controllers/survey.controller";
import SurveyService from "../../data/services/survey.service";
import SurveyRepository from "../../data/repositories/survey.repository";

// Middlewares import
import BodyParserMiddleware from "../middlewares/body-parser.middleware";
import CsrfMiddleware from "../middlewares/csrf.middleware";
import PermissionMiddleware from "../middlewares/permission.middleware";



const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();
const permissionMiddleware = new PermissionMiddleware();
const surveyRepository = new SurveyRepository();
const surveyService = new SurveyService(surveyRepository);
const surveyController = new SurveyController(surveyService);


router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);


router.get("/content/v1/admin/surveys", csrfMiddleware.authToken, permissionMiddleware.check("VIEW_ALL_SURVEYS"), async (req: Request, res: Response) => { 
    surveyController.getAllSurveys(req, res)
});


export default router;