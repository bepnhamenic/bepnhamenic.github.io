var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Question {
    constructor(index, question, image, correctAnswer, otherOptions) {
        this.index = index;
        this.question = question;
        this.image = image;
        this.correctAnswer = correctAnswer;
        this.otherOptions = otherOptions;
    }
    ;
    options() {
        const array = [this.correctAnswer, ...this.otherOptions];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    render() {
        const div = document.createElement("div");
        const ul = document.createElement("ul");
        ul.className = "collection with-header";
        const li = document.createElement("li");
        li.className = "collection-header";
        li.innerHTML = `<h4>${this.question}</h4>`;
        ul.appendChild(li);
        if (this.image != null) {
            const li = document.createElement("li");
            li.className = "collection-header";
            li.innerHTML = `<img src="${this.image.substring(1)}">`;
            ul.appendChild(li);
        }
        for (const option of this.options()) {
            const a = document.createElement("a");
            a.className = "collection-item option";
            a.href = "#!";
            a.innerText = option;
            if (option === this.correctAnswer) {
                a.classList.add("correctAnswer");
            }
            ul.appendChild(a);
        }
        div.appendChild(ul);
        return div;
    }
}
export class QuestionRepository {
    static loadFromFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield fetch(fileName);
            const fileContent = yield r.json();
            const questions = [];
            for (const i of fileContent) {
                questions.push(new Question(i["index"], i["question"], i["image"], i["correctAnswer"], i["otherOptions"]));
            }
            return questions;
        });
    }
}
