'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Plus } from 'lucide-react';
import  Image  from 'next/image';
import placeholder from './Placeholder-523345509.png'
import { Session } from 'next-auth';
import { doLogout } from '@/app/actions';

type Props = {
  artists: string[];
  session: Session | null;
};

const API_KEY = '0310e189ed11072b7f61d3791e51d4a5';


export default function PlaylistSection({ artists, session}: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user); 
  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session])

  const [songs, setSongs] = useState<{ artist: string; title: string; thumbnail: string;}[]>([]);
  const [formData, setFormData] = useState({
    title:"",
    artist:'',
    thumbnail:''
  })
  const [artistTracks, setArtistTracks] = useState<Record<string, string[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [songEdit, setSongEdit] = useState({ artist: "", title: "", thumbnail: "",})

  // fetch top 5 songs
  const fetchTopSongs = async (artist: string): Promise<string[]> => {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
          artist
        )}&api_key=${API_KEY}&format=json`
      );
      const data = await res.json();
      return data.toptracks?.track?.map((track: any) => track.name).slice(0, 5) || [];
    } catch (err) {
      console.error(`Error fetching songs for ${artist}`, err);
      return [];
    }
  };

  // auto display each artist's top song 
  useEffect(() => {
    async function loadSongs() {
      const trackMap: Record<string, string[]> = {};
      const initialPlaylist: { artist: string; title: string; thumbnail: string}[] = [];

      for (const artist of artists) {
        const topSongs = await fetchTopSongs(artist);
        if (topSongs.length > 0) {
          trackMap[artist] = topSongs;
          initialPlaylist.push({ artist, title: topSongs[0], thumbnail: "./Placeholder-523345509.png"});
        }
      }

      setArtistTracks(trackMap);
      setSongs(initialPlaylist);
    }

    if (artists.length > 0) loadSongs();
  }, [artists]);

  const getNextSongIndex = (artist: string) =>
    songs.filter((s) => s.artist === artist).length;

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    const artist = formData.artist;
    const title = formData.title;
    const thumbnail = formData.thumbnail;
    //const index = getNextSongIndex(artist);
    //const next = artistTracks[artist]?.[index];
    //if (!next || songs.length >= 50) return;
    setSongs((prev) => [...prev, { artist, title, thumbnail }]);
    //setJustAdded(artist);
    //setTimeout(() => setJustAdded(null), 2000);
    setIsModalOpen(false);
  };

  const handleAddSong2 = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Song added:", formData)
    setIsModalOpen(false);
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (songToDelete: { artist: string; title: string;}) => {
    setSongs((prev) => prev.filter((s) => s !== songToDelete));
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDelete(songEdit);
    handleAddSong(e);
    setIsModal2Open(false);
  }

  return (
    <div className="relative mt-16">
      <h2 className="text-2xl font-bold text-black mb-4">Your Playlist</h2>

      {!isLoggedIn && (
        <div className="mb-4 text-sm text-purple-700 bg-purple-100 px-4 py-2 rounded">
          
          Sign in to customize your playlist!
        </div>
      )}
      {isLoggedIn && (
      <ul className="space-y-3">
        {songs.map((song, idx) => (
          <li
            key={`${song.artist}-${song.title}-${idx}`}
            className="flex justify-between items-center bg-white px-4 py-3 rounded shadow"
          >
            <span className="text-md text-black">
              <span className="font-semibold text-black">{song.title}</span> by{' '}
              <span className="text-gray-700">{song.artist}</span>
              <Image src={placeholder} alt='image can not load'/>
              
            </span>
            {isLoggedIn && (
              <button
                onClick={() => handleDelete(song)}
                className="text-red-500 text-lg font-bold"
              >
                &ndash;
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  setSongEdit(song)
                  setIsModal2Open(true)}}
                className="text-blue-500 text-lg font-bold"
              >
                &ndash;
              </button>
            )}
          </li>
        ))}
      </ul>
      )}
      {/* save playlist button */}
      <div className="mt-10 mb-20 text-right">
        <button
          disabled={!isLoggedIn}
          className={`px-6 py-2 rounded ${
            isLoggedIn
              ? 'bg-black text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Playlist (coming soon)
        </button>
      </div>

      {/* floating add button */}
      {isLoggedIn && (
        <button
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
        </button>
      )}
      {/* modal for adding song*/}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-xl bg-white p-6">
            <Dialog.Title className="text-lg font-bold text-black mb-4">
              Add Songs by Artist
            </Dialog.Title>
            <form onSubmit={handleAddSong}>
              <input
                type="text"
                name="title"
                placeholder="Song title"
                defaultValue={songEdit.title}
                value={formData.title}
                onChange={handleFormChange}
                className="w-full p-3 rounded border border-gray-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="artist"
                placeholder="Artist"
                defaultValue={songEdit.artist}
                value={formData.artist}
                onChange={handleFormChange}
                className="w-full p-3 rounded border border-gray-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail"
                defaultValue={songEdit.thumbnail}
                value={formData.thumbnail}
                onChange={handleFormChange}
                className="w-full p-3 rounded border border-gray-300 shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Add song
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* modal for editing song*/}
      <Dialog open={isModal2Open} onClose={() => setIsModal2Open(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-xl bg-white p-6">
            <Dialog.Title className="text-lg font-bold text-black mb-4">
              Add Songs by Artist
            </Dialog.Title>
            <form onSubmit={handleEdit}>
              <input
                type="text"
                name="title"
                placeholder="Song title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full p-3 rounded border border-gray-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="artist"
                placeholder="Artist"
                value={formData.artist}
                onChange={handleFormChange}
                className="w-full p-3 rounded border border-gray-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail"
                value={formData.thumbnail}
                onChange={handleFormChange}
                className="w-full p-3 rounded border border-gray-300 shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Add song
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
