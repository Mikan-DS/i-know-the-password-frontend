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
        const r = await api.update();
        if (r !== null){
            setPlayers(r.players);
            setTeams(r.teams);
        }
    }
    async function createTeams(){
        await api.createTeams();
        await update();
    }

    async function next(){
        await api.next()
    }

    async function reset(){
        await api.reset();
        await api.update();
    }


    return (
        <div className={"admin-view"}>
            <a href={"/admin"}>Настройка</a>

            <button onClick={update}>
                Обновить
            </button>
            <button onClick={reset}>
                Сбросить игру
            </button>
            <button onClick={createTeams}>
                Собрать команды
            </button>
            <button onClick={next}>
                Следующий этап
            </button>

            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>

            <h1>
                {teams[0].name}
            </h1>
            <ul>
                {teams[0].players.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>

            <h1>
                {teams[1].name}
            </h1>
            <ul>
                {teams[1].players.map((player, index) => (
                    <li key={index}>{player}</li>
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