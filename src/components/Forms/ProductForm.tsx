// components/Forms/ProductForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, Product } from '@/lib/schemas';
import { createProduct, updateProduct } from '@/lib/actions/products';
import { useSupabase } from '@/lib/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';

export function ProductForm({
  initialData,
  onSuccess,
}: {
  initialData?: Product;
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useSupabase();
  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      name: '',
      sku: '',
      type: 'glasses',
      stock: 0,
      price: 0,
      image_url: '',
    },
  });

  const handleImageUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  };

  const onSubmit = async (data: Product) => {
    setIsLoading(true);
    try {
      const formData = new FormData(form.formState.defaultValues ? data : undefined);
      const imageFile = formData.get('image') as File;

      if (imageFile?.size > 0) {
        const imagePath = await handleImageUpload(imageFile);
        data.image_url = supabase.storage
          .from('product-images')
          .getPublicUrl(imagePath).data.publicUrl;
      }

      if (initialData) {
        await updateProduct({ ...data, id: initialData.id });
        toast.success('Producto actualizado correctamente');
      } else {
        await createProduct(data);
        toast.success('Producto creado correctamente');
      }
      
      onSuccess();
    } catch (error) {
      toast.error(error.message || 'Error al guardar el producto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Resto de campos del formulario */}
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del producto</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar Producto'}
      </Button>
    </form>
  );
}