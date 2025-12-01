import React, { useEffect, useState } from 'react';
import api from '../api';

export default function InventoryPage() {
  const [movements, setMovements] = useState([]);

  useEffect(()=> {
    api.get('/inventory/movements').then(res => setMovements(res.data));
  }, []);

  return (
    <div>
      <h2>Movimientos de Inventario</h2>
      <table className="table">
        <thead><tr><th>Producto</th><th>Cambio</th><th>Motivo</th><th>Fecha</th></tr></thead>
        <tbody>
          {movements.map(m => (
            <tr key={m.id}>
              <td>{m.product_id}</td>
              <td>{m.change}</td>
              <td>{m.reason}</td>
              <td>{new Date(m.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
