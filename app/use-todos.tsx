import { MutableRefObject, useOptimistic, useState } from "react";
import { Todo, addTodo } from "./add-todo";

export function useTodos(formRef: MutableRefObject<HTMLFormElement | null>) {

    const [todos, setTodos] = useState<Todo[]>([{
        name: 'me',
        completed: true,
        id: '_original2023521235'
    }]);

    const [todosError, setTodosError] = useState('');

    const [optimisticTodos, addOptimisticTodo] = useOptimistic(
        todos,
        (state: Todo[], newTodo: Todo) => [
            ...state,
            { ...newTodo, id: '_client' + Math.random().toString().substring(2, 12) }
        ]
    );

    const todosAction = async (formData: FormData) => {
        setTodosError('');
        const todo = Object.fromEntries(formData) as unknown as Todo;
        formRef?.current?.reset();
        setTodosError('');
        addOptimisticTodo(todo);
        const result = await addTodo(todos, formData);
        if (result.message) {
            setTodosError(result.message);
            return;
        }
        const { id, completed, name } = result;
        if (id) {
            setTodos(_todos => [..._todos, { id, completed, name }]);
        }
    };

    return {
        todosAction,
        todosError,
        todos: optimisticTodos
    };
}