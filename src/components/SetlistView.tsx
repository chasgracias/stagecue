import type { Band } from '../types/band'
import type { Setlist } from '../types/setlist'
import type { Song } from '../types/song'

interface SetlistViewProps { 
  band: Band;
  setlist: Setlist;
  songs: Song[];
}

export function SetlistView({ band, setlist, songs }: SetlistViewProps) { 
  return (
    <section>
      <header>
        <h1>{band.name}</h1>
        <h2>{setlist.name}</h2>
        
        {setlist.date && (
          <p>
            <time dateTime={setlist.date}>{setlist.date}</time>
          </p>
        )}
      </header>

      <ol>
        {setlist.songIds.map((songId) => { 
          const song = songs.find(item => item.id === songId);
          
          return (
            <li key={songId}>
              {song ? (
                <>
                  <strong>{song.title}</strong>
                  {' - '}
                  <span>{song.artist}</span>
                </>
              ) : (
                <span>Canción no encontrada</span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  )
}