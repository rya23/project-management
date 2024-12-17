import React, { useEffect, useState } from "react"
import { fetchLeaderboard } from "../services/progressService" // Import the function
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)

    const auth = getAuth()
    const user = auth.currentUser
    useEffect(() => {
        const loadLeaderboard = async () => {
            try {
                const data = await fetchLeaderboard()
                setLeaderboard(data)
            } catch (error) {
                console.error("Error fetching leaderboard:", error)
            } finally {
                setLoading(false)
            }
        }

        loadLeaderboard()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-gray-600">
                    Loading leaderboard...
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-2xl font-bold text-center mb-8">Leaderboard</h1>

            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-200">
                                Rank
                            </th>
                            <th className="px-4 py-2 border border-gray-200">
                                User Name
                            </th>
                            <th className="px-4 py-2 border border-gray-200">
                                Completed Tasks
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard
                            .sort((a, b) => b.completedTasks - a.completedTasks) // Sort by completed tasks in descending order
                            .map((userItem, index) => (
                                <tr
                                    key={`${userItem.userId}-${index}`} // Create a composite key by combining userId and index
                                    className={
                                        userItem.userName == user?.displayName
                                            ? "bg-blue-100" // Highlight the current user's row
                                            : "bg-white"
                                    }
                                >
                                    <td className="px-4 py-2 border border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-200">
                                        {userItem.userName}{" "}
                                        {/* Display userName */}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-200">
                                        {userItem.completedTasks}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leaderboard
