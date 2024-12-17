import { db } from "../firebase"
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    where,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"

export const fetchProgress = async () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
        throw new Error("User not authenticated. Please log in.")
    }

    const userId = user.uid
    const projectsRef = collection(db, "projects")

    const userProjectsQuery = query(projectsRef, where("userId", "==", userId))
    try {
        const projectSnapshot = await getDocs(userProjectsQuery)

        if (!projectSnapshot.empty) {
            return projectSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        } else {
            return []
        }
    } catch (error) {
        console.error("Error fetching progress:", error)
        throw new Error("Failed to fetch projects.")
    }
}

export const updateProgress = async (taskId, newStatus) => {
    const taskRef = doc(db, "projects", taskId)
    await updateDoc(taskRef, {
        status: newStatus,
    })
}

export const fetchLeaderboard = async () => {
    const projectsRef = collection(db, "projects")

    // Query to group by userId and count completed tasks
    const q = query(projectsRef, where("status", "==", "Completed"))

    const projectSnapshot = await getDocs(q)

    // Create an object to store the leaderboard data
    const leaderboardData = {}

    projectSnapshot.forEach((doc) => {
        const project = doc.data()
        const { userId, userName } = project // Get userId and userName
        // Increment completed tasks count for each user
        if (leaderboardData[userId]) {
            leaderboardData[userId].completedTasks += 1
        } else {
            leaderboardData[userId] = { completedTasks: 1, userName }
        }
    })

    // Convert the leaderboard data into an array
    return Object.values(leaderboardData)
}
