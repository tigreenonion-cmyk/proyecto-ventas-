import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

export default function ProductsPage() {
  return (
    <div>
      <h2>Productos</h2>
      <ProductForm />
      <hr />
      <ProductList />
    </div>
  );
}
