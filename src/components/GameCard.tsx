import { useNavigate } from 'react-router-dom';

type GameCardProps = {
    name: string;
    rating: string;
    cover: string;
    notFound?: boolean;
};

export default function GameCard({ name, rating, cover, notFound = false }: GameCardProps) {
    const navigate = useNavigate();

    const gotoGame = () => {
        const sanitizedName = name.replace(/\s/g, '-');

        navigate(`/games/${sanitizedName}`, { state: { name, rating, cover } });
    }

    return (
        <div className="m-5 p-5 flex flex-col justify-between items-center border rounded-lg w-80 bg-gray-300">
            <h1 className="mb-4">{name}</h1>
            <img className="mb-2 p-1 w-60 h-60 rounded-2xl" src={cover} alt="not available" />
            <p>Rating: {rating}</p>
            {!notFound && (
                <button
                    onClick={gotoGame}
                    className="mt-4 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700 transition-all duration-300"
                >
                    More
                </button>
            )}
        </div>
    );
}
