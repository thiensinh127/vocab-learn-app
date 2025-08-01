import GamePage from "./GamePage";

export default function Page({ params }: { params: { gameType: string } }) {
  return <GamePage gameType={params.gameType} />;
}
