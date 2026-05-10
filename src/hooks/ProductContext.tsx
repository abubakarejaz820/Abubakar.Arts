import { createContext, useContext, useMemo, useState } from 'react';
import { artworks as seedArtworks, type Artwork } from '../data/artworks';

interface ProductContextValue {
  products: Artwork[];
  categories: string[];
  addProduct: (product: Artwork) => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

const CUSTOM_PRODUCTS_KEY = 'abubakar-arts-custom-products';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customProducts, setCustomProducts] = useState<Artwork[]>(() => {
    const raw = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Artwork[];
    } catch {
      localStorage.removeItem(CUSTOM_PRODUCTS_KEY);
      return [];
    }
  });

  const products = useMemo(() => [...customProducts, ...seedArtworks], [customProducts]);
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((a) => a.category)))],
    [products]
  );

  const addProduct = (product: Artwork) => {
    setCustomProducts((prev) => {
      const updated = [product, ...prev];
      localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
