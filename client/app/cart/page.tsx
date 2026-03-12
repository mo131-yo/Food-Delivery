"use client"
import { useState, useEffect } from 'react';
import { useCart } from '../components/CartProvider';
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import RobotDance from '../components/Robot';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<'cart' | 'order'>('cart');
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const API_URL = "http://localhost:8000";

const API_URL = "https://food-ahv2.onrender.com";

const handleCheckout = async () => {
  if (!address) {
    toast.error("Хүргэлтийн хаягаа оруулна уу!");
    return;
  }

  const token = localStorage.getItem('accessToken');
  if (!token) {
    toast.error("Та нэвтрэх шаардлагатай!");
    router.push('/login');
    return;
  }

  setLoading(true);

  try {
    const foods = cart.map(item => ({
      foodId: item.id,
      quantity: item.quantity
    }));

    const response = await fetch(`${API_URL}/foods-order/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ foods, address, totalPrice: total }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Захиалга амжилттай үүслээ!");
      clearCart();
      setActiveTab('order');
      fetchOrders();
    } else {
      toast.error(result.message || "Алдаа гарлаа");
    }
  } catch (error) {
    console.error("Checkout Error:", error);
    toast.error("Сүлжээний алдаа: Сервертэй холбогдож чадсангүй");
  } finally {
    setLoading(false);
  }
};

const fetchOrders = async () => {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user._id || user.id;

  if (!userId || !token) return;

  try {
    const response = await fetch(`${API_URL}/foods-order/get-by-id-order/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    if (response.ok) {
      setOrders(result.data || result);
    }
  } catch (error) {
    console.error("Orders fetch error", error);
  }
};
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = (subtotal > 0 ? 5000 : 0);
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-100 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-screen shadow-2xl p-6 flex flex-col">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black flex items-center gap-2 dark:text-white">
            <span className="text-2xl">🛒</span> Order detail
          </h2>
          <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition">
            <IoCloseOutline size={32} className="text-gray-500" />
          </button>
        </div>

        <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-2xl p-1.5 mb-8">
          <button 
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'cart' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500'}`}
          >
            Cart
          </button>
          <button 
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'order' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500'}`}
          >
            Order
          </button>
        </div>

        {activeTab === 'cart' ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              <p className="font-black text-lg dark:text-white">My cart</p>
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">Сагс хоосон байна</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 dark:border-zinc-800 pb-6 relative group">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-red-500">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 border rounded-full w-6 h-6 flex items-center justify-center">×</button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 px-3 py-1 rounded-xl">
                          <button onClick={() => updateQuantity(item.id, -1)} className="font-bold">—</button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="font-bold">+</button>
                        </div>
                        <span className="font-black dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className="mt-6">
                <p className="font-bold mb-2 dark:text-white">Delivery location</p>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Hurguuleh haygaa bichne uu"
                  className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-2xl text-sm h-24 focus:ring-2 focus:ring-red-500 outline-none dark:text-white"
                /><RobotDance/>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-dashed border-gray-300">
              <div className="flex justify-between text-2xl font-black dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-xl font-black dark:text-white">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-red-500 text-white py-4 rounded-2xl font-black mt-6 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Уншиж байна..." : "Checkout"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <p className="font-black text-lg dark:text-white mb-4">Order history</p>
            {orders.length === 0 ? (
              <p className="text-center text-gray-400 py-10">History bhq bn</p>
            ) : (
              orders.map((order: any) => (
                <div key={order._id} className="p-4 rounded-2xl border dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/30 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-black dark:text-white">${order.totalPrice.toFixed(2)}</span>
                    <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-full font-bold">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">🕒 {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs text-red-400 mt-1 line-clamp-1">📍 {order.address}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}