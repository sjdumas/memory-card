function Card({ id, src, name, onClick }) {
	return (
		<div className="card" onClick={() => onClick(id)}>
			<div className="card-content">
				<img src={src} alt={name} className="pokemon-image" />
				<p className="pokemon-name">{name}</p>
			</div>
		</div>
	);
};

export default Card;
