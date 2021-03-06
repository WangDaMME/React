import React, {useContext} from 'react';
import { appContext, appSetStateContext } from '../AppState';
import styles from './Robot.module.css'

// import {withAddToCart} from './AddToCart'   // 对比 hoc  自定义hook 也能达到一样功能 
import {useAddToCart} from './AddToCart'

// Define Data Type like Java
// Typescript : type-safe has to be matched
export interface RobotProps
{
    name: string,
    id: number,
    email: string
    //addToCart: (id,name) => void
}




// react functional component 
// props: binded as React.reactNode,
// after passing Interface Generics, props bineded to be RobotProps type
// {props} -> spreading

const RobotDiscount: React.FC<RobotProps> = ({name,id,email}) =>
{
    
    const value = useContext(appContext);

    const addToCart = useAddToCart();
 
    return (

        // appContext.Consumer
        <div className={styles.cardContainer}>
            <img alt="robot" src ={`https://robohash.org/${id}`}/>
            <h2>On sale</h2>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>Author: {value.author}</p>
            <button  onClick={()=>addToCart(id,name)}> Add in ShoppingCart</button>
        </div>
    )

}

// export default withAddToCart(RobotDiscount);
export default RobotDiscount;