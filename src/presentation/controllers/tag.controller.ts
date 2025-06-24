// Express importation
import { Request, Response } from "express";

// Service importation
import TagService from "../../data/services/tag.service";



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


}

export default TagController;