import Button from "@mui/material/Button"

function FormButton({name}){
    return(
        <div>
        <Button
        variant="contained"
        fullWidth
        >
            {name}
        </Button>
        </div>
    )
}

export default FormButton