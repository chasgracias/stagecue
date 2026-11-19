import type { SongSection } from "./song-section";

export interface Song {
  id: string;
  bandId: string;
  title: string;
  artist: string;
  sections: SongSection[];
}
