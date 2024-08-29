import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Dashboard.module.css"
import { UserContext } from "../../App";
import { DotLoader } from "react-spinners";

// components
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Upload from "../../components/Upload/Upload";

// Store's
import usePlaylistStore from "../../store/playlistStore";
import useSongStore from "../../store/songStore";


export default function Dashboard() {
    const navigation = useNavigate();
    const params = useParams();

    // Store's
    const { getPlaylists } = usePlaylistStore()
    const { getSongs, getTrendingSongs } = useSongStore()

    const { mediaPlayer } = useContext(UserContext);

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePrev = () => {
        // Handle previous
    }

    const handleNext = () => {
        // Handle next
    }

    // Handle Create New Playlist
    const handleCreatePlaylist = async (data) => {
        // Create logic
    }

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (params.playlistName == 'trendings') {
                    await getTrendingSongs()
                } else {
                    await getSongs();
                }
            } catch (error) {
                if (error.message === 'Invalid token') {
                    navigation('/login')
                }
                console.log(error.message);
            }
        }

        const fetchPlaylists = async () => {
            try {
                await getPlaylists();
            }
            catch (error) {
                if (error.message === 'Invalid token') {
                    navigation('/login')
                }
                console.log(error.message);
            }
        }

        // Promise.all 
        const fetchData = async () => {
            await Promise.all([fetchPlaylists(), fetchSongs()]);
        }

        fetchData();
    }, [])

    return (
        <div className={styles.Dashboard}>

            <SideMenu
                onCreate={handleCreatePlaylist}
            />

            <section>
                <Header />

                {/* Only Admin Can access Upload */}
                {params.playlistName === 'upload' ?

                    <Upload />

                    : <>

                        {/* <div className={styles.loadingContainer}>
                            <DotLoader loading={isLoading} color="#552583" />
                        </div> */}

                        <Table
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                        />

                        {mediaPlayer && (
                            <Footer
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                currentSong={currentSong}
                                handlePrev={handlePrev}
                                handleNext={handleNext}
                            />
                        )}
                    </>
                }
            </section>
        </div >
    )
}

