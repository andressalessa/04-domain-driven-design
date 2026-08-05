import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js"
import { CreateQuestionUseCase } from "./create-question.js"
import { NotAllowedError } from "./errors/not-allowerd-error.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('shouw be able to create an question', async () => {
        const result = await createQuestion.execute({
            authorId: '1',
            title: 'Nova pergunta',
            content: 'Conteúdo da pergunta',
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    })
})
