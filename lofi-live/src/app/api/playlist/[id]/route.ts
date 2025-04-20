import Playlist from "@/models/PlaylistSchema";
import connectMongoDB from "../../../../../config/mongodb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params:{id: string}}) => {
    const {id} = await params;
    await connectMongoDB();
    const playlists = await Playlist.find({user: id});
    return NextResponse.json({playlists}, {status: 200});
  }