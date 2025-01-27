// app/(admin)/customers/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (!error) setCustomers(data);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-4">
            <p>{customer.name}</p>
            <p>{customer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}