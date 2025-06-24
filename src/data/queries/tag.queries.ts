import { TagBaseQueries } from "./tag.base.queries";

export class TagQueries extends TagBaseQueries {

    public getAllTags() {
        return this.getAllTagsQuery();
    }

}