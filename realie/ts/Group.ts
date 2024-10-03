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
        const r = await fetch(fileName);
        const fileContent = await r.json();

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
