import { useState } from "react"

import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

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
        <Container component="main" maxWidth="sm" className="mt-20">
            <Paper elevation={5} className="p-8">
                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography variant="h5" className="mb-4">
                        Sign Up
                    </Typography>

                    <Box
                    component="form"
                    sx={{
                        width: "100%",
                    }}
                    >
                        <FormInput 
                        label="USN"
                        name="usn"
                        type="text"
                        value={formData.usn}
                        setValue={updateData}
                        />

                        <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        setValue={updateData}
                        />

                        <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        setValue={updateData}
                        />

                        <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        setValue={updateData}
                        />

                        <FormButton name="Log In"/>
                    </Box>
                </Box>
            </Paper>
        </Container>
        </>
    )
}

export default SignupForm