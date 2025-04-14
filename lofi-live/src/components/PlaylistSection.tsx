'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Plus } from 'lucide-react';

type Props = {
  artists: string[];
};

const API_KEY = '0310e189ed11072b7f61d3791e51d4a5';

export default function PlaylistSection({ artists }: Props) {
  const isLoggedIn = true; // change later with real auth

  const [songs, setSongs] = useState<{ artist: string; title: string }[]>([]);
  const [artistTracks, setArtistTracks] = useState<Record<string, string[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

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
      const initialPlaylist: { artist: string; title: string }[] = [];

      for (const artist of artists) {
        const topSongs = await fetchTopSongs(artist);
        if (topSongs.length > 0) {
          trackMap[artist] = topSongs;
          initialPlaylist.push({ artist, title: topSongs[0] });
        }
      }

      setArtistTracks(trackMap);
      setSongs(initialPlaylist);
    }

    if (artists.length > 0) loadSongs();
  }, [artists]);

  const getNextSongIndex = (artist: string) =>
    songs.filter((s) => s.artist === artist).length;

  const handleAddSong = (artist: string) => {
    const index = getNextSongIndex(artist);
    const next = artistTracks[artist]?.[index];
    if (!next || songs.length >= 50) return;
    setSongs((prev) => [...prev, { artist, title: next }]);
    setJustAdded(artist);
    setTimeout(() => setJustAdded(null), 2000);
  };

  const handleDelete = (songToDelete: { artist: string; title: string }) => {
    setSongs((prev) => prev.filter((s) => s !== songToDelete));
  };

  return (
    <div className="relative mt-16">
      <h2 className="text-2xl font-bold text-black mb-4">Your Playlist</h2>

      {!isLoggedIn && (
        <div className="mb-4 text-sm text-purple-700 bg-purple-100 px-4 py-2 rounded">
          Sign in to customize your playlist!
        </div>
      )}

      <ul className="space-y-3">
        {songs.map((song, idx) => (
          <li
            key={`${song.artist}-${song.title}-${idx}`}
            className="flex justify-between items-center bg-white px-4 py-3 rounded shadow"
          >
            <span className="text-md text-black">
              <span className="font-semibold text-black">{song.title}</span> by{' '}
              <span className="text-gray-700">{song.artist}</span>
            </span>
            {isLoggedIn && (
              <button
                onClick={() => handleDelete(song)}
                className="text-red-500 text-lg font-bold"
              >
                &ndash;
              </button>
            )}
          </li>
        ))}
      </ul>

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

      {/* modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-xl bg-white p-6">
            <Dialog.Title className="text-lg font-bold text-black mb-4">
              Add Songs by Artist
            </Dialog.Title>
            <div className="space-y-2">
              {artists.map((artist) => (
                <button
                  key={artist}
                  disabled={
                    getNextSongIndex(artist) >= artistTracks[artist]?.length ||
                    songs.length >= 50
                  }
                  onClick={() => handleAddSong(artist)}
                  className="w-full text-left p-3 rounded bg-gray-100 text-gray-800 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add next top song from <span className="font-semibold">{artist}</span>
                </button>
              ))}
            </div>

            {/* notice for added song */}
            {justAdded && (
              <p className="text-sm text-green-600 font-medium mt-4">
                🎵 Added next song from <span className="font-semibold">{justAdded}</span>!
              </p>
            )}

            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
