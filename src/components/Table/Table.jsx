import { useContext } from "react";
import styles from "./Table.module.css"
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { UserContext } from "../../App"

import useSongStore from "../../store/songStore";
import usePlaylistStore from "../../store/playlistStore";
import { showErrorToast, showToast } from "../../utils/showToast";

export default function Table() {

    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setMediaPlayer } = useContext(UserContext);

    const { songs } = useSongStore();

    const { addRemoveSong } = usePlaylistStore();

    // handle table play button
    const handlePlayIcon = (s) => {
        const addSong = songs.length > 0 && songs.find((song) => song._id === s._id);
        setIsPlaying(prev => currentSong && currentSong._id === s._id ? !prev : true);
        setCurrentSong(addSong);
        setMediaPlayer(true);
    };

    // Add Song To Playlist
    const handleAddToPlaylist = async (p_id, s_id) => {
        try {
            const response = await addRemoveSong(p_id, s_id);
            if (response) {
                showToast(response.message)
            }
        } catch (error) {
            showErrorToast(error.message)
        }
    }

    return (
        <table className={styles.table}>
            <TableHead />

            <tbody className={styles.tbody}>
                {songs.length ?
                    songs.map((song) => {
                        return (
                            <TableRow key={song._id}
                                song={song}
                                isPlaying={isPlaying}
                                currentSong={currentSong}
                                onPlay={handlePlayIcon}
                                onAddToPlaylist={handleAddToPlaylist}
                                inPlaylist={""} // when song is in paylist (boolean)
                            />
                        )
                    }) :
                    <tr>
                        <td style={{ textAlign: 'center' }}>No data available</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
