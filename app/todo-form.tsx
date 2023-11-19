import { useRef } from "react";
import { useTodos } from "./use-todos";
import { Todos } from "./todos";

export default function TaskForm() {

    const formRef = useRef(null);

    const { todosAction, todosError, todos } = useTodos(formRef);

    return (
        <form action={todosAction} ref={formRef} className="m-10 flex flex-col">
            <h1 className="border-b border-b-black mb-3 text-xl">My Todo List</h1>
            <input type="text" className="border border-sky-500 p-2" name="name" placeholder="Name" />
            {todosError &&
                <p className="text-red-500 text-xs my-2">
                    {todosError}
                </p>
            }
            <div className="flex items-center mb-2">
                <input id="completed" type="checkbox" name="completed" className="mr-2" />
                <label htmlFor="completed">Completed</label>
            </div>
            <button className="bg-sky-800 text-white p-2 my-3" type="submit">Add Todo</button>
            <Todos todos={todos} />
        </form>
    );
}