import type { Question } from "../../enterprise/entities/question.js"
import type { QuestionsRepository } from "../repositories/questions-repository.js"
import { CreateQuestionUseCase } from "./create-question.js"

const fakeQuestionsRepository: QuestionsRepository = {
    create: async (question: Question) => { },
}

test('create an question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
    console.log(createQuestion)
    const { question } = await createQuestion.execute({
        authorId: '1',
        title: 'Nova pergunta',
        content: 'Conteúdo da pergunta',
    });

    expect(question.id).toBeTruthy()
})
