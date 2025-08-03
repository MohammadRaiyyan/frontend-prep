export type Todo = {
    id: string,
    title: string,
    description: string,
    status: "inprogress" | "todo" | "done",
    createdAt: Date
}