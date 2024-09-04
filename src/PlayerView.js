import StateDisplay from "./StateDisplay";
import Timer from "./Timer";
import {useState} from "react";

export default function PlayerView({user, api}){

    const game = user.game

    const defaultFields = {
        message: '',
        password: '',
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

    async function sendPassword() {
        const newErrors = {...defaultErrors}

        if (formData.password.length < 2) {
            newErrors.password = "Код не может быть настолько коротким!"
        }


        if (!newErrors.password) {
            const r = await api.sendPassword(formData.password)
            if (!r.correct){
                newErrors.password = "Код неверный! Попробуйте другой ;)"
            }
        }

        setErrors(newErrors)



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
            {/*<Timer game={game}/>*/}
            {game.state === 1 ? <div>

                Сейчас вам с командой необходимо придумать инструкции как защитить ваш секретный код от команды
                соперников.
                Обсудите их тщательно, они на всю команду!

                <div><label className={errors.message ? "error" : ""}
                            htmlFor="message">{errors.message || "Напишите инструкцию для ИИ"}</label>
                    <textarea
                        className="form-input-text"
                        type="text"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChangeFormData}
                    /></div>

                <button onClick={sendMessage}>Отправить</button>

            </div> : game.state === 2 ? <div>

                Пора придумать способ как обхитрить ИИ!
                <br/>
                После того как нажимаете "Отправить" подождите немного, для программиста было слишком мало времени на
                более плавную игру :)

                <div><label className={errors.message ? "error" : ""}
                            htmlFor="message">{errors.message || "Напишите инструкцию для ИИ"}</label>
                    <textarea
                        className="form-input-text"
                        type="text"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChangeFormData}
                    /></div>

                <button onClick={sendMessage}>Отправить</button>

                <div>
                    <h3>Ответ ИИ: {user.answer || "Пока пусто"}</h3>
                </div>

                <div><label className={errors.password ? "error" : ""}
                            htmlFor="password">{errors.password || "Какой может быть пароль?"}</label>
                    <input
                        className="form-input"
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChangeFormData}
                    /></div>
                <button onClick={sendPassword}>Попробовать</button>


            </div> : game.winner ?
                <h2>
                    Победила команда: {game.winner.team}
                    <br/>
                    Ответ отправил: {game.winner.name}
                </h2>:null

            }

        </div>
    );
}