import type { Band } from "../types/band";
import type { Setlist } from "../types/setlist";
import type { Song } from "../types/song";

export const demoBand: Band = {
  id: "uxiono",
  name: "Uxiono",
};

export const demoSong: Song = {
  id: "demo-song-1",
  bandId: "uxiono",
  title: "You Give Love a Bad Name",
  artist: "Bon Jovi",
  sections: [
    {
      id: "verse-1",
      name: "Verse 1",
      lines: [
        {
          id: "line-1",
          text: "Shot through the heart, and you're to blame",
          cue: "Sostén el final",
        },
        {
          id: "line-2",
          text: "Darlin', you give love a bad name",
        },
      ],
    },
    {
      id: "chorus-1",
      name: "Chorus 1",
      lines: [
        {
          id: "line-3",
          text: "You give love a bad name",
        },
        {
          id: "line-4",
          text: "You give love a bad name",
        },
      ],
    },
    {
      id: "instrumental-break-1",
      name: "Instrumental Break 1",
      lines: [],
    },
  ],
};

export const demoSetlists: Setlist[] = [
  {
    id: "demo-setlist-1",
    bandId: "uxiono",
    name: "Presentación septiembre",
    date: "2026-09-26",
    songIds: ["demo-song-1"],
  },
  {
    id: "demo-setlist-2",
    bandId: "uxiono",
    name: "Presentación diciembre",
    date: "2026-12-19",
    songIds: ["demo-song-1"],
  },
];
