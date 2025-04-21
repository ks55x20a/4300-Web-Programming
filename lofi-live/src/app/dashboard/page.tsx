'use client';

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image"

interface Song {
  title: string;
  artist: string;
  thumbnail: string;
}

interface Playlist {
  songs: Song[];
  user: String;
}


const session = await getSession();
// will update this once database is set up
export default function SavedPlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (!!session?.user) {
      const fetchPlaylists = async () => {
        try {
          const response = await fetch(`/api/playlist/${session?.user?.email}`);
          const data = await response.json();
          setPlaylists(data.playlists)
          
          console.log("Playlists: ", data)
        } catch (error){
          console.log("Error in showing playlists", error);
        }
      }
      
      fetchPlaylists();
    }
  }, [session])
  
  
  const deletePlaylist = async (playlist: Playlist) => {

  }


  const placeholder = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wagbet.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fmusic_placeholder.png&f=1&nofb=1&ipt=ebe0015c3e32cf5949aebea723622c39c27178198addd82dae9f4b9cbc7a63ba'

  
  return (
    <div className="min-h-screen pl-[100px] py-10 px-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-black">
      <h1 className="text-3xl font-bold mb-6">Saved Playlists</h1>
        {playlists.map((playlist, index) => (
          <div className="bg-white rounded-xl p-6 shadow max-w-2xl" key={`${index}`}>
            <h2 className="text-2xl font-bold mb-6">*Insert playlist name here, figure out later*</h2>
            <ul className="space-y-3" key={`${index}`}>
              {playlist.songs.map((song, idx) => (
                <li
                  key={`${song.artist}-${song.title}-${idx}`}
                  className="flex justify-between items-center bg-white px-4 py-3 rounded shadow"
                >
                  <span className="text-md text-black">
                    <span className="font-semibold text-black">{song.title}</span> by{' '}
                    <span className="text-gray-700">{song.artist}</span>
                    <Image src={
                      song.thumbnail && (song.thumbnail.startsWith('http://') || song.thumbnail.startsWith('https://'))
                      ? song.thumbnail
                      : placeholder
                    } width={100} height={100} alt='image can not load' onError={(e) => {const target = e.target as HTMLImageElement; target.src = placeholder}}/>
                    <a href={`https://open.spotify.com/search/artist%3A${song.artist.replace(/\s+/g,'%20')}%20track%3A${song.title.replace(/\s+/g,'%20')}`} target="_blank">Spotify Link</a>
                  </span>
                </li>
              ))}
            </ul>
            <button onClick={() => deletePlaylist(playlist)}>Click here to delete playlist.</button>
          </div>
        ))}
      </div>
  );
}