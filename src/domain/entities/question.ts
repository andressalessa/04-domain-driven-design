import { randomUUID } from "node:crypto";
import type { Slug } from "./value-objects/slug.js";
import { Entity } from "../../core/entities/entity.js";

interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: string
}

export class Question extends Entity {
    constructor(props: QuestionProps, id?: string) {
        super(props, id);
    }
}
