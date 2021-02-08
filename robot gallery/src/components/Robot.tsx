import React from 'react';
import styles from './Robot.module.css'

// Define Data Type like Java
// Typescript : type-safe has to be matched
interface RobotProps
{
    name: string,
    id: number,
    email: string
}

// react functional component 
// props: binded as React.reactNode,
// after passing Interface Generics, props bineded to be RobotProps type
// {props} -> spreading
const Robot: React.FC<RobotProps> = ({name,id,email}) =>
{

    // list type data
    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src ={`https://robohash.org/${id}`}/>
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    )

}

export default Robot;