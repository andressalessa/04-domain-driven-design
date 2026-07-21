import { AnswerQuestionUseCase } from './answer-question.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { Answer } from '../../enterprise/entities/answer.js'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'This is an answer',
  })

  expect(answer.content).toEqual('This is an answer')
})
