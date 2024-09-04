import StateDisplay from "./StateDisplay";
import Timer from "./Timer";
import {useState} from "react";

export default function PlayerView({user, api}){

    const game = user.game

    const defaultFields = {
        message: ''
    }

    const defaultErrors = Object.fromEntries(
        Object.keys(defaultFields).map(key => [key, null])
    );

    const [formData, setFormData] = useState(defaultFields);

    const [errors, setErrors] = useState(defaultErrors);

    async function sendMessage() {
        const newErrors = {...defaultErrors}

        if (formData.message.length < 2) {
            newErrors.message = "Слишком короткая инструкция!"
        }

        setErrors(newErrors)

        if (!newErrors.message) {
            const r = await api.sendMessage(formData.message)
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
        <div className={"player-view"}>
            <h2>
                Игрок: {user.firstname}
                <br/>
                Команда: {user.team || "Неопределенна"}
            </h2>
            <StateDisplay state={game.state}/>
            <Timer game={game}/>
            {game.state === 1? <div>

                Сейчас вам с командой необходимо придумать инструкции как защитить ваш секретный код от команды
                соперников.
                Обсудите их тщательно, они на всю команду!

                <div><label className={errors.message ? "error" : ""} htmlFor="message">{errors.message || "Напишите инструкцию для ИИ"}</label>
                    <input
                        className="form-input-text"
                        type="text"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChangeFormData}
                    /></div>

                <button onClick={sendMessage}>Отправить</button>

            </div> : null

            }

        </div>
    );
}