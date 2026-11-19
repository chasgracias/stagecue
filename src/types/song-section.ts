import type { LyricLine } from "./lyric-line";

export interface SongSection {
  id: string;
  name: string;
  lines: LyricLine[];
}
