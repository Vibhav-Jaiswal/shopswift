import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {addToCart , decrementItemQuantity, removeItemFromCart, calculatePrice} from '../redux/reducer'

const Cart = () => {
  const { cartItems, subTotal, tax, shipping, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increment =(id) => {
    dispatch(addToCart({id}))
    dispatch(calculatePrice())
  }

  const decrement =(id) => {
    dispatch(decrementItemQuantity(id))
    dispatch(calculatePrice())
  }

  const deletehandler =(id) => {
    dispatch(removeItemFromCart(id))
    dispatch(calculatePrice())
  }

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
            key={i.id}
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              id={i.id}
              decrement={decrement}
              increment={increment}
              deletehandler={deletehandler}
            />
          ))
        ) : (
          <h1>No Item Yet</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal: ₹{subTotal}</h2>
        <h2>Shipping: ₹{shipping}</h2>
        <h2>Tax: ₹{tax}</h2>
        <h2>Toatl: ₹{total}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deletehandler,
  id,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt="Item" />
    <article>
      <h3>{name}</h3>
      <p>{price}</p>
    </article>

    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>

    <AiFillDelete onClick={() => deletehandler(id)} />
  </div>
);

export default Cart;
