import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>

            <h5 className={styles.headerTitle}>Songs</h5>

            <div>
                <button>Login</button>

                <button>Register</button>
            </div>

        </header>
    )
}

export default Header;