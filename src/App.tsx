import { useState } from "react";
import { SetlistView } from "./components/SetlistView";
import { SongView } from "./components/SongView";
import { demoBand, demoSetlists, demoSong } from "./data/demo";
import styles from "./App.module.css";

export default function App() {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [selectedSetlistId, setSelectedSetlistId] = useState<string | null>(
    demoSetlists[0].id ?? null,
  );

  const songs = [demoSong];

  const selectedSetlist = demoSetlists.find(
    (setlist) => setlist.id === selectedSetlistId,
  );
  const selectedSong = songs.find(
    (song) =>
      song.id === selectedSongId &&
      song.bandId === selectedSetlist?.bandId &&
      selectedSetlist?.songIds.includes(song.id),
  );

  return (
    <main>
      {selectedSong ? (
        <SongView
          key={selectedSong.id}
          song={selectedSong}
          onBack={() => setSelectedSongId(null)}
        />
      ) : (
        <>
          <label className={styles.setlistPicker}>
            Set
            <select
              value={selectedSetlistId ?? ""}
              disabled={demoSetlists.length === 0}
              onChange={(event) => {
                setSelectedSetlistId(event.target.value);
                setSelectedSongId(null);
              }}
            >
              {demoSetlists.length === 0 && (
                <option value="">Sin sets disponibles</option>
              )}

              {demoSetlists.map((setlist) => (
                <option key={setlist.id} value={setlist.id}>
                  {setlist.name}
                </option>
              ))}
            </select>
          </label>

          {selectedSetlist ? (
            <SetlistView
              band={demoBand}
              setlist={selectedSetlist}
              songs={songs}
              onSelectSong={setSelectedSongId}
            />
          ) : (
            <p>No hay un set seleccionado.</p>
          )}
        </>
      )}
    </main>
  );
}
