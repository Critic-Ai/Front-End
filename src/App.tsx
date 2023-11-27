import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameView from "./pages/GameView";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games/:gamename" element={<GameView />} />
      </Routes>
    </BrowserRouter>
  );
}
