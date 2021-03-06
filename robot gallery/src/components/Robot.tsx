import React, {useContext} from 'react';
import { appContext, appSetStateContext } from '../AppState';
import styles from './Robot.module.css'
import {withAddToCart} from './AddToCart'

// Define Data Type like Java
// Typescript : type-safe has to be matched
export interface RobotProps
{
    name: string,
    id: number,
    email: string

    addToCart: (id,name) => void
}

// react functional component 
// props: binded as React.reactNode,
// after passing Interface Generics, props bineded to be RobotProps type
// {props} -> spreading
const Robot: React.FC<RobotProps> = ({name,id,email,addToCart}) =>
{
    
    const value = useContext(appContext);
    
    
    return (

        // appContext.Consumer
        <div className={styles.cardContainer}>
            <img alt="robot" src ={`https://robohash.org/${id}`}/>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>Author: {value.author}</p>
            <button  onClick={()=>addToCart(id,name)}> Add in ShoppingCart</button>
        </div>
    )

}

// hoc 处理过后的robot组件
export default withAddToCart(Robot);