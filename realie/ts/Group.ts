export class Group {

    public constructor(
        public index: number,
        public definitionFile: string,
        public name: string
    ) {
    };
}

export class GroupRepository {

    public static async loadFromFile(fileName: string): Promise<Group[]> {
        if (localStorage.getItem(fileName) == null) {
            const r = await fetch(fileName);
            const fileContent = await r.text();
            localStorage.setItem(fileName, fileContent);
        }
        const fileContent = JSON.parse(localStorage.getItem(fileName) as string);

        const groups: Group[] = [];
        for (const i of fileContent) {
            groups.push(new Group(
                i["index"],
                i["definitionFile"],
                i["name"])
            );
        }

        return groups;
    }
}
