import { useEffect, useState } from "react"
import axiosInstance from "../api/axiosInstance"

type Todo = {
    id:number;
    task:string;
    created_at:Date;
}

const Home = () => {
    const [todos,setTodos]  = useState<Todo[]>([])
    const [input,setInput] = useState<string>("")

    useEffect(() => {
        gettodo();        
    },[input])

    const gettodo = async () =>{
        console.log(axiosInstance);
        
        const res = await axiosInstance.get("/");

        setTodos(res.data)
    }

    const addtodo = async () =>{
        if(!input.trim()) return 
        const res = await axiosInstance.post("/",{task:input});
        setTodos([...todos,res.data])
        setInput("")
    }   
  return (
    <div>
      Home
      
        <input value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={addtodo}>Add todo</button>


    <h4>TODOS</h4>
    <ul>
     {todos && todos.map((todo) => (
    <li key={todo.id || todo.task}>{todo.task}</li>
  ))}
</ul>

    </div>
  )
}

export default Home
