'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import PlaylistSection from "@/components/PlaylistSection";

// concert type 
type Concert = {
  id: number;
  title: string;
  datetime_local: string;
  url: string;
  venue: {
    name: string;
  };
  performers: {
    name: string;
    image: string;
  }[];
};

// fetch concerts by city and state
async function fetchConcerts(city: string, state: string): Promise<Concert[]> {
  const clientId = "NDEzNzIwNjl8MTc0NDYyNzc1OS44ODk0ODU2"; 
  const url = `https://api.seatgeek.com/2/events?venue.city=${city}&venue.state=${state}&type=concert&client_id=${clientId}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch concerts");

  const data = await res.json();
  return data.events;
}

export default function ConcertsPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // form
  const [city, setCity] = useState("Atlanta");
  const [stateCode, setStateCode] = useState("GA");

  useEffect(() => {
    fetchConcerts(city, stateCode)
      .then(setConcerts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // only use headliners
  useEffect(() => {
    const names = Array.from(
      new Set(
        concerts.map((concert) => concert.performers?.[0]?.name).filter(Boolean)
      )
    ).slice(0, 10);
    setArtistNames(names);
  }, [concerts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await fetchConcerts(city, stateCode);
      setConcerts(results);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 pl-[100px] bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Upcoming Shows in {city}, {stateCode}
      </h1>

      {/* search bar */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-black w-48"
        />
        <input
          type="text"
          placeholder="State (e.g. GA)"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value.toUpperCase())}
          maxLength={2}
          className="p-3 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-black w-32"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      {/* concert results */}
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : concerts.length === 0 ? (
        <p className="text-gray-700">No concerts found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {concerts.map((concert) => (
            <div
              key={concert.id}
              className="p-4 border rounded-xl shadow bg-white text-black space-y-2"
            >
              {concert.performers?.[0]?.image && (
                <Image
                  src={concert.performers[0].image}
                  alt={concert.title}
                  width={400}
                  height={250}
                  className="rounded"
                />
              )}
              <h2 className="text-lg font-semibold">{concert.title}</h2>
              <p className="text-sm text-gray-700">
                {concert.venue.name} — {new Date(concert.datetime_local).toLocaleString()}
              </p>
              <a
                href={concert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View on SeatGeek
              </a>
            </div>
          ))}
        </div>
      )}

      {/* playlist section */}
      <div className="mt-16">
        <PlaylistSection artists={artistNames} />
      </div>
    </div>
  );
}
