import React, { createContext, useContext, useReducer, useMemo } from 'react';

// 1. Definir las "acciones" que podemos hacer
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// 2. El "Reducer": la función que maneja la lógica
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const product = action.payload;
      const existingItem = state.find(item => item.code === product.code);

      if (existingItem) {
        // Si el item existe, incrementa la cantidad
        return state.map(item =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es nuevo, añádelo al carrito con cantidad 1
        return [...state, { ...product, quantity: 1 }];
      }
    }
    
    case ACTIONS.REMOVE_ITEM: {
      const code = action.payload;
      return state.filter(item => item.code !== code);
    }
    
    case ACTIONS.INCREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        item.code === code ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    
    case ACTIONS.DECREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        item.code === code && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    
    case ACTIONS.CLEAR_CART: {
      return []; // Devuelve un array vacío
    }
    
    default:
      return state;
  }
}

// 3. Crear el Contexto
const CartContext = createContext();

// 4. El "Proveedor" (Provider)
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // 5. Crear funciones fáciles de usar
  const addItem = (product) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
  };
  
  const removeItem = (code) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: code });
  };

  const increaseQuantity = (code) => {
    dispatch({ type: ACTIONS.INCREASE_QUANTITY, payload: code });
  };

  const decreaseQuantity = (code) => {
    dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: code });
  };
  
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  // 6. Calcular valores derivados (total de items y total monetario)
  // Usamos useMemo para que esto no se recalcule en cada render, solo si el 'cart' cambia
  const { totalItems, cartTotal } = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { totalItems, cartTotal };
  }, [cart]);


  // 7. Pasar el estado y las funciones al resto de la app
  const value = {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 8. Hook personalizado: la forma fácil de usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}