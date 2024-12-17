// src/components/ProjectList.js
import React, { useEffect, useState } from "react"
import { fetchProjects, updateProjectStatus } from "../services/projectService"
import { Link } from "react-router-dom"

const ProjectList = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchProjects()
            setProjects(data)
        }
        loadProjects()
    }, [])

    const handleAccept = async (id) => {
        await updateProjectStatus(id, "Accepted")
        setProjects((prev) =>
            prev.map((project) =>
                project.id === id ? { ...project, status: "Accepted" } : project
            )
        )
    }

    return (
        <div>
            <h1>Project Assignments</h1>

            {/* Link to Add Project Page */}
            <Link
                to="/add-project"
                style={{
                    textDecoration: "none",
                    color: "blue",
                    marginRight: "20px",
                }}
            >
                + Assign New Project
            </Link>

            {/* Link to Progress Tracker */}
            <Link
                to="/progress"
                style={{ textDecoration: "none", color: "blue" }}
            >
                View Progress Tracker
            </Link>

            <div style={{ marginTop: "20px" }}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            margin: "10px 0",
                        }}
                    >
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <p>Status: {project.status}</p>
                        {project.status === "Assigned" && (
                            <button onClick={() => handleAccept(project.id)}>
                                Accept
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectList
