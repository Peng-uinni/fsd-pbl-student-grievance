import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

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
                    Welcome!
                </Typography>
                <Typography variant="subtitle1">
                    作为替代“Lorem Ipsum”的中文占位符文本，这里有一段随机生成的、旨在模仿中文书写结构但无实际意义的文本：

---

**中文占位符文本**

最准衣报记时。定产刻人衣教水没经年。建识目水民场口便难系做什制，尼每告连音气实太计克或切吧。以整妻过全古喜来达，本解题或本绝海万文。个即多力电来电写答行布写。半总信情车么，士黑之老会神。术它现个与丽夫这统造美。

只城星令诗青远系。周信表起反同吧完北士人独。争德青三打容晚类爱己些丽维观，张再要尽应双交少联直明友到苦。通他并星友现愿目联办受头且婚，达福岁平地里英分世片半非为自。史制周动生病脸工手面该爱系复个，强今却步对社动夫曾高成消想空次。读父向路确着让好转等不热，论称德为求他量未拉数写理。建每前由说巴高生活，使感父未爸事取往诗。
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
                    Form
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
                name="name"
                type="text"
                label="Name"
                value={data.name}
                onChange={updateData}
                sx={{marginBottom: "15px"}}
                />

                <TextField
                variant="standard"
                size="small"
                required
                fullWidth
                name="email"
                type="email"
                label="Email"
                value={data.email}
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
                >
                    SignIn/SignUp
                </Button>
            </Box>
        </Paper>
    </div>
    )
}

export default MockForm
