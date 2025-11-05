// Contenido de src/context/CartContext.jsx

// 1. Importar 'useEffect'
import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

// ... (Las ACCIONES y el 'cartReducer' se quedan exactamente igual) ...
export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

export function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const product = action.payload;
      const existingItem = state.find(item => item.code === product.code);

      if (existingItem) {
        return state.map(item =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
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
      return [];
    }
    default:
      return state;
  }
}

// 2. Nueva función para LEER el estado inicial
//    Usaremos la misma key 'cart-levelup' que tenías en tu JS original
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cart-levelup');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Error al cargar el carrito desde localStorage", e);
    return []; // Si hay un error, empezamos con un carrito vacío
  }
};

const CartContext = createContext();

export function CartProvider({ children }) {
  
  // 3. Modificamos 'useReducer' para que use la función 'getInitialCart'
  //    El tercer argumento 'getInitialCart' es un "inicializador vago" (lazy initializer)
  //    Se ejecuta solo una vez, cuando el componente se monta.
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  // --- ¡NUEVO HOOK 'useEffect'! ---
  // 4. Guardar en localStorage CADA VEZ que el estado 'cart' cambie
  useEffect(() => {
    localStorage.setItem('cart-levelup', JSON.stringify(cart));
  }, [cart]); // La 'dependencia' [cart] significa "ejecuta esto cuando 'cart' cambie"


  // ... (Todas tus funciones: addItem, removeItem, etc. se quedan igual) ...
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

  // ... (Tu 'useMemo' para calcular totales se queda igual) ...
  const { totalItems, cartTotal } = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { totalItems, cartTotal };
  }, [cart]);

  // ... (Tu 'value' se queda igual) ...
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

// ... (Tu hook 'useCart' se queda igual) ...
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}