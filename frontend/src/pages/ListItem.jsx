import React from "react"
import styles from '../css/right.module.css'
import { useContext } from "react"
import { selectSongContext } from "../home"
function ListItem({title, imgUrl, url, index}){

    const selectSong = useContext(selectSongContext);
    // console.log(setSelectSong);
    function getSong(url){
        const song = selectSong.current;
        song.src = url;
        song.play();
        console.log(index);
    }

    return <>
           <div className={styles.singleItem}>
                <button onClick={()=>getSong(url)}>
                    <div className={styles.songImg}>
                        <img src={imgUrl} alt={title}/>
                    </div>
                    <div className={styles.songTitle}>{title}</div>
                </button>
            </div>
        
    </>
}

export default ListItem