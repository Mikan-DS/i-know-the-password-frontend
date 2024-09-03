import './css/fonts.css'
import './css/common.css'
import './css/text.css'
import './css/buttons.css'
import './css/containers.css'
import API from "./API";
import {useEffect, useState} from "react";
import LoginView from "./LoginView";

let onlyOne = true;

export default function App() {
    const api = API()

    const defaultUser = {
        authenticated: false,
        firstname: "",
        team: ""
    }

    const [user, setUser] = useState(defaultUser)

    useEffect(() => {
        const interval = setInterval(()=>{
            api.get_user().then(r => {
                console.log(r)
                if (r !== null) {
                    setUser(r);
                }
                else {
                    setUser(defaultUser)
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [user, api]);


    return (
    <div className="App">
        <h1>
            Я ЗНАЮ ПАРОЛЬ?!
        </h1>
        <div className={"body-text"}>
            Командная игра созданная для студентов колледжа "ТИСБИ" с использованием ИИ.
            <br/>
            Суть игры заключается в том что команды сначала придумывают инструкции для ИИ для скрытия "секретного"
            пароля - а команда соперников должны придумать инструкции которые заставят ИИ выдать им этот секретный пароль.
            На создание инструкций дается 5 минут, а на создание "контр-инструкций" - 10 минут.
        </div>
        {user.authenticated? null: <LoginView user={user} api={api}/>}
    </div>
    );
}

