export async function fetchConcerts(city: string) {
  const clientId = "NDEzNzIwNjl8MTc0NDYyNzc1OS44ODk0ODU2"; 
  const url = `https://api.seatgeek.com/2/events?venue.city=atlanta&venue.state=GA&client_id=${clientId}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch concerts");
  }

  const data = await res.json();
  return data.events;
}
