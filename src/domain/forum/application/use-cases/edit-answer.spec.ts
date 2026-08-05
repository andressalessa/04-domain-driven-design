import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js"
import { makeAnswer } from "test/factories/make-answer.js"
import { EditAnswerUseCase } from "./edit-answer.js"
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let editAnswer: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        editAnswer = new EditAnswerUseCase(inMemoryAnswersRepository);
    });

    it('shouw be able to edit a answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        await inMemoryAnswersRepository.create(newAnswer);

        await editAnswer.execute({
            authorId: newAnswer.authorId.toValue(),
            answerId: newAnswer.id.toValue(),
            content: 'Edited Content'
        });

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Edited Content'
        })
    })

    it('shouw not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));

        await inMemoryAnswersRepository.create(newAnswer);

        await expect(editAnswer.execute({
            authorId: 'author-2',
            answerId: 'answer-1',
            content: 'Edited Content'
        })).rejects.toBeInstanceOf(Error);
    })
})
