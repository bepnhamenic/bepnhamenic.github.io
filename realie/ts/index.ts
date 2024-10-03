import {GroupRepository} from "./Group.js";
import {Question, QuestionRepository} from "./Question.js";


function renderQuestions(quetions: Question[]) {
    for (const question of quetions) {
        $("#content")[0].appendChild(question.render());
    }
}

async function ready() {
    const QUESTIONS_DIR = "questions/";
    const groups = await GroupRepository.loadFromFile(QUESTIONS_DIR + "groups.json");

    const pickedQuestions = [];

    for (const group of groups) {
        const questions = await QuestionRepository.loadFromFile(QUESTIONS_DIR + group.definitionFile);
        const random = Math.floor(Math.random() * questions.length);
        pickedQuestions.push(questions[random]);
    }

    renderQuestions(pickedQuestions);

    $(".option").on("click", function (a) {
        const element = $(this)[0];

        let classNameToAdd = element.classList.contains("correctAnswer") ? "correctChoice" : "incorrectChoice";
        element.classList.add(classNameToAdd);
    });
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

jQuery(ready());