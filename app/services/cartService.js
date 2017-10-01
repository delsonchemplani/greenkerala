'use strict';
angular.module('myKalahulluApp')
    .service('cartService', function () {
         var cart = [];
        return {
            cartItems:function () {
                return cart;
            },
            addCartItem:function (cartItem) {
                cart.push(cartItem);
                 localStorage.setItem('cart', JSON.stringify(cart));
            },
            deleteCartItem:function (id) {
                var oldCart = cart;
                cart = [];
                angular.forEach(oldCart, function (oldCartItem) {
                     if (oldCartItem.id !== id) cart.push(oldCartItem);
                });
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    });