import { Roulette } from "./components/Roulette";
import { people } from "./constants";

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-2">ルーレット</h1>
      <Roulette people={people} />
    </div>
  );
}

export default Home;
