import { useState } from "react"
import FormInput from "./FormInput"
import FormButton from "./FormButton"

function LoginForm(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const updateData = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //backend validation
    }

    return(
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        
        <FormInput 
        labelName="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        setValue={updateData}
        />

        <FormInput 
        labelName="Password"
        type="password"
        placeholder="Enter your password"
        name="password"
        value={formData.password}
        setValue={updateData}
        />

        <FormButton name="Log In"/>
        </form>
        </>
    )
}

export default LoginForm