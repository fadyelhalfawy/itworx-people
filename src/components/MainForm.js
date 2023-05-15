import {Component} from "react";
import Joi from "joi-browser";
import InputForm from "./InputForm";
import CheckBox from "./CheckBox";
export default class MainForm extends Component {
    state = {
        data: {},
        errors: {}
    };
    validate() {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};

        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    }

    validateProperty = ( { name, value } ) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {} });
        if (errors) {
            console.log(errors);
            return;
        }

        this.doSubmit();
    };

    handleChange = ({ currentTarget: target }) => {
        const { data, errors } = this.state;
        const errorMessage = this.validateProperty(target);
        if (errorMessage) errors[target.name] = errorMessage;
        else delete errors[target.name];

        data[target.name] = target.value;
        this.setState({ data, errors });
    }

    renderFormInput(name, label, placeHolder, type="text") {
        const { data, errors } = this.state;

        return(
            <InputForm
                name={name}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                placeholder={placeHolder}
                error={errors[name]}
            />
        );
    }

    renderCheckBox(label, id) {
        return(
            <CheckBox
                label={label}
                id={id}
            />
        );
    }

    handleClickButton = (history, path, label) => {
        if (path === "/listingPeople") {
            const errors = this.validate();
            this.setState({errors: errors || {}});
            if (errors) return;
        }

        this.handleButtonTransfer(history, path, label);
    };

    renderButton(style, label, history, path, disabled= true) {
        return(
            <button className={"btn " + style + " btn-space"}
                    disabled={disabled}
                    onClick={() => this.handleClickButton(history, path, label)}>
                {label}
            </button>
        );
    }

    handleButtonTransfer = (history, path, label) => {
        if (label === "Signup" || label === "Login") return history.replace(path);

        return history.push(path);
    };
}