import mongoose, { Document, Schema, Model} from "mongoose";

export interface ISong {
    title: string;
    artist: string;
    thumbnail: string;
}

export interface IPlaylist extends Document {
  songs: ISong[];
  user: string;
}
const songSchema = new Schema<ISong>({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    thumbnail: {type: String, required: true}
});
const playlistSchema = new Schema<IPlaylist>({
    songs: { type: [songSchema], required: true},
    user: {type: String, required: true}
})
const Playlist: Model<IPlaylist> = mongoose.models.Playlist || mongoose.model<IPlaylist>("Playlist", playlistSchema);
export default Playlist;