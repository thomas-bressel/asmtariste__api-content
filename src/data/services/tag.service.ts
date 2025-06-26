// import layers
import TagRepository from "../repositories/tag.repository";

// DTO import
import { TagResponseDTO } from "../dtos/tag-response.dto";
import { TagDTO } from "../dtos/tag.dto";
import TagEntity from "../../domain/entities/tag.entity";
import { TagMapper } from "../mappers/tag.mapper";


class TagService {
  private tagRepository: TagRepository;

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }


  /**
   * Get the list of all users
   * @returns 
   */
  public async getAllTags(): Promise<TagResponseDTO[]> {

  // 1. get raw datas from the database
  const rawTags: TagEntity[] = await this.tagRepository.getAllTags();

  // 2. Convert datas into a TagEntity entity
  const tagEntities: TagEntity[] = TagMapper.toEntities(rawTags);

  // 3. Convert Entity into a Response DTO (the right format to expose to the client)
  const tagResponseDTOs: TagResponseDTO[] = TagResponseDTO.fromEntities(tagEntities);

  return tagResponseDTOs;
  }




  /**
   * Create a new user
   * @param userData 
   * @param userFile 
   * @returns 
   */
  public async createTag(tagData: TagDTO): Promise<number> {

    // Vérification d'existence du tag
    const TagExists = await this.tagRepository.isTagLabelExist(tagData.label);
    if (TagExists) throw new Error("Ce tag existe déjà");

    const entity = TagMapper.toEntity(tagData);

    // Création en BDD
    const createdRows = await this.tagRepository.createTag(entity);
    if (!createdRows) throw new Error("Erreur lors de la création du tag!");
    return createdRows;
  }



}

export default TagService;
