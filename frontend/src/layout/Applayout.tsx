import { Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Applayout = () => {
    const isOpen = true
    const {logout} = useAuth()
    
  return (
    <div>
       <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
       <div
            className={`
                    fixed lg:relative inset-y-0 left-0 z-30
                    w-64 flex flex-col shadow-lg 
                    transform transition-transform duration-300 ease-in-out 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                `}>
                    sidebar
        </div>
      <div className="flex flex-col flex-1 overflow-hidden">
      <header className={`flex-shrink-0 flex justify-between items-center  border-gray-200 px-4 lg:px-10 lg:justify-end h-16 w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <h4 className="p-2">Header |</h4>
        <button onClick={logout}>Logout</button>
      </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  )
}

export default Applayout
