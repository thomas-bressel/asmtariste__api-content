import { TagBaseQueries } from "./tag.base.queries";

export class TagQueries extends TagBaseQueries {

    public getAllTags(): string {
        return this.getAllTagsQuery();
    }

    public isTagLabelExist(): string {
        return this.isTagLabelExistQuery();
    }

    public createTag(): string {
        return this.createTagQuery();
    }

}