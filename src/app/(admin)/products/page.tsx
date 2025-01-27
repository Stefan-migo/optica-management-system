// app/(admin)/products/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ProductsPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = async () => {
    const { error } = await supabase
      .from('products')
      .insert([{ name, price: parseFloat(price), stock: 0 }]);

    if (error) {
      alert('Error adding product');
    } else {
      alert('Product added successfully');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2">
        Add Product
      </button>
    </div>
  );
}