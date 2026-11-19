import { useEffect, useRef, useState } from "react";
import type { Song } from "../types/song";
import styles from "./SongView.module.css";

interface SongViewProps {
  song: Song;
  onBack: () => void;
}

export function SongView({ song, onBack }: SongViewProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const sectionHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    sectionHeadingRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  const currentSection = song.sections[currentSectionIndex];

  return (
    <section className={styles.song}>
      <label className={styles.sectionPicker}>
        Sección
        <select
          value={currentSectionIndex}
          onChange={(event) => setCurrentSectionIndex(Number(event.target.value))}
        >
          {song.sections.map((section, index) => (
            <option key={section.id} value={index}>
              {section.name}
            </option>
          ))}
        </select>
      </label>

      <header className={styles.header}>
        <h1 className={styles.title}>{song.title}</h1>
        <p className={styles.artist}>{song.artist}</p>
        <button className={styles.back} onClick={onBack}>
          Volver al set
        </button>
      </header>

      {currentSection ? (
        <>
          <h2 ref={sectionHeadingRef} className={styles.sectionTitle}>
            {currentSection.name}
          </h2>

          <div className={styles.lyrics}>
            {currentSection.lines.length > 0 ? (
              currentSection.lines.map((line, index) => (
                <p key={`${currentSection.id}-${index}`}>{line}</p>
              ))
            ) : (
              <p className={styles.message}>Sección instrumental</p>
            )}
          </div>

          <nav className={styles.navigation} aria-label="Navegación entre secciones">
            <button
              type="button"
              className={styles.navButton}
              aria-label="Sección anterior"
              disabled={currentSectionIndex === 0}
              onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
            >
              ←
            </button>

            <span className={styles.counter}>
              {currentSectionIndex + 1} / {song.sections.length}
            </span>

            <button
              type="button"
              className={styles.navButton}
              aria-label="Sección siguiente"
              disabled={currentSectionIndex === song.sections.length - 1}
              onClick={() => setCurrentSectionIndex((index) => index + 1)}
            >
              →
            </button>
          </nav>
        </>
      ) : (
        <p>Esta canción todavía no tiene secciones</p>
      )}
    </section>
  );
}
