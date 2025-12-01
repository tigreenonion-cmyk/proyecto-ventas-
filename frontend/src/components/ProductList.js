import React, { useEffect, useState } from 'react';
import api from '../api';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    const load = async () => {
      const res = await api.get('/products');
      setProducts(res.data);
    };
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Eliminar producto?')) return;
    await api.delete(`/products/${id}`);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <table className="table table-striped mt-3">
      <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.stock}</td>
            <td>
              <button className="btn btn-sm btn-danger" onClick={()=>remove(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
