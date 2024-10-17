import {GroupRepository} from "./Group.js";
import {Question, QuestionRepository} from "./Question.js";


function renderQuestions(quetions: Question[]) {
    $("#content").empty();

    for (let i = 0; i < quetions.length; i++) {
        $("#content")[0].appendChild(quetions[i].render(i+1));
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

$(".testIdButton").on("click", async function () {
    localStorage.setItem("myCat", "Tom");
    const element = $(this)[0];
    const testId = element.dataset["testId"] as string;

    const QUESTIONS_DIR = "questions/";
    const groups = await GroupRepository.loadFromFile(QUESTIONS_DIR + "groups.json");

    const pickedQuestions = [];

    for (const group of groups) {
        const questions = await QuestionRepository.loadFromFile(QUESTIONS_DIR + group.definitionFile);
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
