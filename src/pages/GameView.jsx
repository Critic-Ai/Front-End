import { useLocation } from 'react-router-dom';

export default function GameView() {
    const location = useLocation();

    const { name, rating, cover } = location.state;

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-start mt-4">
                <div className="w-1/5 mr-20">
                    <img
                        className="w-full h-auto im"
                        src={cover}
                        alt="dummy image"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="mb-2 title">{name}</h1>
                    <h2 className="mb-2 rating">Rating: {rating}</h2>
                </div>
            </div>
            <div className="flex flex-col items-center mt-auto mb-40">
                <textarea
                    className="w-2/3 h-24 p-2 border rounded focus:outline-none focus:border-blue-500 desc"
                    placeholder="Generated review"
                ></textarea>
            </div>
        </div>
    );
};
