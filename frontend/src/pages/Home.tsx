import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

type Todo = {
  id: number;
  task: string;
  created_at: Date;
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const res = await axiosInstance.get("/");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await axiosInstance.post("/", { task: input });
    setTodos([...todos, res.data]);
    setInput("");
  };

  const deleteTodo = async (id: number) => {
    await axiosInstance.delete(`/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          📝 My Todo List
        </h1>

        {/* Input Section */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <h4 className="text-gray-700 font-semibold mb-2">Your Tasks</h4>
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-sm italic text-center">
              No tasks yet. Add one!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-2 transition"
              >
                <span className="text-gray-800">{todo.task}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
