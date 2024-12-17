import React, { useState } from "react"
import { assignProject } from "../services/projectService"
import { useNavigate } from "react-router-dom"

const AddProject = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("Assigned")
    const [message, setMessage] = useState("")
    const navigate = useNavigate() 
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !description) {
            setMessage("Please fill out all fields.")
            return
        }

        try {
            await assignProject({ title, description, status: "Assigned" })

            navigate("/")
        } catch (error) {
            console.error("Error adding project: ", error)
            setMessage("Failed to add project. Please try again.")
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Assign New Project
            </h2>
            {message && (
                <p className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                        required
                    ></textarea>
                </div>
                {/* <div>
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Status:
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div> */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add Project
                </button>
            </form>
        </div>
    )
}

export default AddProject
