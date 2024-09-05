import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Header.module.css"
import { TbUserSquareRounded } from "react-icons/tb";
import useAuthStore from "../../store/authStore";

function Header() {
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("playlist");

    const { isAuthenticated, username } = useAuthStore()

    return (
        <header className={styles.header}>

            <h5 className={styles.headerTitle}>{query?.replace(/-/g, ' ')}</h5>

            {isAuthenticated() ? (
                <div className={styles.userProfile}>
                    <TbUserSquareRounded />
                    <span>Hi, {username ? username : 'Buddy'}</span>
                </div>
            ) : (
                <nav>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </nav>
            )}

        </header>
    )
}

export default Header;