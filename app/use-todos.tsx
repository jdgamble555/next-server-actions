import { MutableRefObject, useOptimistic, useState } from "react";
import { addTodo } from "./todo-actions";
import { type Todo, generateID } from "./todo-utils";

export function useTodos(formRef: MutableRefObject<HTMLFormElement | null>) {

    const [todos, setTodos] = useState<Todo[]>([{
        name: 'first task',
        completed: true,
        id: 'original-0000000000'
    }]);

    const [todosError, setTodosError] = useState('');

    const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

    const addTodoAction = async (formData: FormData) => {

        // validation occurs on server
        const todo = Object.fromEntries(formData) as unknown as Todo;
        formRef?.current?.reset();
        setTodosError('');

        // add optimistically
        const newTodo = {
            ...todo,
            id: 'client-' + generateID()
        };
        setOptimisticTodos(optimisticTodos => [...optimisticTodos, newTodo]);

        // get result from server
        const result = await addTodo(todos, formData);
        if (!result.success) {
            setTodosError(result.error);
            return;
        }
        setTodos(_todos => [..._todos, result.todo]);
    };

    return {
        addTodoAction,
        todosError,
        todos: optimisticTodos
    };
}