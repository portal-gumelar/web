import { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Printer, ArrowLeft, Search, Tag, 
  Calculator, Lock, Settings, X, Edit3, Save, Package, 
  ImageIcon, History, FileText, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Toast, { ToastType } from '../components/ui/Toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Transaction {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  cash: number;
  change: number;
}

export default function KasirPage() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const isMember = !!currentUser;
  
  const STORAGE_KEY_PRODUCTS = `gumelar_pos_products_${currentUser?.email || 'guest'}`;
  const STORAGE_KEY_TRANSACTIONS = `gumelar_pos_tx_${currentUser?.email || 'guest'}`;
  const STORAGE_KEY_LOGO = `gumelar_pos_logo_${currentUser?.email || 'guest'}`;

  const [toast, setToast] = useState<{message: string, type: ToastType, visible: boolean}>({
    message: '',
    type: 'success',
    visible: false
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true });
  };

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Kopi Robusta 250g', price: 35000, category: 'Minuman' },
      { id: '2', name: 'Keripik Singkong', price: 15000, category: 'Makanan' }
    ];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [storeLogo, setStoreLogo] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_LOGO);
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [cash, setCash] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: 'Makanan' });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const categories = ['Semua', 'Makanan', 'Minuman', 'Bahan Pokok', 'Jasa', 'Lainnya'];

  useEffect(() => {
    if (isMember) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
      if (storeLogo) localStorage.setItem(STORAGE_KEY_LOGO, storeLogo);
    }
  }, [products, transactions, storeLogo, isMember, STORAGE_KEY_PRODUCTS, STORAGE_KEY_TRANSACTIONS, STORAGE_KEY_LOGO]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreLogo(reader.result as string);
        showToast('Logo diperbarui!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;
    const p: Product = { id: Date.now().toString(), ...newProduct };
    setProducts([...products, p]);
    setNewProduct({ name: '', price: 0, category: 'Makanan' });
    showToast('Produk ditambah!');
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    showToast('Perubahan disimpan!');
  };

  const handlePayment = () => {
    const newTx: Transaction = {
      id: `TX-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total,
      cash,
      change
    };
    setTransactions([newTx, ...transactions]);
    setShowReceipt(true);
    showToast('Pembayaran Berhasil!');
  };

  const downloadExcel = () => {
    const data = transactions.map(tx => ({
      ID: tx.id,
      Tanggal: new Date(tx.date).toLocaleString('id-ID'),
      Total: tx.total,
      Items: tx.items.map(i => `${i.name} (${i.quantity})`).join(', ')
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");
    XLSX.writeFile(wb, `Rekap_Gumelar.xlsx`);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('REKAP KASIR GUMELAR', 14, 20);
    const body = transactions.map(tx => [tx.id, new Date(tx.date).toLocaleDateString(), formatIDR(tx.total)]);
    doc.autoTable({ startY: 30, head: [['ID', 'Tanggal', 'Total']], body });
    doc.save(`Rekap_Gumelar.pdf`);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} ditambah`);
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const change = cash > 0 ? cash - total : 0;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === 'Semua' || p.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={() => setToast({...toast, visible: false})} />

      <div className="max-w-[1500px] mx-auto relative">
        {!isMember && (
          <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 text-center">
            <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl">
              <Lock size={48} className="mx-auto mb-6 text-blue-600" />
              <h2 className="text-2xl font-black mb-10">Akses Member Gumelar</h2>
              <button onClick={() => navigate('/login')} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl">Masuk</button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => showAdmin ? setShowAdmin(false) : navigate('/layanan')} 
              className="p-4 bg-white rounded-2xl border transition-all hover:bg-slate-50 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-black">{showAdmin ? 'Kelola Toko' : 'Kasir'} <span className="text-blue-600">Gumelar</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border w-64 lg:w-80">
              <Search size={18} className="text-slate-400 ml-2" />
              <input type="text" placeholder="Cari..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-transparent outline-none w-full text-sm" />
            </div>
            <button onClick={() => setShowHistory(true)} className="p-4 bg-white rounded-2xl border"><History size={20} /></button>
            <button onClick={() => setShowAdmin(!showAdmin)} className="p-4 bg-slate-900 text-white rounded-2xl">
              {showAdmin ? <ShoppingCart size={20} /> : <Settings size={20} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {showAdmin ? (
                <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="bg-slate-50 p-6 rounded-3xl text-center border">
                      <div className="w-24 h-24 mx-auto bg-white rounded-2xl border-2 border-dashed flex items-center justify-center mb-4 relative group overflow-hidden">
                        {storeLogo ? <img src={storeLogo} className="w-full h-full object-contain" alt="Logo" /> : <ImageIcon className="text-slate-200" />}
                        <button onClick={() => logoInputRef.current?.click()} className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 text-[10px] font-bold">Ganti</button>
                      </div>
                      <input ref={logoInputRef} type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                      <p className="text-[10px] font-bold text-slate-400">LOGO TOKO</p>
                    </div>
                    <div className="bg-blue-600 p-6 rounded-3xl text-white flex flex-col justify-center">
                      <p className="text-xs font-bold opacity-70">TRANSAKSI</p>
                      <h3 className="text-3xl font-black">{transactions.length}</h3>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <input type="text" placeholder="Nama" className="md:col-span-5 p-3 rounded-xl" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                      <input type="number" placeholder="Harga" className="md:col-span-3 p-3 rounded-xl" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                      <select className="md:col-span-3 p-3 rounded-xl bg-white" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                        {categories.filter(c => c !== 'Semua').map(c => <option key={c}>{c}</option>)}
                      </select>
                      <button onClick={handleAddProduct} className="md:col-span-1 bg-blue-600 text-white rounded-xl flex items-center justify-center"><Plus size={20} /></button>
                    </div>
                  </div>
                  <table className="w-full text-left">
                    <thead className="text-[10px] font-black uppercase text-slate-400 border-b">
                      <tr><th className="pb-3">Produk</th><th className="pb-3">Harga</th><th className="pb-3 text-right">Aksi</th></tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-b border-slate-50 text-sm">
                          <td className="py-3 font-bold">{p.name}</td>
                          <td className="py-3 font-black text-blue-600">{formatIDR(p.price)}</td>
                          <td className="py-3 text-right">
                             <button onClick={() => setEditingProduct(p)} className="p-2 text-slate-300"><Edit3 size={16} /></button>
                             <button onClick={() => setProducts(products.filter(i => i.id !== p.id))} className="p-2 text-slate-300"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              ) : (
                <motion.div key="pos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{cat}</button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                      <button key={product.id} onClick={() => addToCart(product)} className="bg-white p-5 rounded-[2rem] border hover:shadow-xl transition-all text-left flex flex-col h-52">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3"><Package size={18} /></div>
                        <h3 className="font-black text-xs">{product.name}</h3>
                        <p className="text-blue-600 font-black text-base mt-auto">{formatIDR(product.price)}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border flex flex-col h-[calc(100vh-140px)] sticky top-24">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="font-black text-sm flex items-center gap-2"><ShoppingCart size={18} className="text-blue-600" /> Keranjang</h2>
                <button onClick={() => setCart([])} className="text-[10px] font-black text-red-500 uppercase">Bersih</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0"><h4 className="text-xs font-black truncate">{item.name}</h4><p className="text-[10px] text-blue-600 font-bold">{formatIDR(item.price)}</p></div>
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                      <button onClick={() => { const q = Math.max(1, item.quantity - 1); setCart(cart.map(i => i.id === item.id ? {...i, quantity: q} : i)) }}><Minus size={12} /></button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, quantity: item.quantity + 1} : i))}><Plus size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-slate-50 border-t space-y-4">
                <div className="flex justify-between items-end"><span className="text-[10px] font-black uppercase text-slate-400">Total</span><span className="text-2xl font-black">{formatIDR(total)}</span></div>
                <input type="number" value={cash || ''} onChange={e => setCash(Number(e.target.value))} placeholder="Bayar (Rp)" className="w-full p-3 rounded-xl border-2 focus:border-blue-600 outline-none font-black" />
                <button disabled={cart.length === 0 || cash < total} onClick={handlePayment} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl">BAYAR</button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showHistory && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl p-8 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xl">Rekap Penjualan</h3><button onClick={() => setShowHistory(false)} className="p-2 bg-slate-50 rounded-xl"><X size={24} /></button></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button onClick={downloadExcel} className="p-5 bg-emerald-50 text-emerald-600 rounded-2xl border-2 border-emerald-100 flex items-center gap-3 font-black text-xs uppercase"><BarChart3 size={24} /> Excel</button>
                  <button onClick={downloadPDF} className="p-5 bg-rose-50 text-rose-600 rounded-2xl border-2 border-rose-100 flex items-center gap-3 font-black text-xs uppercase"><FileText size={24} /> PDF</button>
                </div>
                <div className="flex-1 overflow-y-auto border rounded-2xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase sticky top-0">
                       <tr><th className="p-4">Waktu</th><th className="p-4">Total</th><th className="p-4 text-right">Detail</th></tr>
                    </thead>
                    <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id} className="border-b text-xs"><td className="p-4">{new Date(tx.date).toLocaleString()}</td><td className="p-4 font-black">{formatIDR(tx.total)}</td><td className="p-4 text-right text-slate-400">{tx.items.length} Item</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editingProduct && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8">
                <h3 className="font-black text-xl mb-6">Edit Produk</h3>
                <div className="space-y-4">
                  <input type="text" className="w-full p-4 bg-slate-50 rounded-xl font-bold" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                  <input type="number" className="w-full p-4 bg-slate-50 rounded-xl font-bold" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                  <div className="flex gap-2 pt-4">
                    <button onClick={() => setEditingProduct(null)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Batal</button>
                    <button onClick={handleUpdateProduct} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-black">Simpan</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReceipt && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden">
                <div className="p-8 receipt-content bg-[#fffdfa] text-center">
                  <div className="border-b-2 border-dashed pb-6 mb-6">
                    {storeLogo ? <img src={storeLogo} className="w-14 h-14 mx-auto mb-3 object-contain rounded-xl" alt="Logo" /> : <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 text-lg font-black">G</div>}
                    <h2 className="text-xl font-black uppercase">{currentUser?.name || 'GUMELAR.ID'}</h2>
                    <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Struk Digital</p>
                  </div>
                  <div className="space-y-3 mb-6 text-left">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-start text-[10px]">
                        <div className="flex-1 pr-4 font-bold">{item.name}</div>
                        <span className="font-black">{formatIDR(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-dashed pt-6 space-y-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase">Total</span><span className="text-xl font-black text-blue-600">{formatIDR(total)}</span></div>
                    <div className="flex justify-between text-[8px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg"><span>KEMBALI</span><span>{formatIDR(change)}</span></div>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 flex gap-3">
                  <button onClick={() => window.print()} className="flex-1 py-3 bg-white/10 text-white font-black rounded-xl text-xs"><Printer size={16} /> Cetak</button>
                  <button onClick={() => { setShowReceipt(false); setCart([]); setCash(0); }} className="flex-1 py-3 bg-blue-600 text-white font-black rounded-xl text-xs">Tutup</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <style>{`
          @media print { body * { visibility: hidden; } .receipt-content, .receipt-content * { visibility: visible; } .receipt-content { position: absolute; left: 0; top: 0; width: 100%; height: auto; background: white !important; } }
        `}</style>
      </div>
    </div>
  );
}
