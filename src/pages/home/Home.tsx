import type { Participant } from "@/types/participants";
import { Roulette } from "./components/Roulette";

const participants: Participant[] = [
  "Taro",
  "Jiro",
  "Saburo",
  "Shiro",
  "Goro",
  "Rokuro",
].map((person, i) => ({
  id: i.toString(),
  name: person,
}));

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-2">ルーレット</h1>
      <Roulette
        participants={participants}
        onAnimationEnd={(name: string) => {
          alert(`${name}です！`);
        }}
      />
    </div>
  );
}

export default Home;
