import React, { useState } from 'react';
import { MenuSection } from './components/MenuSection';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { menuItems } from './data/menu';
import { CartItem, MenuItem, OrderDetails } from './types';
import { UtensilsCrossed } from 'lucide-react';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    // In a real app, you would send this to an API
    console.log('Order placed:', { details, items: cartItems });
    setCartItems([]);
    setIsCheckingOut(false);
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="text-green-500" size={24} />
            <h1 className="text-xl font-bold text-gray-800">FoodieExpress</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {cartItems.length} items in cart
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Our Menu</h2>
            <MenuSection items={menuItems} onAddToCart={handleAddToCart} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            {isCheckingOut ? (
              <CheckoutForm onSubmit={handlePlaceOrder} />
            ) : (
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;