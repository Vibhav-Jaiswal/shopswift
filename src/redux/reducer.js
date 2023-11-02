import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  subTotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => {
       const item = action.payload;
       const isItemExit = state.cartItems.find(i => i.id === item.id);

       if(isItemExit){
         state.cartItems.forEach((i) => {
          if(i.id === item.id) 
           i.quantity += 1;
         })
       }else{
        state.cartItems.push(item);
       }
    },
    
    decrementItemQuantity:(state,action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if(item && item.quantity > 1){
        state.cartItems.forEach((i) => {
          if(i.id === item.id)
            i.quantity -= 1;
        })
      }
    },

    removeItemFromCart : (state,action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      toast.success("Remove From Cart")
    },

    calculatePrice: (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => (sum += i.price * i.quantity));
      state.subTotal = sum;
      state.shipping = state.subTotal > 1000 ? 0 : 200;
      state.tax = +(state.subTotal * 0.18).toFixed();
      state.total = state.subTotal + state.tax + state.shipping;
    },
  }
});

export const {addToCart, decrementItemQuantity, removeItemFromCart, calculatePrice} = cartSlice.actions
export default cartSlice.reducer