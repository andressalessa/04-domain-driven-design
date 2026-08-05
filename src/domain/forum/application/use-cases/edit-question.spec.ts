import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js"
import { makeQuestion } from "test/factories/make-question.js"
import { EditQuestionUseCase } from "./edit-question.js"
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let editQuestion: EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        editQuestion = new EditQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('shouw be able to edit a question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        await inMemoryQuestionsRepository.create(newQuestion);

        await editQuestion.execute({
            authorId: newQuestion.authorId.toValue(),
            questionId: newQuestion.id.toValue(),
            title: 'Edited Title',
            content: 'Edited Content'
        });

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Edited Title',
            content: 'Edited Content'
        })
    })

    it('shouw not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));

        await inMemoryQuestionsRepository.create(newQuestion);

        await expect(editQuestion.execute({
            authorId: 'author-2',
            questionId: 'question-1',
            title: 'Edited Title',
            content: 'Edited Content'
        })).rejects.toBeInstanceOf(Error);
    })
})
