export default function GameCard({ name, rating, cover }) {
    return (
        <div className="m-5 p-5 flex flex-col justify-between items-center border rounded-lg w-80 bg-gray-300">
            <h1 className="mb-4">{name}</h1>
            <img className="mb-2 p-1 w-60 h-60 rounded-2xl" src={cover} alt="not available" />
            <p>Rating: {rating}</p>
        </div>
    );
}
