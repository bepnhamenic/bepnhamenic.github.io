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
    render() {
        const div = document.createElement("div");
        div.innerText = this.question;
        return div;
    }
    constructor(index, question, correctAnswer, otherOptions) {
        this.index = index;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.otherOptions = otherOptions;
    }
    ;
}
export class QuestionRepository {
    // private readonly items: { string: Item }[];
    // public constructor(items: Item[]) {
    //     this.items = [];
    //     items.map(i => {
    //         this.items[i.code] = i;
    //     });
    // };
    static loadFromFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield fetch(fileName);
            const fileContent = yield r.json();
            const questions = [];
            for (const i of fileContent) {
                questions.push(new Question(i["index"], i["question"], i["correctAnswer"], i["otherOptions"]));
            }
            return questions;
        });
    }
}
