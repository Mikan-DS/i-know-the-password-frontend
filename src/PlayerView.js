export default function PlayerView({user, api}){



    return (
        <div className={"player-view"}>
            <h2>
                Игрок: {user.name}
                <br/>
                Команда: {user.team || "Неопределенна"}
            </h2>
            <h1>ИГРА ЕЩЕ НЕ НАЧАЛАСЬ</h1>
        </div>
    );
}