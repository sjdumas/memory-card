import { useState, useEffect } from "react";
import Header from "./components/Header";
import Score from "./components/Score";
import Card from "./components/Card";
import { getMultiplePokemonImages } from "./utilities";
import "./style.css";

function App() {
	document.title = "Memory Card Game";

	const [cards, setCards] = useState([]);
	const [cardsNumber, setCardsNumber] = useState(8);
	const [highscore, setHighscore] = useState(0);
	const [shuffledCards, setShuffledCards] = useState([]);

	useEffect(() => {
		let ignore = false;

		getMultiplePokemonImages(cardsNumber).then((data) => {
			if (!ignore) {
				const generatedCards = data.map((pokemon) => ({
					id: crypto.randomUUID(),
					name: pokemon.name,
					src: pokemon.image,
					isClicked: false,
				}));				

				setCards(generatedCards);
				setShuffledCards(shuffleArray(generatedCards));
			}
		});
		return () => {
			ignore = true;
		};
	}, [cardsNumber]);

	const findCardById = (id) => {
		return cards.find((card) => card.id === id);
	};

	const resetAllCards = () => {
		const cardsReseted = cards.map((card) => {
			return { ...card, isClicked: false };
		});
		setCards(cardsReseted);
	};

	const shuffleArray = (array) => {
		const copy = [...array];

		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	};

	const handleCardClick = (id) => {
		const card = findCardById(id);
		
		if (card.isClicked) {
			resetAllCards();
		} else {
			const newCards = cards.map((card) =>
				card.id === id ? { ...card, isClicked: true } : card
			);

			setCards(newCards);
			setShuffledCards(shuffleArray(newCards));

			const newScore = newCards.filter((c) => c.isClicked).length;
			
			setHighscore((prevHighscore) => Math.max(prevHighscore, newScore));
		}
	};

	const score = cards.filter((card) => card.isClicked).length;

	return (
		<>
			<div className="container">
				<Header />
				<Score score={score} highScore={highscore} />
				<div className="cards">
					{shuffledCards.map((card) => (
					<Card
						key={card.id}
						id={card.id}
						src={card.src}
						name={card.name}
						onClick={handleCardClick}
					/>
					))}
				</div>
			</div>
		</>
	)
}

export default App;
