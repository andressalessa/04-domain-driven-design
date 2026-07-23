import { makeAnswer } from "test/factories/make-answer.js"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js"
import { DeleteAnswerUseCase } from "./delete-answer.js"
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let deleteAnswer: DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        deleteAnswer = new DeleteAnswerUseCase(inMemoryAnswersRepository);
    });

    it('shouw be able to delete a answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        await inMemoryAnswersRepository.create(newAnswer);

        await deleteAnswer.execute({
            authorId: 'author-1',
            answerId: 'answer-1',
        });

        expect(inMemoryAnswersRepository.items).toHaveLength(0);
    })

    it('shouw not be able to delete a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        await inMemoryAnswersRepository.create(newAnswer);

        expect(() => {
            return deleteAnswer.execute({
                authorId: 'author-2',
                answerId: 'answer-1',
            })
        }).rejects.toBeInstanceOf(Error);
    })
})
