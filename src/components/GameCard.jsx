export default function GameCard({ name, rating, cover }) {
    return (
        <div className="m-5 p-5 flex flex-col justify-between items-center border rounded-lg min-w-1/2 bg-gray-300">
            <h1 className="mb-4">{name}</h1>
            <img className="rounded-full w-64 h-64 mb-2 p-1" src={cover} alt="not available" />
            <p>Rating: {rating}</p>
        </div>
    );
}
