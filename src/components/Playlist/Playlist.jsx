import { useState, useEffect } from "react"
import styles from './Playlist.module.css'
import { CiGrid42 } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";

export default function Playlist({ playlist, onclick, onUpdate, onCancel, onActive, isActive }) {
    const { _id, title, songs } = playlist;

    const [name, setName] = useState(title || "");
    const [isToggle, setIsToggle] = useState(false);
    const [isEdit, setIsEdit] = useState(!title);

    useEffect(() => {
        if (isActive && !title) {
            setIsEdit(true); // Enable edit mode for new playlists
        }
    }, [isActive, title]);

    // Handle Input Change
    const handleChange = (e) => {
        if (isEdit) setName(e.target.value)
    }

    // Handle Edit Click
    const handleEditClick = () => {
        setIsEdit(true)
        setIsToggle(false)
    }

    const handleRemove = () => {
        // remove logic
    }

    return (
        <li className={styles.asideItem} onClick={() => onclick(title)}>
            <CiGrid42 />

            <input
                type="text" placeholder="Enter playlist name" readOnly={!isEdit} name={name} value={name}
                onChange={handleChange}
                className={`${styles.inputField} ${isEdit ? styles.inputEdit : styles.inputReadOnly}`}
            />

            {/*  Action Icon */}
            {isEdit ? (
                <div className={styles.iconActions}>
                    <FaCheck className={styles.iconCheck} onClick={onUpdate} />
                    <RxCross2 className={styles.iconCross} onClick={onCancel} />
                </div>
            ) : (
                <div className={styles.iconActions}  >
                    <SlOptionsVertical size={12} onClick={() => setIsToggle(prev => !prev)} />
                </div>
            )}

            {/* Modal - menu */}
            {isToggle && (
                <div className={styles.dropdown}>
                    <ul>
                        <li className={styles.dropdownItem} onClick={handleEditClick}>Edit</li>
                        <li className={styles.dropdownItem} onClick={handleRemove}>Delete</li>
                    </ul>
                </div>
            )}
        </li>
    )
}
