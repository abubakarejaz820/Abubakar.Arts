import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/ProductContext';
import type { Artwork } from '../data/artworks';

interface NewProductForm {
  name: string;
  price: string;
  description: string;
  sizes: string;
  artist: string;
  category: string;
  image: File | null;
}

const AdminPage: React.FC = () => {
  const { addProduct } = useProducts();
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    price: '',
    description: '',
    sizes: '',
    artist: '',
    category: 'Quranic',
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const missingFields = useMemo(() => {
    const required = [
      newProduct.name,
      newProduct.price,
      newProduct.description,
      newProduct.sizes,
      newProduct.artist,
      newProduct.image,
    ];
    return required.filter((field) => !field).length;
  }, [newProduct]);

  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.sizes || !newProduct.artist || !newProduct.image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setSaving(true);
      const imageUrl = await fileToBase64(newProduct.image);
      const product: Artwork = {
        id: Date.now().toString(),
        title: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        sizes: newProduct.sizes.split(',').map((size) => size.trim()).filter(Boolean),
        artist: newProduct.artist,
        category: newProduct.category,
        imageUrl,
        featured: false,
      };
      addProduct(product);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        sizes: '',
        artist: '',
        category: 'Quranic',
        image: null,
      });
      setPreviewUrl(null);
      alert('Product added and visible in catalog.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-zinc-100 px-4 py-8 text-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-600 dark:text-amber-400">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin-orders"
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:border-amber-500 hover:text-amber-700 dark:border-zinc-700 dark:hover:border-amber-400 dark:hover:text-amber-400"
              >
                View Orders
              </Link>
              <a
                href="/"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-amber-600 dark:hover:bg-amber-500"
              >
                Back to Website
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Form completion</p>
              <p className="mt-1 text-2xl font-bold">{Math.max(0, 6 - missingFields)}/6</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Selected category</p>
              <p className="mt-1 text-2xl font-bold">{newProduct.category}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Status</p>
              <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                {missingFields === 0 ? 'Ready to publish' : 'Draft'}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSave();
          }}
          className="mt-8 grid gap-6 lg:grid-cols-3"
        >
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
            <h2 className="text-2xl font-semibold">Add New Product</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Fill all product details to keep your catalog clean and premium.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <input
                type="text"
                placeholder="Price (PKR)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <input
                type="text"
                placeholder="Artist Name"
                value={newProduct.artist}
                onChange={(e) => setNewProduct({ ...newProduct, artist: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="Quranic">Quranic</option>
                <option value="Duas">Duas</option>
              </select>
            </div>

            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="mt-4 min-h-28 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
            />
            <input
              type="text"
              placeholder="Sizes (comma-separated) e.g. 12x18, 16x24"
              value={newProduct.sizes}
              onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
              className="mt-4 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-amber-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
            />

            <button
              type="submit"
              disabled={saving}
              className="mt-6 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-700"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </section>

          <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-xl font-semibold">Upload & Preview</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Add a sharp image to maintain the gallery quality.
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const imageFile = e.target.files?.[0] || null;
                setNewProduct({ ...newProduct, image: imageFile });
                setPreviewUrl(imageFile ? URL.createObjectURL(imageFile) : null);
              }}
              className="mt-5 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />

            <div className="mt-5 overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/60">
              {previewUrl ? (
                <img src={previewUrl} alt="Product preview" className="h-56 w-full object-cover" />
              ) : (
                <div className="flex h-56 items-center justify-center px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Image preview will appear here after upload.
                </div>
              )}
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;