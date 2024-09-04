import {useEffect, useState} from "react";

export default function Timer({game}){
    const [seconds, setSeconds] = useState(0);
    const [oldState, setState] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (game && (game.state !== oldState)){
        if (game.state === 1){
            setSeconds(60*5)
        }
        else if (game.state === 2) {
            setSeconds(60*10)
        }
        else {
            return null;
        }
        setState(game.state)
    }
    if (game === null || game.state === 0 || game.state === 3){
        return null;
    }


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>Осталось времени</h1>
            <h1>{formatTime(seconds)}</h1>
        </div>
    );
}