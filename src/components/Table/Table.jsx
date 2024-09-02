import { useContext, useEffect, useMemo } from "react";
import styles from "./Table.module.css"
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { UserContext } from "../../App"

import useSongStore from "../../store/songStore";
import usePlaylistStore from "../../store/playlistStore";
import { showErrorToast, showToast } from "../../utils/showToast";

export default function Table({ isPlaying, setIsPlaying }) {

    const { currentSong, setCurrentSong, activePlaylist } = useContext(UserContext);

    const { songs } = useSongStore();

    const { addRemoveSong } = usePlaylistStore();
    // Memoize playlist songs to avoid recalculating on every render
    const playlistSongs = useMemo(() => {       
        return activePlaylist?.songs || [];
    }, [activePlaylist]);
    // handle table play button
    const handlePlayIcon = (id) => {
        const addSong = songs.length > 0 && songs.find((song) => song._id === id)
        setIsPlaying(prev => currentSong && currentSong._id === id ? !prev : true)
        setCurrentSong(addSong)
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



    console.log(activePlaylist);
    

    return (
        <table className={styles.table}>
            <TableHead />

            <tbody className={styles.tbody}>
                {songs.length ?
                    songs.map((song) => {
                        const inPlaylist = playlistSongs?.includes(song._id);
                        return (
                            <TableRow key={song._id}
                                song={song}
                                isPlaying={isPlaying}
                                currentSong={currentSong}
                                onPlay={handlePlayIcon}
                                onAddToPlaylist={handleAddToPlaylist}
                                inPlaylist={inPlaylist}
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
