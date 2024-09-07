import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./style.scss"
import "./index.css"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import VideoCall from "./components/VideoCall"


function App() {
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)
  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="room/:roomId" element={<VideoCall />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
