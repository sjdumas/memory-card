function Card({ id, src, onClick }) {
	return (
		<div className="card" onClick={() => onClick(id)}>
			<img src={src} alt="Pokemon" className="pokemon-image" />
		</div>
	);
};

export default Card;
