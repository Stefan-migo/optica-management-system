// components/DataTable/ProductsTable.tsx
'use client';
import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/UI/data-table';
import { Product } from '@/lib/types';
import { useSupabase } from '@/lib/supabase/client';
import { ProductForm } from '@/components/Forms/ProductForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { deleteProduct, updateProduct } from '@/lib/actions/products';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        {row.original.image_url && (
          <img
            src={row.original.image_url}
            alt={row.getValue('name')}
            className="h-10 w-10 object-cover rounded hidden sm:block"
          />
        )}
        <span className="font-medium">{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    meta: { className: 'hidden sm:table-cell' },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => (
      <Badge variant={row.getValue('type') === 'glasses' ? 'default' : 'secondary'}>
        {row.getValue('type') === 'glasses' ? 'Gafas' : 'Lentes'}
      </Badge>
    ),
  },
  { accessorKey: 'stock', header: 'Stock' },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => (
      <span>${(row.getValue('price') as number).toLocaleString()}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <TableActions product={row.original} />,
  },
];

function TableActions({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto eliminado correctamente');
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Editar
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <ProductForm 
            initialData={product} 
            onSuccess={() => {
              setOpen(false);
              queryClient.invalidateQueries({ queryKey: ['products'] });
            }} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductsTable() {
  const { supabase } = useSupabase();

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as Product[];
    },
  });

  return <DataTable columns={columns} data={products || []} />;
}