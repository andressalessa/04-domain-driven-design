import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js"
import { makeQuestion } from "test/factories/make-question.js"
import { DeleteQuestionUseCase } from "./delete-question.js"
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js"
import { NotAllowedError } from "./errors/not-allowerd-error.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let deleteQuestion: DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        deleteQuestion = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('shouw be able to delete a question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        await inMemoryQuestionsRepository.create(newQuestion);

        await deleteQuestion.execute({
            authorId: 'author-1',
            questionId: 'question-1',
        });

        expect(inMemoryQuestionsRepository.items).toHaveLength(0);
    })

    it('shouw not be able to delete a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        await inMemoryQuestionsRepository.create(newQuestion);

        const result = await deleteQuestion.execute({
            authorId: 'author-2',
            questionId: 'question-1',
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    })
})
