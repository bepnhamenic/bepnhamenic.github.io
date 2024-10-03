var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GroupRepository } from "./Group.js";
import { QuestionRepository } from "./Question.js";
function ready() {
    return __awaiter(this, void 0, void 0, function* () {
        const QUESTIONS_DIR = "questions/";
        const groups = yield GroupRepository.loadFromFile(QUESTIONS_DIR + "groups.json");
        const pickedQuestions = [];
        for (const group of groups) {
            const questions = yield QuestionRepository.loadFromFile(QUESTIONS_DIR + group.definitionFile);
            const random = Math.floor(Math.random() * questions.length);
            pickedQuestions.push(questions[random]);
        }
        renderQuestions(pickedQuestions);
    });
}
function renderQuestions(quetions) {
    for (const question of quetions) {
        $("#content")[0].appendChild(question.render());
    }
}
jQuery(ready());