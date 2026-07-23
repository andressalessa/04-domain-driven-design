import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js"
import { CreateQuestionUseCase } from "./create-question.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('shouw be able to create an question', async () => {
        const { question } = await createQuestion.execute({
            authorId: '1',
            title: 'Nova pergunta',
            content: 'Conteúdo da pergunta',
        });

        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
    })
})
