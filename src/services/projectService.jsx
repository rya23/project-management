// src/services/projectService.js
import { db } from "../firebase"
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// Fetch all projects
export const fetchProjects = async () => {
    const projectsRef = collection(db, "projects")
    const projectSnapshot = await getDocs(projectsRef)
    return projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const assignProject = async (project) => {
    // Get the currently logged-in user from Firebase Authentication
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
        throw new Error("User not authenticated. Please log in.")
    }

    // Include the userId and displayName in the project object
    const projectWithUserInfo = {
        ...project,
        userId: user.uid, // Automatically assign the user ID
        userName: user.displayName || "Anonymous", // Add the user's display name (fallback to "Anonymous" if no display name is set)
    }

    // Reference the Firestore 'projects' collection
    const projectsRef = collection(db, "projects")

    // Add the project to Firestore
    await addDoc(projectsRef, projectWithUserInfo)
}

// Update project status
export const updateProjectStatus = async (projectId, status) => {
    const projectDoc = doc(db, "projects", projectId)
    await updateDoc(projectDoc, { status })
}
