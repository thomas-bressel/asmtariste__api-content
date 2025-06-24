export abstract class TagBaseQueries {


    /**
     * Get all tags from database
     * @returns 
     */
    protected getAllTagsQuery(): string {
        return `SELECT * FROM tags`;
    }
}