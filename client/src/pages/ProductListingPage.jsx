import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

const ProductListingPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subCategory = searchParams.get('sub');
  
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const handlePriceFilterChange = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const isNewArrivals = location.pathname === '/new-arrivals';
  const isSale = location.pathname === '/sale';
  const displayCategory = isNewArrivals ? 'New Arrivals' : isSale ? 'Top Sale!' : (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products');

  const subCategoriesMap = {
    women: ['chudi', 'kurti', 'shirt', 'tshirt'],
    men: ['shirt', 'tshirt'],
    boys: ['shirt', 'tshirt'],
    girls: ['shirt', 'tshirt']
  };

  const getProductImagePrefix = (cat, sub) => {
    if (cat === 'women') {
      if (sub === 'shirt') return 'women';
      if (sub === 'tshirt') return 'womens';
      if (sub === 'kurti') return 'kurti';
      if (sub === 'chudi') return 'chudi';
    }
    if (cat === 'men') {
      if (sub === 'shirt') return 'shirt';
      if (sub === 'tshirt') return 'tshirt';
    }
    if (cat === 'boys') {
      if (sub === 'shirt') return 'kids';
      if (sub === 'tshirt') return 'kidsts';
    }
    if (cat === 'girls') {
      if (sub === 'shirt') return 'girl';
      if (sub === 'tshirt') return 'girls';
    }
    return 'default';
  };

  const generateProducts = useMemo(() => () => {
    let productsList = [];
    let idCounter = 1;

    // Pseudo-random deterministic price between 450 and 2000
    const getPrice = (id) => Math.floor(450 + ((id * 317) % (2000 - 450 + 1)));
    const getOldPrice = (price, id) => price + 200 + ((id * 53) % 800);

    if (isNewArrivals) {
      for (let i = 1; i <= 30; i++) {
        let ext = '.jpg';
        let prefix = `nc${i}`;
        if ([1, 4, 5, 7, 18].includes(i)) ext = '.webp';
        if (i === 7) prefix = 'nc7 ';
        
        const price = getPrice(idCounter);
        productsList.push({
          id: idCounter++,
          brand: "Trendy Fashions",
          name: "New Arrival!",
          price: price,
          oldPrice: getOldPrice(price, idCounter),
          image: `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'https://online-shopping-7fom.onrender.com'}`}/uploads/${prefix}${ext}`
        });
      }
      return productsList;
    }

    if (isSale) {
      const salePrefixes = ['shirt', 'tshirt', 'women', 'kurti', 'girl'];
      salePrefixes.forEach(prefix => {
        for (let i = 1; i <= 6; i++) {
          let ext = '.jpg';
          if (`${prefix}${i}` === 'women6') ext = '.webp'; 
          
          const price = getPrice(idCounter);
          productsList.push({
            id: idCounter++,
            brand: "one7",
            name: "Top Sale!",
            price: price,
            oldPrice: getOldPrice(price, idCounter) + 500, // Huge discount for sale
            image: `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'https://online-shopping-7fom.onrender.com'}`}/uploads/${prefix}${i}${ext}`
          });
        }
      });
      // Deterministic sort to avoid jitter on re-render
      return productsList.sort((a,b) => (a.id * 13 % 3) - 1);
    }

    const subs = subCategory ? [subCategory] : (subCategoriesMap[category] || []);

    subs.forEach(sub => {
      const prefix = getProductImagePrefix(category, sub);
      if (prefix === 'default') return;
      for (let i = 1; i <= 7; i++) {
        let ext = '.jpg';
        const webpFiles = ['chudi1', 'chudi2', 'kidsts4', 'kurti7', 'womens2'];
        if (webpFiles.includes(`${prefix}${i}`)) {
          ext = '.webp';
        }
        
        const price = getPrice(idCounter);
        productsList.push({
          id: idCounter++,
          brand: "one7",
          name: `${sub.charAt(0).toUpperCase() + sub.slice(1)}`,
          price: price,
          oldPrice: getOldPrice(price, idCounter),
          image: `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'https://online-shopping-7fom.onrender.com'}`}/uploads/${prefix}${i}${ext}`
        });
      }
    });
    return productsList;
  }, [category, subCategory, isNewArrivals, isSale]);

  const products = useMemo(() => generateProducts(), [generateProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedPriceRanges.length === 0) return true;
      return selectedPriceRanges.some(range => {
        if (range === 'under500') return product.price < 500;
        if (range === '500to1000') return product.price >= 500 && product.price <= 1000;
        if (range === '1000to2000') return product.price > 1000 && product.price <= 2000;
        if (range === 'above2000') return product.price > 2000;
        return false;
      });
    });
  }, [products, selectedPriceRanges]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted mb-6">
        <Link to="/" className="hover:text-brand transition-colors cursor-pointer">Home</Link> / <span className="text-brand font-semibold">{displayCategory}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand">{displayCategory} Fashion</h1>
        <div className="text-sm text-muted">{filteredProducts.length} Products found</div>
      </div>

      <div className="flex">
        {/* Filters Sidebar Desktop */}
        <aside className="hidden md:block w-32 pr-2 border-r border-norm">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-wide">Filters</h2>
          <div className="space-y-6 text-xs">
            <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2"><input type="checkbox" checked={selectedPriceRanges.includes('under500')} onChange={() => handlePriceFilterChange('under500')} /><span>Under ₹500</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" checked={selectedPriceRanges.includes('500to1000')} onChange={() => handlePriceFilterChange('500to1000')} /><span>₹500 - ₹1,000</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" checked={selectedPriceRanges.includes('1000to2000')} onChange={() => handlePriceFilterChange('1000to2000')} /><span>₹1,000 - ₹2,000</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" checked={selectedPriceRanges.includes('above2000')} onChange={() => handlePriceFilterChange('above2000')} /><span>Above ₹2,000</span></label>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 md:pl-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((item) => (
              <div key={item.id} className="bg-card rounded p-3 shadow-sm hover:shadow-md transition-shadow group border border-norm flex flex-col h-full">
                <Link to={`/product/${item.id}`} state={{ product: item }} className="block relative overflow-hidden mb-3 rounded h-56 bg-sec shrink-0 cursor-pointer flex items-center justify-center p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <div className="flex-1">
                  <h4 className="text-brand font-bold mb-1 truncate text-sm">{item.brand}</h4>
                  <p className="text-muted text-xs truncate mb-2">{item.name}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-heading font-bold text-sm">₹{item.price}</span>
                    <span className="text-muted dark:text-muted line-through text-xs">₹{item.oldPrice}</span>
                    <span className="text-red-500 text-xs font-bold hidden sm:inline">({Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF)</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 bg-card border border-norm text-brand py-2 rounded text-xs md:text-sm font-semibold hover:bg-sec dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1">
                    <Heart className="w-4 h-4" /> Wishlist
                  </button>
                  <button className="flex-1 bg-brand text-white py-2 rounded text-xs md:text-sm font-semibold hover:bg-brand-hover transition-colors flex items-center justify-center gap-1">
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
