import { Route, Routes, BrowserRouter } from "react-router-dom"
import LoginForm from "./froms/LoginFrom"
import SignupForm from "./froms/SignupForm"

function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App