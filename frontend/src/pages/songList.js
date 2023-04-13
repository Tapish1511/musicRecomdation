import React from "react";
import styles from '../css/right.module.css'
import ListItem from "./ListItem";
function RighDivContent({expr, data, status}){

    // if(data === null || data === undefined) return <></>

    
    return (
        <div className={styles.rightDivContainer}>
            {expr && <>
                <div className={styles.rightHeading}>
                    <h3>{expr}</h3>
                </div>
                <div className={styles.Items}>
            {data.map((item, index)=>{
                
                return(
                    <ListItem 
                    title={item.title}
                    imgUrl={item.thumbnail}
                    url={item.url}
                    key={item._id}
                    index={index}
                    />
                );   
                })}
            </div>
            </>
            
            }
           
            
        </div>
    );
    
}




export default RighDivContent;