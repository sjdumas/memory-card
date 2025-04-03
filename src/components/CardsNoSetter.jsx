import { useState } from "react"

function CardsNoSetter( {onSubmit, cardsNo}) {
    const [value, setValue] = useState(cardsNo);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(Number(value));
    };

    return (
        <form className="cards-setter" onSubmit={handleSubmit}>
            <label htmlFor="cards-setter">Set of Cards: </label>
            <input 
                type="number" 
                id="cards-setter"
                name="cardsSetter"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CardsNoSetter;
