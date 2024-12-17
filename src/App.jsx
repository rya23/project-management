import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProjectList from "./components/ProjectList"
import ProgressTracker from "./components/ProgressTracker"
import AddProject from "./components/AddProject"
import Login from "./components/Login"
import { Analytics } from "@vercel/analytics/react"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"

import { getAuth } from "firebase/auth"
import Leaderboard from "./components/LeaderBoard.jsx"

const App = () => {
    const auth = getAuth()
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await auth.currentUser
            setUser(currentUser)
            if (currentUser) {
                console.log(currentUser.uid)
            }
        }

        fetchUser()
    }, [])

    return (
        <div>
            <Router>
                <Header /> {/* Add the Header here */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <ProgressTracker />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/progress"
                        element={
                            <PrivateRoute>
                                <ProgressTracker />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/add-project"
                        element={
                            <PrivateRoute>
                                <AddProject />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/leaderboard" element={<Leaderboard />} />\{" "}
                </Routes>
            </Router>
            <Analytics />
        </div>
    )
}

export default App
