import { getParticipants } from "@/api/participant";
import { Roulette } from "./components/Roulette";

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-2">ルーレット</h1>
      <Roulette
        participants={getParticipants()}
        onAnimationEnd={(name: string) => {
          alert(`${name}です！`);
        }}
      />
    </div>
  );
}

export default Home;
