import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { LogOut, Menu } from "lucide-react"

const Header = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut(auth)
        console.log("User signed out")
        navigate("/login")
    }

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            <Link
                                to="/"
                                className="text-xl font-bold text-gray-900 sm:text-2xl"
                            >
                                Task Management System
                            </Link>{" "}
                        </h1>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <button
                            type="button"
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Link
                        to="/leaderboard"
                        className="text-lg hover:text-gray-300"
                    >
                        Leaderboard
                    </Link>{" "}
                    {/* Link to Leaderboard */}
                    {user && (
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <span className="text-gray-700 font-medium mr-4">
                                {user.displayName}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
