import type { Song } from "../types/song";

interface SongViewProps {
  song: Song;
  onBack: () => void;
}

export function SongView({ song, onBack }: SongViewProps) {
  return (
    <section>
      <h1>{song.title}</h1>
      <p>{song.artist}</p>
      <button onClick={onBack}>Volver al set</button>
    </section>
  );
}
