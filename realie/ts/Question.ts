export class Question {

    public constructor(
        public index: number,
        public question: string,
        public image: string | null,
        public correctAnswer: string,
        public otherOptions: string[]
    ) {
    };

    private options(): string[] {
        const array = [this.correctAnswer, ...this.otherOptions];

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render(sectionId: number): Node {
        const div = document.createElement("div");

        const ul = document.createElement("ul");
        ul.className = "collection with-header";

        const li = document.createElement("li");
        li.className = "collection-header";
        li.innerHTML = `<h4>${sectionId}.${this.index}. ${this.question}</h4>`;
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

    public static async loadFromFile(fileName: string): Promise<Question[]> {
        if (localStorage.getItem(fileName) == null) {
            const r = await fetch(fileName);
            const fileContent = await r.text();
            localStorage.setItem(fileName, fileContent);
        }
        const fileContent = JSON.parse(localStorage.getItem(fileName) as string);

        const questions: Question[] = [];
        for (const i of fileContent) {
            questions.push(new Question(
                i["index"],
                i["question"],
                i["image"],
                i["correctAnswer"],
                i["otherOptions"])
            );
        }

        return questions;
    }
}
