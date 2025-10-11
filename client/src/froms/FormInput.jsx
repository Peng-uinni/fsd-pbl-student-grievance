function FormInput({type, placeholder, labelName, value, setValue, name}){
    return(
        <div>
        <label>
            {labelName}
        </label>
        <input 
        type={type}
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={setValue}
        />
        </div>
    )
}

export default FormInput