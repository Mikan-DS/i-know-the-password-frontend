import {useEffect, useState} from "react";
import Timer from "./Timer";

export default function AdminView({user, api}){

    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([
        {
            players: [],
            name: ""
        },
        {
            players: [],
            name: ""
        },
    ])

    const game = user.game;

    async function update() {
        const r = await api.update()
    }


    return (
        <div className={"admin-view"}>
            <a href={"/admin"}>Настройка</a>

            <button>
                Обновить
            </button>
            <button>
                Сбросить игру
            </button>
            <button>
                Собрать команды
            </button>
            <button>
                Следующий этап
            </button>

            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>

            <h1>
                Команда 1
            </h1>
            <ul>
                {teams[0].players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>

            <h1>
                Команда 2
            </h1>
            <ul>
                {teams[1].players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>


            <Timer game={user.game}/>

            {game.winner?<div>
                <h1>Победила команда: "{game.winner.team}"</h1>
                <h1>Ответ отправил: "{game.winner.name}"</h1>
            </div>:null}

        </div>
    );
}