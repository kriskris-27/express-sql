import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleClick = () => {
    login()
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {/* Hero Text */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-center">
        Welcome to <span className="text-indigo-400">Your App</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-md">
        Streamline your workflow. Stay productive. Build fast.  
      </p>

      {/* CTA Button */}
      <button
        onClick={handleClick}
        className="px-8 py-4 text-lg font-semibold bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all duration-300 ease-in-out rounded-2xl shadow-lg shadow-indigo-500/30"
      >
        🚀 Hop into your app
      </button>

      {/* Subtext */}
      <p className="mt-10 text-sm text-gray-400">
        No sign-up needed — just jump right in.
      </p>
    </div>
  )
}

export default Landing
