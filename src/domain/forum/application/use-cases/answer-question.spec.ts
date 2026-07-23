import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { AnswerQuestionUseCase } from "./answer-question.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Answer Question', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository);
    });

    it('shouw be able to create an question', async () => {
        const { answer } = await answerQuestion.execute({
            questionId: '1',
            instructorId: '1',
            content: 'Conteúdo da resposta',
        });

        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    })
})
