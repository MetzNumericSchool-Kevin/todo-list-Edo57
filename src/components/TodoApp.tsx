import { useState } from "react";

// Define the TodoItem type
type TodoItem = {
  id: number;
  description: string;
  done: boolean;
};

export function TodoApp() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]); // Initialize as an empty TodoItem array

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) { // Prevent empty todos
      const newTodo: TodoItem = {
        id: Date.now(),
        description: value,
        done: false,
      };
      setTodos([...todos, newTodo]); // Append new object to the list
      setValue(""); // Clear the input
    }
  };

  // Function to toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // Function to delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-5">
      {/* Form for adding new todo */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Ajouter une tâche"
          className="input input-bordered flex-grow"
        />
        <button type="submit" className="btn btn-primary">+</button>
      </form>

      {/* Display todo list */}
      <div className="my-5 flex flex-col gap-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`w-full rounded-box p-3 flex items-center justify-between ${
              todo.done ? "bg-indigo-900" : "bg-indigo-700"
              
            }`}
          >
            <span className="pr-3">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="checkbox"
              />
            </span>
            <span className={`flex-grow ${todo.done ? "line-through" : ""}`}>
              {todo.description}
            </span>
            <button
              className="btn btn-error btn-outline btn-xs"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
