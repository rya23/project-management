import { auth, provider } from "../firebase"
import {
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence)

            const result = await signInWithPopup(auth, provider)
            console.log("User signed in:", result.user)

            navigate("/")
        } catch (error) {
            console.error("Error signing in:", error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to the Project Management System
            </h1>
            <p className="text-gray-600 mb-8">
                Please log in to access your Projects.
            </p>
            <button
                onClick={handleGoogleLogin}
                className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-600 transition"
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default Login
