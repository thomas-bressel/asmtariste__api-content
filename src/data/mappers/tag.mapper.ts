// src/app/mappers/TagMapper.ts
import TagEntity from "../../domain/entities/tag.entity";

export class TagMapper {

    /**
     * Convertit une entité TagEntity en DTO TagDTO
     * @param tagEntity L'entité à convertir
     * @returns Le DTO correspondant
     */
    static toEntity(row: TagEntity): TagEntity {
        return new TagEntity(
            row.id_tags,
            row.color,
            row.label,
            row.is_display,
            row.background_color,
            row.border_color,
        );
    }


    /**
     * Convertit un tableau de résultats SQL en une liste d'entités TagEntity
     * @param rows Le tableau de résultats SQL
     * @returns Un tableau de TagEntity
     */
    static toEntities(rows: any[]): TagEntity[] {
        return rows.map(row => this.toEntity(row));
    }
}
