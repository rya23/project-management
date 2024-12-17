import React, { useEffect, useState } from "react"
import { fetchProgress, updateProgress } from "../services/progressService" // Modify this to accept userId as a parameter
import { getAuth } from "firebase/auth"
import { Link } from "react-router-dom"
import { CircleEllipsis, CheckCircle2, Trophy } from "lucide-react"

const ProgressTracker = () => {
    const [progress, setProgress] = useState([])
    const [loading, setLoading] = useState(true)

    const auth = getAuth()
    const user = auth.currentUser
    const userId = user ? user.uid : null

    useEffect(() => {
        const loadProgress = async () => {
            if (userId) {
                try {
                    // Fetch progress for the current user
                    const data = await fetchProgress(userId) // Pass userId to the API/service
                    setProgress(data)
                } catch (error) {
                    console.error("Error fetching progress:", error)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        if (userId) {
            loadProgress()
        }
    }, [userId])

    const handleUpdate = async (taskId, currentStatus) => {
        let newStatus = "In Progress"
        if (currentStatus === "Assigned") {
            newStatus = "In Progress"
        } else if (currentStatus === "In Progress") {
            newStatus = "Completed"
        }

        try {
            await updateProgress(taskId, newStatus) // Update task status
            setProgress((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            )
        } catch (error) {
            console.error("Error updating progress:", error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg">Loading tasks...</p>
            </div>
        )
    }

    if (!userId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg">Please log in to view your tasks.</p>
            </div>
        )
    }

    const assignedTasks = progress.filter((task) => task.status === "Assigned")
    const inProgressTasks = progress.filter(
        (task) => task.status === "In Progress"
    )
    const completedTasks = progress.filter(
        (task) => task.status === "Completed"
    )

    const totalTasks = progress.length
    const completionPercentage = totalTasks
        ? (completedTasks.length / totalTasks) * 100
        : 0

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">{user.displayName}</h1>
                    <p className="text-gray-600">
                        Candidate Progress Dashboard
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    <span className="text-xl font-semibold">
                        {completedTasks.length} pts
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-medium text-gray-600">
                            Assigned Projects
                        </h2>
                        <CircleEllipsis className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold">{assignedTasks.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-medium text-gray-600">
                            Completed
                        </h2>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold">
                        {completedTasks.length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-medium text-gray-600">
                            Total Tasks
                        </h2>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-8">
                <h2 className="text-sm font-medium text-gray-600 mb-2">
                    Overall Progress
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600">
                    {completedTasks.length} of {totalTasks} projects completed
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {progress.map((task) => (
                    <div
                        key={task.id}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">
                                {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Due: {task.dueDate}
                            </p>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            {task.description}
                        </p>
                        {task.status !== "Completed" && (
                            <button
                                onClick={() =>
                                    handleUpdate(task.id, task.status)
                                }
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            >
                                {task.status === "Assigned"
                                    ? "Accept Project"
                                    : "Complete Project"}
                            </button>
                        )}
                        {task.status === "Completed" && (
                            <div className="flex items-center gap-2 text-green-500">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    Completed
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-8 right-8">
                <Link
                    to="/add-project"
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                >
                    + Assign New Project
                </Link>
            </div>
        </div>
    )
}

export default ProgressTracker
