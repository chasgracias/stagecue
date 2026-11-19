import { useState } from "react";
import type { Song } from "../types/song";

interface SongViewProps {
  song: Song;
  onBack: () => void;
}

export function SongView({ song, onBack }: SongViewProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const currentSection = song.sections[currentSectionIndex];

  return (
    <section>
      <header>
        <h1>{song.title}</h1>
        <p>{song.artist}</p>
        <button onClick={onBack}>Volver al set</button>
      </header>

      {currentSection ? (
        <>
          <h2>{currentSection.name}</h2>

          {currentSection.lines.length > 0 ? (
            currentSection.lines.map((line, index) => (
              <p key={`${currentSection.id}-${index}`}>{line}</p>
            ))
          ) : (
            <p>Sección instrumental</p>
          )}

          <nav aria-label="Navegación entre secciones">
            <button
              type="button"
              disabled={currentSectionIndex === 0}
              onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
            >
              Anterior
            </button>

            <span>
              {currentSectionIndex + 1} / {song.sections.length}
            </span>

            <button
              type="button"
              disabled={currentSectionIndex === song.sections.length - 1}
              onClick={() => setCurrentSectionIndex((index) => index + 1)}
            >
              Siguiente
            </button>
          </nav>
        </>
      ) : (
        <p>Esta canción todavía no tiene secciones</p>
      )}
    </section>
  );
}
