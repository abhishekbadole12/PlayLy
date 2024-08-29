import { useState, useEffect } from "react"
import styles from './Playlist.module.css'
import { CiGrid42 } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";

export default function Playlist({ playlist = { _id: 0, title: '', songs: [] }, onPlaylistClick, onCancel, onUpdate, onDelete, isActive, isNew = false }) {
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
        if (isEdit || isNew) setName(e.target.value)
    }

    // Handle Edit Click
    const handleEditClick = (e) => {
        e.stopPropagation()
        setIsEdit(true)
        setIsToggle(false)
    }

    const handleRemove = () => {
        onDelete(_id)
    }

    const handleSubmit = (e) => {
        e.stopPropagation()
        onUpdate(name)
    }

    const handleClose = (e) => {
        e.stopPropagation()
        onCancel()
    }

    const handleClick = (e) => {
        if (!isNew || !isEdit) {
            e.stopPropagation();
            onPlaylistClick(title)
        }
    }

    const handleInputClick = (e) => {
        if (!isNew || !isEdit) {
            e.stopPropagation();
        }
    };

    const handleModalToggle = (e) => {
        e.stopPropagation();
        setIsToggle(prev => !prev)
    }

    return (
        <li className={`${styles.asideItem} ${!!isActive ? styles.activeItem : ""}`} onClick={handleClick}>
            <CiGrid42 />

            <input
                type="text" placeholder="Enter playlist name" readOnly={!isEdit} name={name} value={name}
                onChange={handleChange} onClick={handleInputClick}
                className={`${styles.inputField} ${isEdit ? styles.inputEdit : styles.inputReadOnly}`}
            />

            {/*  Action Icon */}
            {isEdit ? (
                <div className={styles.iconActions}>
                    <FaCheck className={styles.iconCheck} onClick={handleSubmit} />
                    <RxCross2 className={styles.iconCross} onClick={handleClose} />
                </div>
            ) : (
                <div className={styles.iconActions}  >
                    <SlOptionsVertical size={12} onClick={handleModalToggle} />
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
