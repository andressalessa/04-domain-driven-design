import { CommentOnAnswerUseCase } from "./comment-on-answer.js";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let commentOnAnswer: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
        commentOnAnswer = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
    });

    it('should be able to comment on answer', async () => {
        const answer = makeAnswer();

        await inMemoryAnswersRepository.create(answer);

        await commentOnAnswer.execute({
            authorId: answer.authorId.toString(),
            answerId: answer.id.toString(),
            content: 'New comment',
        });

        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('New comment');
    })
})
