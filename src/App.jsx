import { useState, useEffect } from "react";
import Header from "./components/Header";
import Score from "./components/Score";
import Card from "./components/Card";
import CardsNoSetter from "./components/CardsNoSetter";
import { getMultiplePokemonImages } from "./utilities";
import "./style.css";

function App() {
	document.title = "Memory Card Game";

	const [cards, setCards] = useState([]);
	const [cardsNo, setCardsNo] = useState(8);
	const [highscore, setHighscore] = useState(0);
	const [shuffledCards, setShuffledCards] = useState([]);

	useEffect(() => {
		let ignore = false;

		getMultiplePokemonImages(cardsNo).then((data) => {
			if (!ignore) {
				const generateCards = data.map((src) => ({
					src,
					id: crypto.randomUUID(),
					isClicked: false,
				}));

				setCards(generateCards);
				setShuffledCards(shuffleArray(generateCards));
			}
		});

		return () => {
			ignore = true;
		};
	}, [cardsNo]);

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

	const randomizedCards = () => {
		const colonedCards = [...cards];
		for (let i = colonedCards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[colonedCards[i], colonedCards[j]] = [colonedCards[j], colonedCards[i]];
		}
		return colonedCards;
	};

	const handleCardsNoChange = (newNumber) => {
		setCardsNo(newNumber);
	};

	const score = cards.filter((card) => card.isClicked).length;

	return (
		<>
			<div className="container">
				<Header />
				<CardsNoSetter onSubmit={handleCardsNoChange} cardsNo={cardsNo} />
				<Score score={score} highScore={highscore} />
				<div className="cards">
					{shuffledCards.map((card) => (
					<Card
						key={card.id}
						id={card.id}
						src={card.src}
						onClick={handleCardClick}
					/>
					))}
				</div>
			</div>
		</>
	)
}

export default App;
