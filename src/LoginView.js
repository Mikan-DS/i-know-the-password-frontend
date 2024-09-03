import {useState} from "react";

export default function LoginView({user, api}){


    const defaultFields = {
        name: ''
    }

    const defaultErrors = Object.fromEntries(
        Object.keys(defaultFields).map(key => [key, null])
    );

    const [formData, setFormData] = useState(defaultFields);

    const [errors, setErrors] = useState(defaultErrors);

    async function login() {
        const newErrors = {...defaultErrors}

        if (formData.name.length < 2) {
            newErrors.name = "Имя слишком короткое!"
        }

        setErrors(newErrors)

        if (!newErrors.name) {

        }


    }

    const handleChangeFormData = (e) => {
        const {name, value, type, checked} = e.target;
        setErrors({
            ...errors,
            [name]: null
        })
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <div className={"login-view body-text"}>
            Для начала вам необходимо войти!
            Напишите свое имя чтобы войти в лобби.
            <div className={errors.name ? "error" : ""}>
                <label htmlFor="name">{errors.name ? errors.name : "Имя"}</label>
                <input
                    className="form-input-text"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeFormData}
                    required
                />
            </div>
            <button className={"tertiary-button large"} onClick={login}>
                ВОЙТИ
            </button>
        </div>
    );
}