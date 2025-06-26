export abstract class TagBaseQueries {


    /**
     * Get all tags from database
     * @returns 
     */
    protected getAllTagsQuery(): string {
        return `SELECT * FROM tags`;
    }


    /**
     * Return true or false depending if the tag label exist
     * @returns true or false
     */
    protected isTagLabelExistQuery(): string {
        return `SELECT t.label FROM tags t
                WHERE label = ?`;
    }



    /**
     * Get a new tag
     * @returns 
     */
    protected createTagQuery(): string {
        return `INSERT INTO tags (label, color, background_color, border_color, is_display)
                VALUES (?, ?, ?, ?, ?)`;
    }
}