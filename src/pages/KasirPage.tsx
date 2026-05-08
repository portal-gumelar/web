import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Printer, RefreshCw, ArrowLeft, Search, Tag, Calculator, Lock, Settings, X, Edit3, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function KasirPage() {
  const navigate = useNavigate();
  const isMember = !!localStorage.getItem('currentUser');
  
  // Products state with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kasir_products');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Kopi Robusta 250g', price: 35000, category: 'Minuman' },
      { id: '2', name: 'Keripik Singkong', price: 15000, category: 'Makanan' },
      { id: '3', name: 'Gula Merah Asli', price: 20000, category: 'Bahan Pokok' }
    ];
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cash, setCash] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // CRUD States
  const [showAdmin, setShowAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: 'Umum' });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kasir_products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // CRUD Functions
  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;
    const p: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category
    };
    setProducts([...products, p]);
    setNewProduct({ name: '', price: 0, category: 'Umum' });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Hapus produk ini?')) {
      setProducts(products.filter(p => p.id !== id));
      setCart(cart.filter(item => item.id !== id));
    }
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setCart(cart.map(item => item.id === editingProduct.id ? { ...editingProduct, quantity: item.quantity } : item));
    setEditingProduct(null);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const change = cash > 0 ? cash - total : 0;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto relative">
        
        {/* MEMBER PROTECTION OVERLAY */}
        {!isMember && (
          <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl border border-white"
            >
              <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce">
                <Lock size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Akses Terbatas!</h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Fitur **Kasir Gumelar** eksklusif hanya untuk member GUMELAR.ID. Silakan masuk untuk mulai mengelola penjualan Anda.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg"
                >
                  Masuk Sekarang
                </button>
                <button 
                  onClick={() => navigate('/layanan')}
                  className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Kembali ke Layanan
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/layanan')}
              className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-100 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Kasir <span className="text-blue-600">Gumelar</span></h1>
              <p className="text-slate-500 text-sm">Kelola stok & penjualan Anda di sini</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex-1 md:w-80">
              <Search className="text-slate-400 ml-2" size={20} />
              <input 
                type="text" 
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-sm py-2"
              />
            </div>
            <button 
              onClick={() => setShowAdmin(!showAdmin)}
              className={`p-4 rounded-2xl transition-all shadow-sm flex items-center gap-2 font-bold text-sm ${showAdmin ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              <Settings size={20} /> <span className="hidden md:inline">Kelola Produk</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Area (Products or CRUD) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {showAdmin ? (
                <motion.div 
                  key="admin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-slate-800">Daftar Produk Anda</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Tersimpan di Lokal</p>
                  </div>

                  {/* Add New Product Form */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <div className="md:col-span-5">
                      <input 
                        type="text" 
                        placeholder="Nama Produk Baru" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <input 
                        type="number" 
                        placeholder="Harga" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={newProduct.price || ''}
                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        <option>Umum</option>
                        <option>Makanan</option>
                        <option>Minuman</option>
                        <option>Jasa</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <button 
                        onClick={handleAddProduct}
                        className="w-full h-full bg-blue-600 text-white rounded-xl font-black flex items-center justify-center hover:bg-blue-700 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Product Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="pb-4">Nama Produk</th>
                          <th className="pb-4">Harga</th>
                          <th className="pb-4">Kategori</th>
                          <th className="pb-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {products.map(p => (
                          <tr key={p.id} className="group">
                            <td className="py-4 font-bold text-slate-800 text-sm">{p.name}</td>
                            <td className="py-4 text-sm font-black text-blue-600">{formatIDR(p.price)}</td>
                            <td className="py-4 text-xs text-slate-500">{p.category}</td>
                            <td className="py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => setEditingProduct(p)}
                                  className="p-2 text-slate-300 hover:text-blue-600 transition-colors"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="pos"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {filteredProducts.map(product => (
                    <motion.button
                      key={product.id}
                      layout
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col h-full group"
                    >
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Tag size={20} />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-blue-600 font-black mt-auto">{formatIDR(product.price)}</p>
                      <div className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.category}</div>
                    </motion.button>
                  ))}
                  {products.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                      <Tag className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-slate-400 font-bold">Belum ada produk. Klik "Kelola Produk" untuk menambah.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart & Checkout (Right) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[calc(100vh-200px)] sticky top-24">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-blue-600" size={24} />
                  <h2 className="font-black text-slate-900">Keranjang</h2>
                </div>
                <button 
                  onClick={() => setCart([])}
                  className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                >
                  Bersih
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                    <ShoppingCart size={64} className="mb-4" />
                    <p className="font-bold text-lg leading-tight">Siap Melayani Pelanggan</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{item.name}</h4>
                        <p className="text-xs text-slate-500">{formatIDR(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-slate-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-blue-600"><Minus size={14} /></button>
                        <span className="text-xs font-black min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-blue-600"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Total</span>
                  <span className="text-3xl font-black text-slate-900">{formatIDR(total)}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      value={cash || ''}
                      onChange={(e) => setCash(Number(e.target.value))}
                      placeholder="Input Uang Tunai"
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 font-black text-lg focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold">Kembalian</span>
                  <span className={`font-black ${change < 0 ? 'text-red-500' : 'text-green-600'}`}>{formatIDR(change)}</span>
                </div>

                <button 
                  disabled={cart.length === 0 || cash < total}
                  onClick={() => setShowReceipt(true)}
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2 text-xl active:scale-95"
                >
                  <Calculator size={24} /> Bayar Selesai
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingProduct && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-xl">Edit Produk</h3>
                  <button onClick={() => setEditingProduct(null)} className="text-slate-300"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Nama Produk</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Harga Jual</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    />
                  </div>
                  <button 
                    onClick={handleUpdateProduct}
                    className="w-full py-4 bg-blue-600 text-white font-black rounded-xl flex items-center justify-center gap-2 mt-4"
                  >
                    <Save size={18} /> Simpan Perubahan
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Receipt Modal (Same as before but cleaned up) */}
        <AnimatePresence>
          {showReceipt && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden"
              >
                <div className="p-8 receipt-content">
                  <div className="text-center mb-8 border-b-2 border-dashed border-slate-100 pb-8">
                    <h2 className="text-2xl font-black text-slate-900">GUMELAR.ID</h2>
                    <p className="text-xs text-slate-500 font-bold">KASIR UMKM DIGITAL</p>
                    <p className="text-[10px] text-slate-400 mt-2">{new Date().toLocaleString('id-ID')}</p>
                  </div>
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1 pr-4">
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-slate-500">{item.quantity} x {formatIDR(item.price)}</p>
                        </div>
                        <span className="font-bold text-slate-800">{formatIDR(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-dashed border-slate-100 pt-6 space-y-2">
                    <div className="flex justify-between font-black text-lg">
                      <span>TOTAL</span>
                      <span>{formatIDR(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-500"><span>BAYAR</span><span>{formatIDR(cash)}</span></div>
                    <div className="flex justify-between text-sm font-bold text-green-600 bg-green-50 px-3 py-2 rounded-xl"><span>KEMBALI</span><span>{formatIDR(change)}</span></div>
                  </div>
                  <div className="mt-8 text-center"><p className="text-xs font-bold text-slate-400 italic">Terima kasih!</p></div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 no-print">
                  <button onClick={() => window.print()} className="flex-1 py-3 bg-slate-900 text-white font-black rounded-xl flex items-center justify-center gap-2"><Printer size={18} /> Cetak</button>
                  <button onClick={() => { setShowReceipt(false); setCart([]); setCash(0); }} className="flex-1 py-3 bg-blue-600 text-white font-black rounded-xl">Tutup</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <style>{`
          @media print {
            body * { visibility: hidden; }
            .receipt-content, .receipt-content * { visibility: visible; }
            .receipt-content { position: absolute; left: 0; top: 0; width: 100%; }
            .no-print { display: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
