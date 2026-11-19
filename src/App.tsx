import { SetlistView } from "./components/SetlistView";
import { demoBand, demoSetlist, demoSong } from "./data/demo";

export default function App() {
  return (
    <main>
      <SetlistView band={demoBand} setlist={demoSetlist} songs={[demoSong]} />
    </main>
  );
}
