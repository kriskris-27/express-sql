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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6 text-white">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-indigo-500/20">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight">
          📝 <span className="text-indigo-300">My Todo List</span>
        </h1>

        {/* Input Section */}
        <div className="flex items-center bg-white/10 rounded-2xl overflow-hidden border border-white/20 focus-within:ring-2 focus-within:ring-indigo-400 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's next on your list?"
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold px-5 py-3 transition-all duration-300"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <h4 className="text-indigo-300 font-semibold mb-3 tracking-wide uppercase text-sm">
          Your Tasks
        </h4>

        <ul className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-center italic py-4">
              No tasks yet — add one!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-white/10 hover:bg-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm transition-all duration-200"
              >
                <span className="text-gray-100 text-base">{todo.task}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-500 active:scale-90 transition"
                >
                  ✖
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
