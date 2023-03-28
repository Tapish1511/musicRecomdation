import React from "react";
import styles from "../css/main.module.css"

function FeatureList({detections, exp, age, gen}){

    
    if(detections === undefined){
        return <div>
            face not detected
        </div>
    }
    else if(detections === null) return <></>

   
    
    return(
        <ul className={styles.itemList}>
            <li className={styles.item}>
                <span>feature</span> <span>values</span>
            </li>

            <li className={styles.item}>
                <span>expression</span> <span>{exp}</span>
            </li>

            <li className={styles.item}>
                <span>gender</span> <span>{gen}</span>
            </li>

            <li className={styles.item}>
                <span>age</span> <span>{age}</span>
            </li>
            
        </ul>
    );
}

export default FeatureList;