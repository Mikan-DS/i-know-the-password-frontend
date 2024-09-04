import './css/fonts.css'
import './css/common.css'
import './css/text.css'
import './css/buttons.css'
import './css/containers.css'
import API from "./API";
import {useEffect, useState} from "react";
import LoginView from "./LoginView";
import PlayerView from "./PlayerView";
import AdminView from "./AdminView";

let onlyOne = true;

export default function App() {
    const api = API()

    const defaultUser = {
        authenticated: false,
        firstname: "",
        team: "",
        is_admin: false,
        extra: null,
        game: null,
        answer: null
    }

    const [user, setUser] = useState(defaultUser)

    useEffect(() => {
        const interval = setInterval(()=>{
            api.get_user().then(r => {
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
            Суть игры заключается в том что команда (<span>операторов</span>) сначала придумывают инструкции для ИИ для скрытия "секретного"
            пароля - а команда соперников (<span>шпионов</span>) должны придумать инструкции которые заставят ИИ выдать им этот секретный пароль.
            На создание инструкций дается 5 минут, а на создание "контр-инструкций" - 10 минут.
        </div>
        {user.authenticated? (user.is_admin?<AdminView user={user} api={api}/>:<PlayerView user={user} api={api}/>): <LoginView user={user} api={api}/>}
    </div>
    );
}

