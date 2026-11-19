import type { Band } from "../types/band";
import type { Setlist } from "../types/setlist";
import type { Song } from "../types/song";
import styles from "./SetlistView.module.css";

interface SetlistViewProps {
  band: Band;
  setlist: Setlist;
  songs: Song[];
  onSelectSong: (songId: string) => void;
}

export function SetlistView({ band, setlist, songs, onSelectSong }: SetlistViewProps) {
  return (
    <section className={styles.setlist}>
      <header className={styles.header}>
        <h1 className={styles.bandName}>{band.name}</h1>
        <h2 className={styles.setlistName}>{setlist.name}</h2>

        {setlist.date && (
          <p className={styles.date}>
            <time dateTime={setlist.date}>{setlist.date}</time>
          </p>
        )}
      </header>

      <ol className={styles.songList}>
        {setlist.songIds.map((songId) => {
          const song = songs.find((item) => item.id === songId);

          return (
            <li key={songId}>
              {song ? (
                <>
                  <button
                    type="button"
                    className={styles.songButton}
                    onClick={() => onSelectSong(song.id)}
                  >
                    <strong className={styles.songTitle}>{song.title}</strong>
                    {" - "}
                    <span className={styles.songArtist}>{song.artist}</span>
                  </button>
                </>
              ) : (
                <span className={styles.missing}>Canción no encontrada</span>
              )}
            </li>
          );
        })}
      </ol>

      {setlist.songIds.length === 0 && <p>Este set todavía no tiene canciones.</p>}
    </section>
  );
}
