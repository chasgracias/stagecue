import { useEffect, useRef, useState } from "react";
import type { Song } from "../types/song";
import styles from "./SongView.module.css";

interface SongViewProps {
  song: Song;
  onBack: () => void;
}

export function SongView({ song, onBack }: SongViewProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [fontSize, setFontSize] = useState(28);

  const sectionHeadingRef = useRef<HTMLHeadingElement>(null);
  const currentSection = song.sections[currentSectionIndex];

  useEffect(() => {
    sectionHeadingRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  return (
    <section className={styles.song}>
      <header className={styles.header}>
        <h1 className={styles.title}>{song.title}</h1>
        <p className={styles.artist}>{song.artist}</p>
        <button className={styles.back} onClick={onBack}>
          Volver al set
        </button>
      </header>

      {currentSection ? (
        <>
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

          <div
            className={styles.textControls}
            role="group"
            aria-label="Tamaño de letra"
          >
            <button
              type="button"
              aria-label="Reducir tamaño de letra"
              disabled={fontSize <= 20}
              onClick={() => setFontSize((size) => Math.max(20, size - 2))}
            >
              A−
            </button>

            <span>{fontSize} px</span>

            <button
              type="button"
              aria-label="Aumentar tamaño de letra"
              disabled={fontSize >= 48}
              onClick={() => setFontSize((size) => Math.min(48, size + 2))}
            >
              A+
            </button>
          </div>

          <h2 ref={sectionHeadingRef} className={styles.sectionTitle}>
            {currentSection.name}
          </h2>

          <div className={styles.lyrics}>
            {currentSection.lines.length > 0 ? (
              currentSection.lines.map((line) => (
                <div key={line.id} className={styles.lyricLine}>
                  {line.cue && <p className={styles.cue}>{line.cue}</p>}
                  <p>{line.text}</p>
                </div>
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
