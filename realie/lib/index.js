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
function renderQuestions(quetions) {
    $("#content").empty();
    for (let i = 0; i < quetions.length; i++) {
        $("#content")[0].appendChild(quetions[i].render(i + 1));
    }
}
window.onscroll = function () {
    const progressBar = document.getElementById("progressBar");
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    if (progressBar != null) {
        progressBar.style.width = scrollPercentage + '%';
    }
};
$(".testIdButton").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        localStorage.setItem("myCat", "Tom");
        const element = $(this)[0];
        const testId = element.dataset["testId"];
        const QUESTIONS_DIR = "questions/";
        const groups = yield GroupRepository.loadFromFile(QUESTIONS_DIR + "groups.json");
        const pickedQuestions = [];
        for (const group of groups) {
            const questions = yield QuestionRepository.loadFromFile(QUESTIONS_DIR + group.definitionFile);
            const questionId = testId === "random" ? Math.floor(Math.random() * questions.length) : parseInt(testId);
            pickedQuestions.push(questions[questionId]);
        }
        renderQuestions(pickedQuestions);
        $(".option").on("click", function (a) {
            const element = $(this)[0];
            let classNameToAdd = element.classList.contains("correctAnswer") ? "correctChoice" : "incorrectChoice";
            element.classList.add(classNameToAdd);
        });
    });
});
