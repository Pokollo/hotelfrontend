import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegistrarPage } from "./pages/RegistrarPage/RegistrarPage"
import { UserDashboard } from "./pages/UserDashboard/UserDashboard"
import { AdminDashboard } from "./pages/AdminDashboard/AdminDashboard"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} ></Route>
      <Route path="/login" element={<LoginPage></LoginPage>} ></Route>
      <Route path="/registrar" element={<RegistrarPage></RegistrarPage>} ></Route>
      <Route path="/userdashboard" element={<UserDashboard></UserDashboard>} ></Route>
      <Route path="/admindashboard" element={<AdminDashboard></AdminDashboard>} ></Route>
    </Routes>
  )
}

export default App
