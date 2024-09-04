export default function StateDisplay({state}){

    const name = state === 0?
        "Игра еще не началась":
        state === 1?
            "Стадия инструкций для защиты":
            state === 2?
                "Стадия инструкций для взлома":
                "Игра завершена"

    return (
        <h1>
            {name}
        </h1>
    );
}