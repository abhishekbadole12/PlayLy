import { Link, useParams } from "react-router-dom";
import styles from "./Header.module.css"

function Header() {
    const params = useParams()

    return (
        <header className={styles.header}>

            <h5 className={styles.headerTitle}>{params.playlistName}</h5>

            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>

                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>

        </header>
    )
}

export default Header;