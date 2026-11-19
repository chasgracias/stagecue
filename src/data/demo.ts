import type { Band } from '../types/band';
import type { Setlist } from '../types/setlist';
import type { Song } from '../types/song';

export const demoBand: Band = {
  id: 'uxiono',
  name: 'Uxiono',
}

export const demoSong: Song = {
  id: 'demo-song-1',
  bandId: 'uxiono',
  title: 'You Give Love a Bad Name',
  artist: 'Bon Jovi',
}

export const demoSetlist: Setlist = {
  id: 'demo-setlist-1',
  bandId: 'uxiono',
  name: 'Demo Setlist',
  date: '2027-06-01',
  songIds: ['demo-song-1'],
}