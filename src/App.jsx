import { useEffect, useState } from 'react';
import GameCard from './components/GameCard';
import Title from './components/Title';
import Footer from './components/Footer';

function App() {
  const [games, setGame] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/records/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGame(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div >
      <Title />
      <form onSubmit={getSearch} className="p-4 flex justify-center items-center">
        <input
          className="w-1/4 p-2 border rounded-lg"
          type="text"
          placeholder="Search for a game"
          value={search}
          onChange={updateSearch}
        />
        <button
          className="ml-4 bg-yellow-400 border-none p-2 px-4 text-blue-900 font-semibold"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="flex flex-col justify-center items-center flex-wrap">
        {games.map((game) => (
          <GameCard
            key={game._id}
            name={game.name}
            rating={game.rating}
            cover={game.cover}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
