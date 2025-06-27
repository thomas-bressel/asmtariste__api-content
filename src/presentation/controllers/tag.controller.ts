// Express importation
import { Request, Response } from "express";

// Service importation
import TagService from "../../data/services/tag.service";
import { TagDTO } from "../../data/dtos/tag.dto";
import { validate } from "class-validator";


class TagController {
  private tagService: TagService;

  constructor(tagService: TagService) {
    this.tagService = tagService;
  }


/**
 * Get the list of all tags
 * @param req 
 * @param res 
 * @returns 
 */
  public async getAllTags(req: Request, res: Response): Promise<Response> {

    try {
      const tags = await this.tagService.getAllTags();
      if (!tags || tags.length === 0) return res.status(404).json({ message: "Aucun tag trouvé." });
      return res.status(200).json(tags);
    }
    catch (error) {
      console.error("Erreur dans TagController - tags :", error);
      return res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur interne du serveur") });
    }
  }




/**
 * create a new tag
 * @param req 
 * @param res 
 * @returns 
 */
public async createTag(req: Request, res: Response): Promise<Response> {

  try {
    // Step 1 : entering data validation
    const tagValidationDTO = new TagDTO(req.body);

    const errors = await validate(tagValidationDTO);
    if (errors.length > 0) return res.status(400).json({ message: 'Les données fournies ne sont pas valides.', errors });
    
    // Step 2 : Mapping request data into a DTO
    const tagDTO = new TagDTO(tagValidationDTO);

    // Step 3 : Send DTO to the service
    const response = await this.tagService.createTag(tagDTO);
    return res.status(201).json(response);

  } catch (error) {
    console.error("Erreur dans TagController - createTag :", error);
    return res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur interne du serveur") });
  }
}




/**
 * delete a selected tag by its ID
 * @param req 
 * @param res 
 * @returns 
 */
public async deleteTag(req: Request, res: Response): Promise<Response> {
  try {
    const id = parseInt(req.query.id as string);
    if (!id || id === null) return res.status(404).json({ message: "ID de tag invalide" });

    const response = await this.tagService.deleteTag(id);
    if (!response) return res.status(400).json({ message: "Erreur lors de la suppression du tag" });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Erreur dans TagController - deleteTag :", error);
    return res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur interne du serveur") });
  }
}
}

export default TagController;