// lib/actions/products.ts
'use server';
import { createClient } from '@/lib/supabase/server';
import { ProductSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: FormData) {
  const supabase = createClient();
  const parsedData = ProductSchema.parse(data);
  
  const { error } = await supabase.from('products').insert(parsedData);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}

export async function updateProduct(product: Product) {
  const supabase = createClient();
  const { error } = await supabase
    .from('products')
    .update(product)
    .eq('id', product.id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}