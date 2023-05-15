import React from "react";

const CheckBox = ({ id, label }) => {
    return(
        <div className="form-group form-check">
            <input type="checkbox"
                   className="form-check-input"
                   id={ id }/>
            <label className="form-check-label"
                   htmlFor={ id }>{label}</label>
        </div>
    );
}

export default CheckBox;