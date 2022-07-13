import { createReducer, on } from '@ngrx/store';
import { Cart } from './model/cart.model';
import { Course } from './model/course.model';
import { addCart, deleteCart} from './store.action';

export const cart:Cart[] = JSON.parse(localStorage.getItem('cart-store') || '[]');

export const cart_store = createReducer(
    cart,
    on(addCart, (state,{value}) =>{
        var cartOld:any =  Object.assign([], state);
        cartOld.push(value)
        if(!Array.isArray(JSON.parse(localStorage.getItem('cart-store') || '{}'))){
            localStorage.setItem('cart-store',JSON.stringify([]))
        }
        localStorage.setItem('cart-store',JSON.stringify(cartOld))
       return cartOld
    }),
    on(deleteCart, (state,{stt}) =>{
        var cartOld:any =  Object.assign([], state);
        cartOld.splice(stt,1)
        localStorage.setItem('cart-store',JSON.stringify(cartOld))
       return cartOld
    })
  
);