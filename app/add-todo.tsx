'use server';

import { object, string, boolean, safeParse, minLength } from "valibot";

export type Todo = {
    id: string;
    name: string;
    completed: boolean;
};

const TodoSchema = object({
    name: string([minLength(1, 'Name is required')]),
    completed: boolean()
});

export async function addTodo(_todos: Todo[], formData: FormData) {

    await new Promise((res) => setTimeout(res, 1000));

    const _formData = Object.fromEntries(formData);

    // validate input
    const result = safeParse(TodoSchema, {
        ..._formData,
        completed: _formData.completed === 'on'
    });

    if (!result.success) {
        return {
            message: result.issues[0].message
        };
    }

    const { name, completed } = result.output;

    // simulate adding to database
    const id = '_server' + Math.random().toString().substring(2, 12);

    return { name, completed, id };
}