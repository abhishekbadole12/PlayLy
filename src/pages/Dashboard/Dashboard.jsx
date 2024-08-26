import { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.css"
import { UserContext } from "../../App";

// components
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Upload from "../../components/Upload/Upload";
import usePlaylistStore from "../../store/playlistStore";
import { useNavigate } from "react-router-dom";
import useSongStore from "../../store/songStore";

export default function Dashboard() {
    const navigation = useNavigate()

    // Store's
    const { getPlaylists } = usePlaylistStore()
    const { getSongs } = useSongStore()

    const { currentSong, setCurrentSong } = useContext(UserContext)


    const [isPlaying, setIsPlaying] = useState(false);

    // const [songs, setSongs] = useState([]) // Songs List


    const handlePrev = () => {
        // Handle previous
    }

    const handleNext = () => {
        // Handle next
    }

    // Handle Create New Playlist
    const handleCreatePlaylist = async (data) => {

    }

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                await getSongs();
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

                {/* <Upload /> */}

                <Table
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />

                <Footer
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentSong={currentSong}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />

            </section>
        </div >
    )
}

