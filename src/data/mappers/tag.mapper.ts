import Tag from "../../domain/entities/tag.entity";

export class TagMapper {

    /**
     * Converts a raw data row into an instance of the Tag entity.
     * @param {any} row The raw data row to convert.
     * @returns {Tag} A new instance of the Tag entity.
     */
    static toEntity(row: any): Tag {
        return new Tag(
            row.id_tags,
            row.color,
            row.label,
            row.is_display,
            row.background_color,
            row.border_color,
        );
    }

    /**
     * Converts an array of raw data rows into an array of Tag entities.
     * @param {any[]} rows The array of raw data rows.
     * @returns {Tag[]} An array of Tag entity instances.
     */
    static toEntities(rows: any[]): Tag[] {
        return rows.map(row => this.toEntity(row));
    }
}