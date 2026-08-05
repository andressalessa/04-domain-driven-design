import { DeleteAnswerCommentUseCase } from "./delete-answer-comment.js";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository.js";
import { makeAnswerComment } from "test/factories/make-answer-comment.js";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let deleteAnswerComment: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
        deleteAnswerComment = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
    });

    it('should be able to delete a answer comment', async () => {
        const answerComment = makeAnswerComment();

        await inMemoryAnswerCommentsRepository.create(answerComment);

        await deleteAnswerComment.execute({
            authorId: answerComment.authorId.toString(),
            answerCommentId: answerComment.id.toString(),
        })

        expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
    })

    it('shouw not be able to delete a comment answer from another user', async () => {
        const answerComment = makeAnswerComment();

        await inMemoryAnswerCommentsRepository.create(answerComment);

        expect(() => {
            return deleteAnswerComment.execute({
                authorId: 'author-2',
                answerCommentId: answerComment.id.toString(),
            })
        }).rejects.toBeInstanceOf(Error);
    })
})
