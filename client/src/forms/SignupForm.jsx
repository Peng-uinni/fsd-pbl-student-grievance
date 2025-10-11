import { useState } from "react"
import FormInput from "./FormInput"
import FormButton from "./FormButton"

//Registration or SignUp or whatever you want to call it 
function SignupForm(){
    const [formData, setFormData] = useState({
        name: "",
        usn: "",
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
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
        <FormInput 
        labelName="USN"
        type="text"
        placeholder="Enter your USN"
        name="usn"
        value={formData.usn}
        setValue={updateData}
        />

        <FormInput 
        labelName="Name"
        type="text"
        placeholder="Enter your name"
        name="name"
        value={formData.name}
        setValue={updateData}
        />
        
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

export default SignupForm