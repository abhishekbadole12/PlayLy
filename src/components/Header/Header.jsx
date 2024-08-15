import { Link } from "react-router-dom";
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>

            <h5 className={styles.headerTitle}>Songs</h5>

            <div>
                <Link to="/signin">
                    <button>Login</button>
                </Link>

                <Link to="/signup">
                    <button>Register</button>
                </Link>
            </div>

        </header>
    )
}

export default Header;