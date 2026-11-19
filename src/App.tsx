import { useState } from "react";
import { SetlistView } from "./components/SetlistView";
import { demoBand, demoSetlist, demoSong } from "./data/demo";
import { SongView } from "./components/SongView";

export default function App() {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  const songs = [demoSong];
  const selectedSong = songs.find((song) => song.id === selectedSongId);

  return (
    <main>
      {selectedSong ? (
        <SongView
          key={selectedSong.id}
          song={selectedSong}
          onBack={() => setSelectedSongId(null)}
        />
      ) : (
        <SetlistView
          band={demoBand}
          setlist={demoSetlist}
          songs={[demoSong]}
          onSelectSong={setSelectedSongId}
        />
      )}
    </main>
  );
}
