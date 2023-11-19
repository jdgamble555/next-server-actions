'use server';

import { object, string, boolean, safeParse, minLength, coerce } from "valibot";
import { generateID, type Todo } from "./todo-utils";

const TodoSchema = object({
    name: string([minLength(1, 'Name is required')]),
    completed: coerce(boolean(), Boolean)
});

// https://kit.svelte.dev/docs/types#public-types-actionresult
type TodoAction = {
    success: false;
    error: string;
} | {
    success: true;
    todo: {
        name: string;
        completed: boolean;
        id: string;
    };
};

export async function addTodo(
    _todos: Todo[],
    formData: FormData
): Promise<TodoAction> {

    const _formData = Object.fromEntries(formData);

    // validate input
    const result = safeParse(TodoSchema, _formData);

    if (!result.success) {
        return {
            success: false,
            error: result.issues[0].message
        };
    }

    const { name, completed } = result.output;

    // simulate adding to database
    await new Promise((res) => setTimeout(res, 1000));

    const id = 'server-' + generateID();

    return {
        success: true,
        todo: { name, completed, id }
    };
}