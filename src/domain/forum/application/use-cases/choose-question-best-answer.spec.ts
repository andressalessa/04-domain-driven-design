import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.js";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "test/factories/make-question.js";
import { makeAnswer } from "test/factories/make-answer.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase

describe('Answer Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        chooseQuestionBestAnswer = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
    });

    it('should be able to choose the best answer for a question', async () => {
        const question = makeQuestion();
        const answer = makeAnswer({
            questionId: question.id
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        await chooseQuestionBestAnswer.execute({
            authorId: question.authorId.toString(),
            answerId: answer.id.toString()
        });

        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id);
    })

    it('should not be able to choose another user question\'s best answer for a question', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        });
        const answer = makeAnswer({
            questionId: question.id
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        expect(() => {
            return chooseQuestionBestAnswer.execute({
                authorId: new UniqueEntityID('another-author-id').toString(),
                answerId: answer.id.toString()
            })
        }).rejects.toBeInstanceOf(Error);
    })
})
