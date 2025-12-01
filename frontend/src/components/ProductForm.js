import React, { useState } from 'react';
import api from '../api';

export default function ProductForm() {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [stock,setStock]=useState(0);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, price, stock });
      alert('Producto creado');
      setName(''); setPrice(''); setStock(0);
      window.location.reload();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={submit} className="row g-2">
      <div className="col-md-5">
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} className="form-control" required/>
      </div>
      <div className="col-md-3">
        <input placeholder="Precio" type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} className="form-control" required/>
      </div>
      <div className="col-md-2">
        <input placeholder="Stock" type="number" value={stock} onChange={e=>setStock(e.target.value)} className="form-control" required/>
      </div>
      <div className="col-md-2">
        <button className="btn btn-success w-100">Añadir</button>
      </div>
    </form>
  );
}
