import { Entity } from "../../core/entities/entity.js";

interface AnswerProps {
    content: string
    authorId: string
    questionId: string
}

export class Answer extends Entity {
    constructor(props: AnswerProps, id?: string) {
        super(props, id);
    }
}
