export type Todo = {
    id: string;
    name: string;
    completed: boolean;
};

export const generateID = () => Math.random().toString().substring(2, 12);