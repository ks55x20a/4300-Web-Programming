import { NextResponse } from "next/server";
import Playlist from "@/models/PlaylistSchema"

import connectMongoDB from "../../../../config/mongodb";

export const POST = async (request: any) => {
    const {songs, user} = await request.json();

  console.log(songs, user);

  await connectMongoDB();
  const newPlaylist = {
    songs,
    user
  }
  try {
    await Playlist.create(newPlaylist);
  } catch (e: any) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }

  return new NextResponse("Playlist has been created", {
    status: 201,
  });

}
