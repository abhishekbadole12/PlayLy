import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("song");

    const { mediaPlayer, currentSong } = useContext(UserContext);

    // Store's
    const { getPlaylists } = usePlaylistStore();
    const { getSongs, getTrendingSongs, getPlaylistSongs, isLoading } = useSongStore()

    const [isAside, setIsAside] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (queryParams.get("id")) {
                    await getPlaylistSongs(queryParams.get("id"))
                } else if (queryParams.get("playlist") == 'trendings') {
                    await getTrendingSongs()
                } else if (queryParams.get("playlist") == "songs") {
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

    const memorizedAside = useMemo(() => isAside, [isAside]);

    return (
        <div className={styles.Dashboard}>
            <SideMenu isAside={memorizedAside} setIsAside={setIsAside} />

            <section className={styles.section}>
                <Header />

                {/* Only Admin Can access Upload */}
                {query === 'upload' ? <Upload /> :
                    <>
                        {isLoading ?
                            <div className={styles.loadingContainer}>
                                <DotLoader loading={isLoading} color="#552583" />
                            </div>
                            :
                            <div className={styles.mainContent}>
                            <Table />
                          </div>
                            
                            }

                        {mediaPlayer && (
                            <div className={styles.footer}>
                                <Footer currentSong={currentSong} />
                            </div>
                        )}                    </>
                }
            </section>
        </div >
    )
}

