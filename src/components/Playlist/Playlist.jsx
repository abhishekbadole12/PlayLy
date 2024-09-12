import { useState, useEffect } from "react"
import styles from './Playlist.module.css'
import { CiGrid42 } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";
import { PiPlaylistBold } from "react-icons/pi";

export default function Playlist({ playlist = { _id: 0, title: '', songs: [] }, onPlaylistClick, onCancel, onUpdate, onDelete, isActive, isNew = false, isAside }) {
    const { _id, title, songs } = playlist;

    const [inputTitle, setInputTitle] = useState(title || "");
    const [isToggle, setIsToggle] = useState(false);
    const [isEdit, setIsEdit] = useState(!title);

    useEffect(() => {
        if (isActive && !title) {
            setIsEdit(true); // Enable edit mode for new playlists
        }
    }, [isActive, title]);

    // Handle Input Change
    const handleChange = (e) => {
        if (isEdit || isNew) setInputTitle(e.target.value)
    }

    // Handle Edit Click
    const handleEditClick = (e) => {
        e.stopPropagation()
        setIsEdit(true)
        setIsToggle(false)
    }

    const handleRemove = (e) => {
        e.stopPropagation();
        onDelete(_id);
        setIsToggle(false);
    }

    const handleSubmit = async (e) => {
        e.stopPropagation()
        const data = isNew ? inputTitle : { _id, inputTitle }
        try {
            await onUpdate(data);
            setIsEdit(false);
        } catch (error) {
            console.error("Failed to update playlist:", error.message);
        }
    }

    const handleClose = (e) => {
        e.stopPropagation()
        setIsEdit(false)
        setInputTitle(title);
        onCancel()
    }

    const handleClick = (e) => {
        if (!isNew || !isEdit) {
            e.stopPropagation();
            onPlaylistClick(playlist)
        }
    }

    const handleModalToggle = (e) => {
        e.stopPropagation();
        setIsToggle(prev => !prev)
    }

    const AsideSmallStyle = { marginLeft: 'auto', position: 'absolute', right: '1rem', }

    return (
        <li className={`${styles.asideItem} ${!!isActive ? styles.activeItem : ""}`} onClick={handleClick}>
            <PiPlaylistBold className={styles.playlistIcon} style={!isAside ? AsideSmallStyle : ''} />

            {isEdit ? (
                <input
                    type="text" placeholder="Enter playlist name" readOnly={!isEdit} name={inputTitle} value={isEdit ? inputTitle : playlist.title}
                    onChange={handleChange}
                    className={`${styles.inputField} ${isEdit ? styles.inputEdit : ''}`}
                />
            ) :
                <p className={styles.playlistTitle}>{inputTitle}</p>
            }

            {/*  Action Icon */}
            {isEdit ? (
                <div className={styles.iconActions}>
                    <FaCheck className={styles.iconCheck} onClick={handleSubmit} />
                    <RxCross2 className={styles.iconCross} onClick={handleClose} />
                </div>
            ) : (
                <div className={styles.iconActions}  >
                    {isAside && <SlOptionsVertical onClick={handleModalToggle} />}
                </div>
            )}

            {/* Modal - menu */}
            {isToggle && isAside && (
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
