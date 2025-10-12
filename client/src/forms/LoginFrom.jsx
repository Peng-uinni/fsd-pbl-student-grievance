import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"

import { useState } from "react"

function MockForm(){
    const [data, setData] = useState({
        usn: "",
        name: "",
        email: "",
        password: "",
    })

    const updateData = (e) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        //backend validation
    }

    return (
    <div className="w-screen h-screen"
    style={{
        backgroundImage: "url('/bw-bg.jpg')",
        backgroundSize: "contain",
        padding: "5rem 10rem 5rem 10rem",
    }}>
        <Paper elevation={4} className="flex h-full">
            <Box className="w-1/2 text-white font-bold"
            sx={{
                backgroundImage: "url('/blue-bg.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                padding: "5rem"
            }}
            >
                <Typography variant="h2">
                    Welcome Back!
                </Typography>
                <Typography variant="subtitle1">
                    Sign in here
                </Typography>
            </Box>

            <Box component="form" 
            className="w-1/2 flex flex-col items-start p-20" 
            onSubmit={handleSubmit}
            >
                <div className="mb-10">
                    Logo
                </div>
                <Typography variant="h5"
                sx={{
                    margin: "10px 0 10px 0",
                    textAlign: "center",
                    width: "100%"
                }}>
                    Sign in to your account
                </Typography>

                <TextField
                variant="standard"
                size="small"
                required
                fullWidth
                name="usn"
                type="text"
                label="USN"
                value={data.usn}
                onChange={updateData}
                sx={{marginBottom: "15px"}}
                />

                <TextField
                variant="standard"
                size="small"
                required
                fullWidth
                name="password"
                type="password"
                label="Password"
                value={data.password}
                onChange={updateData}
                sx={{marginBottom: "15px"}}
                />

                <Button 
                variant="contained"
                fullWidth 
                type="submit" 
                sx={{marginBottom: "10px"}}
                >
                    Sign In
                </Button>
                <Typography variant="subtitle2" className="w-full flex flex-col items-center">
                    <Link href="/signup">Create an account</Link>
                    <Link>Forgot Password</Link>
                </Typography>
            </Box>
        </Paper>
    </div>
    )
}

export default MockForm
