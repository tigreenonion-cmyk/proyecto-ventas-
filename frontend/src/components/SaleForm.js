import React, { useEffect, useState } from 'react';
import api from '../api';

export default function SaleForm() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=> {
    api.get('/products').then(res => setProducts(res.data));
  },[]);

  const addToCart = (product) => {
    const existing = cart.find(c => c.productId === product.id);
    if (existing) {
      setCart(cart.map(c => c.productId === product.id ? {...c, quantity: c.quantity + 1} : c));
    } else {
      setCart([...cart, { productId: product.id, name: product.name, quantity: 1 }]);
    }
  };

  const submit = async () => {
    try {
      await api.post('/sales', { items: cart.map(c => ({ productId: c.productId, quantity: c.quantity })) });
      alert('Venta registrada');
      setCart([]);
      window.location.reload();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h5>Lista de productos</h5>
        <ul className="list-group">
          {products.map(p => (
            <li key={p.id} className="list-group-item d-flex justify-content-between">
              <div>
                <b>{p.name}</b> — Stock: {p.stock}
              </div>
              <button disabled={p.stock<=0} className="btn btn-sm btn-primary" onClick={()=>addToCart(p)}>Agregar</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h5>Carrito</h5>
        <ul className="list-group">
          {cart.map(c => (
            <li key={c.productId} className="list-group-item d-flex justify-content-between">
              <div>{c.name} x {c.quantity}</div>
              <div>
                <button className="btn btn-sm btn-secondary me-1" onClick={()=> setCart(cart.map(it=> it.productId===c.productId?{...it,quantity: Math.max(1,it.quantity-1)}: it))}>-</button>
                <button className="btn btn-sm btn-secondary" onClick={()=> setCart(cart.map(it=> it.productId===c.productId?{...it,quantity: it.quantity+1}: it))}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <button disabled={cart.length===0} className="btn btn-success mt-3" onClick={submit}>Confirmar venta</button>
      </div>
    </div>
  );
}
