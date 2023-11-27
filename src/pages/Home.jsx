import { useState } from 'react';
import { GameCard, Title, Footer } from '../components';
import MockResponse from '../test_assets/response.json';

export default function Home() {
    const [query, setQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState([]);
    const [notFound, setNotFound] = useState(false);
    // const [cachedGames, setCachedGames] = useState([]);

    // mock
    let cachedGames = MockResponse.data;

    const searchGames = async (e) => {
        e.preventDefault();

        if (query === '') {
            alert("not funny, didn't laugh");
            return;
        }

        if (cachedGames.length > 0) {
            // console.log('cache hit');
            const filteredResults = cachedGames.filter((result) => result.name.toLowerCase().includes(query.toLowerCase()));

            if (filteredResults.length > 0) {
                setFilteredGames(filteredResults);
                setNotFound(false);
            } else {
                setFilteredGames([]);
                setNotFound(true);
            }
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/records/');
            const data = await response.json();
            const results = data.data;
            // console.log('cache miss');

            // setCachedGames(results);

            const filteredResults = results.filter((result) => result.name.toLowerCase().includes(query.toLowerCase()));

            if (filteredResults.length > 0) {
                setFilteredGames(filteredResults);
                setNotFound(false);
            } else {
                setFilteredGames([]);
                setNotFound(true);
            }

        } catch (error) {
            alert("wendy's fault");
            console.log(error);
        } finally {
            setQuery('');
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Title />

            <form className="w-1/3 mx-auto" onSubmit={searchGames}>
                <div className="flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="mx-3 flex justify-center items-center h-full w-12 text-gray-300">
                        <div onClick={searchGames} className="peer cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <input
                        className="pr-2 peer h-full w-full outline-none text-sm text-gray-700"
                        type="text"
                        placeholder="Search for a game"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                </div>
            </form>

            <div className="flex flex-col justify-center items-center flex-wrap flex-grow">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <GameCard
                            key={game._id}
                            name={game.name}
                            rating={game.rating}
                            cover={game.cover}
                        />
                    ))
                ) : notFound ? (
                    <GameCard
                        key={69}
                        name={'Game not found'}
                        rating={69}
                        cover={"https://i.kym-cdn.com/entries/icons/original/000/041/255/sittingwolfcontemplating.jpg"}
                        notFound={true}
                    />
                ) : null}
            </div>

            <Footer />
        </div>
    );
}
