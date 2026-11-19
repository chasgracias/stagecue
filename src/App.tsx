import { useState } from "react";
import { SetlistView } from "./components/SetlistView";
import { SongView } from "./components/SongView";
import { demoBands, demoSetlists, demoSongs } from "./data/demo";
import styles from "./App.module.css";

export default function App() {
  const [selectedBandId, setSelectedBandId] = useState<string | null>(
    demoBands[0]?.id ?? null,
  );
  const [selectedSetlistId, setSelectedSetlistId] = useState<string | null>(
    demoSetlists[0].id ?? null,
  );
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  const selectedBand = demoBands.find((band) => band.id === selectedBandId);
  const bandSetlists = demoSetlists.filter(
    (setlist) => setlist.bandId === selectedBandId,
  );
  const bandSongs = demoSongs.filter((song) => song.bandId === selectedBandId);
  const selectedSetlist = bandSetlists.find(
    (setlist) => setlist.id === selectedSetlistId,
  );
  const selectedSong = bandSongs.find(
    (song) => song.id === selectedSongId && selectedSetlist?.songIds.includes(song.id),
  );

  function handleBandChange(bandId: string) {
    const firstSetlist = demoSetlists.find((setlist) => setlist.bandId === bandId);

    setSelectedBandId(bandId);
    setSelectedSetlistId(firstSetlist?.id ?? null);
    setSelectedSongId(null);
  }

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
            Banda
            <select
              value={selectedBandId ?? ""}
              disabled={demoBands.length === 0}
              onChange={(event) => handleBandChange(event.target.value)}
            >
              {demoBands.length === 0 && (
                <option value="">Sin bandas disponibles</option>
              )}

              {demoBands.map((band) => (
                <option key={band.id} value={band.id}>
                  {band.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.setlistPicker}>
            Set
            <select
              value={selectedSetlistId ?? ""}
              disabled={bandSetlists.length === 0}
              onChange={(event) => {
                setSelectedSetlistId(event.target.value);
                setSelectedSongId(null);
              }}
            >
              {bandSetlists.length === 0 && (
                <option value="">Sin sets disponibles</option>
              )}

              {bandSetlists.map((setlist) => (
                <option key={setlist.id} value={setlist.id}>
                  {setlist.name}
                </option>
              ))}
            </select>
          </label>

          {!selectedBand ? (
            <p>No hay bandas disponibles.</p>
          ) : selectedSetlist ? (
            <SetlistView
              band={selectedBand}
              setlist={selectedSetlist}
              songs={bandSongs}
              onSelectSong={setSelectedSongId}
            />
          ) : (
            <p>Esta banda todavía no tiene sets.</p>
          )}
        </>
      )}
    </main>
  );
}
