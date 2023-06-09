import "../css/InputForm.css";
const InputForm = ({ name, label, error, ...rest }) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input className="form-input clickable"
                   {...rest}
                   id={name}
                   name={name}
            />
            {error && <div className="alert alert-danger">
                {error}
            </div>
            }
        </div>
    );
}

export default InputForm;