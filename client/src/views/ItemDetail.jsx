import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../context/DataContext';

const ItemDetail = () => {

    const id = useParams();
    const { data, shoppingCart, setShoppingCart } = useContext(DataContext);
    const product = data.find(ele => ele.id === Number(id.id))

    const toSCAdd = {
        id: product.id,
        url: product.url,
        title: product.title,
        description: product.description,
        price: product.price,
        qty: 1
    }

    const addSC = (event) => {
        event.stopPropagation();
        const isExist = shoppingCart.find((ele) => ele.id === product.id);
        if (isExist) {
            const products = shoppingCart.map(ele => ele.id === product.id ? { ...ele, qty: ele.qty + 1 } : ele);
            setShoppingCart([...products]);
        } else {
            setShoppingCart([...shoppingCart, toSCAdd]);
        }
    }

    return (
        <div className='itemDetail'>
            <img className='itemDetail-img' src={product.url} alt="" />
            <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <button className='itemDetail-button' onClick={addSC}>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemDetail