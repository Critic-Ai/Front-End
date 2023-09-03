const GameCard = ({ name, rating, cover }) => {
    return (
        <div className="border rounded-lg m-5 p-5 flex flex-col justify-between bg-gray-300 items-center min-w-1/2">
            <h1 className="p-3">{name}</h1>
            <img className="rounded-full w-32 h-32 mb-2 p-1" src={cover} alt="not available" />
            <p>Rating: {Math.round(rating)}</p>
        </div>
    );
}

export default GameCard;
