import type { Todo } from "./todo-utils";

export function Todos({ todos }: { todos: Todo[] }) {
    return (
        <table className="border-separate border-spacing-2 border text-sm text-left">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td className={todo.completed ? 'line-through' : ''}>{todo.name}</td>
                        <td>{todo.completed ? 'true' : 'false'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

