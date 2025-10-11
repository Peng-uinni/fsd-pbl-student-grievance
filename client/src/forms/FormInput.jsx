import TextField from "@mui/material/TextField"

function FormInput({type, value, setValue, name, label}){
    return(
        <div className="mb-4">
        <TextField 
            variant="outlined"
            required
            fullWidth
            name={name}
            type={type}
            label={label}
            value={value}
            onChange={setValue}
        />
        </div>
    )
}

export default FormInput