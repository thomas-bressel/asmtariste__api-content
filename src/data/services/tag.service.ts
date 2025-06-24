// import layers
import TagRepository from "../repositories/tag.repository";

// DTO import
import { TagResponseDTO } from "../dtos/tag-response.dto";
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

  // 1. Récupérer les données brutes (objets simples) depuis la BDD
  const rawTags: TagEntity[] = await this.tagRepository.getAllTags();

  // 2. Transformer ces données en entités TagEntity
  const tagEntities: TagEntity[] = TagMapper.toEntities(rawTags);

  // 3. Transformer ces entités en DTO de réponse (format à exposer)
  const tagResponseDTOs: TagResponseDTO[] = TagResponseDTO.fromEntities(tagEntities);

  return tagResponseDTOs;
  }

}

export default TagService;
