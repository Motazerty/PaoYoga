import React, { useState, createContext, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Divider, Slide } from '@mui/material';
import { Box, Typography, Button, Paper } from '@mui/material';
import type { Pack } from '../data/packs';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';


// Cart Context
type SpiritualObject = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  details: { label: string; value: string }[];
};

type CartItem = (Pack | SpiritualObject) & { quantity: number; type: 'pack' | 'spiritualObject' };
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (item: Pack | SpiritualObject) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
} | undefined>(undefined);


export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (item: Pack | SpiritualObject) => {
    const type = 'videos' in item ? 'pack' : 'spiritualObject';
    const existing = cart.find((p) => p.id === item.id && p.type === type);
    if (existing) {
      setCart(cart.map((p) => p.id === item.id && p.type === type ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...item, quantity: 1, type }]);
    }
  };
  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((p) => p.id !== itemId));
  };
  const updateQuantity = (itemId: number, quantity: number) => {
    setCart(cart.map((p) => p.id === itemId ? { ...p, quantity: Math.max(1, quantity) } : p));
  };
  const clearCart = () => setCart([]);
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<{ open: boolean; packId?: number }>({ open: false });
  const [checkoutError, setCheckoutError] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = Math.round(total * 0.2 * 100) / 100;
  const subtotal = Math.round((total - taxes) * 100) / 100;

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutError(true);
      setTimeout(() => setCheckoutError(false), 2000);
      return;
    }
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 2500);
    clearCart();
  };

  const handleRemove = (packId: number) => {
    setConfirmRemove({ open: true, packId });
  };
  const confirmRemovePack = () => {
    if (confirmRemove.packId !== undefined) removeFromCart(confirmRemove.packId);
    setConfirmRemove({ open: false });
  };

  return (
    <Paper sx={{ p: 0, maxWidth: 600, m: '48px auto', borderRadius: 'var(--border-radius)', boxShadow: 8, overflow: 'hidden', background: 'var(--background-color)' }}>
      {/* Header */}
      <Box sx={{ background: 'var(--primary-color)', py: 4, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 'var(--border-radius)', borderBottomRightRadius: 'var(--border-radius)' }}>
        <FaShoppingCart style={{ fontSize: 38, color: '#fff', marginRight: 16 }} />
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, letterSpacing: 1, fontFamily: 'var(--font-family)' }}>Mon Panier</Typography>
      </Box>
      <Box sx={{ px: 4, py: 3 }}>
        {cart.length === 0 ? (
          <Box sx={{ color: '#888', fontSize: 20, textAlign: 'center', p: 5, background: 'var(--background-color)', borderRadius: 'var(--border-radius)', boxShadow: 1 }}>
            <span role="img" aria-label="empty">🛒</span> Votre panier est vide.<br />
            <Typography sx={{ mt: 2, fontSize: 16, color: 'var(--accent-color)', fontWeight: 600 }}>Ajoutez des packs pour commencer votre commande !</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button onClick={clearCart} sx={{ background: 'var(--accent-color)', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 'var(--border-radius)', px: 2, py: 1, boxShadow: 1, '&:hover': { background: '#ffb74d' } }}>Vider le panier</Button>
            </Box>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              {cart.map((item) => (
                <Box component="li" key={item.id + '-' + item.type} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '18px 0', borderBottom: '1px solid #eee', background: '#fff', borderRadius: 'var(--border-radius)', mb: 2, boxShadow: 2, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
                  <Box component="img"
                    src={item.type === 'pack' ? (item as Pack).videoThumbnail : (item as SpiritualObject).image || ''}
                    alt={item.name}
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--border-radius)', boxShadow: 2, border: '2px solid var(--accent-color)' }}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 19, color: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}>{item.name}</Typography>
                    <Typography sx={{ fontSize: 15, color: '#555', opacity: 0.85 }}>{item.description}</Typography>
                    <Typography sx={{ fontSize: 17, color: 'var(--accent-color)', fontWeight: 700 }}>{item.price}€</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      aria-label={`Retirer ${item.name} du panier`}
                      title={`Retirer ${item.name}`}
                      onClick={() => handleRemove(item.id)}
                      sx={{ background: '#d32f2f', color: 'white', borderRadius: 'var(--border-radius)', px: 2, py: 1, fontSize: 15, fontWeight: 600, ml: 2, display: 'flex', alignItems: 'center', gap: 1, boxShadow: 1, '&:hover': { background: '#a72626' } }}
                    >
                      <FaTrashAlt style={{ marginRight: 6 }} /> Retirer
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                      <IconButton aria-label="Diminuer" onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)', borderRadius: 'var(--border-radius)', mx: 0.5, p: 0.5, '&:hover': { background: 'var(--background-color)' } }} disabled={item.quantity <= 1}>-</IconButton>
                      <Typography sx={{ mx: 1, fontWeight: 700, fontSize: 16 }}>{item.quantity}</Typography>
                      <IconButton aria-label="Augmenter" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ color: 'var(--accent-color)', border: '1px solid var(--accent-color)', borderRadius: 'var(--border-radius)', mx: 0.5, p: 0.5, '&:hover': { background: 'var(--background-color)' } }}>+</IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            {/* Summary Section */}
            <Divider sx={{ my: 3 }} />
            <Box sx={{ fontSize: 20, textAlign: 'right', color: 'var(--primary-color)', background: 'var(--background-color)', p: '12px 18px', borderRadius: 'var(--border-radius)', fontWeight: 600, letterSpacing: 0.5, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                <Box>
                  <Typography sx={{ fontSize: 16, color: '#888' }}>Sous-total :</Typography>
                  <Typography sx={{ fontSize: 16, color: '#888' }}>Taxes (20%) :</Typography>
                  <Typography sx={{ fontSize: 18, color: 'var(--primary-color)', fontWeight: 700, mt: 1 }}>Total :</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 16 }}>{subtotal}€</Typography>
                  <Typography sx={{ fontSize: 16 }}>{taxes}€</Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>{total}€</Typography>
                </Box>
              </Box>
            </Box>
            <Button
              fullWidth
              onClick={handleCheckout}
              disabled={checkoutSuccess}
              aria-disabled={checkoutSuccess}
              sx={{ mt: 2, py: 2, background: 'var(--primary-color)', color: 'white', borderRadius: 'var(--border-radius)', fontSize: 22, fontWeight: 700, boxShadow: 3, transition: 'background 0.3s ease, opacity 0.2s', opacity: checkoutSuccess ? 0.7 : 1, '&:hover:not(:disabled)': { background: 'var(--accent-color)' }, '&:focus': { outline: '3px solid var(--accent-color)' } }}
            >
              {checkoutSuccess ? 'Paiement effectué ! 🎉' : 'Valider le panier'}
            </Button>
            {checkoutError && (
              <Typography sx={{ color: '#d32f2f', textAlign: 'center', mt: 2, fontWeight: 700 }}>Votre panier est vide !</Typography>
            )}
          </>
        )}
      </Box>
      {/* Remove confirmation dialog */}
      <Dialog open={confirmRemove.open} onClose={() => setConfirmRemove({ open: false })} TransitionComponent={Slide}>
        <DialogTitle>Retirer le pack</DialogTitle>
        <DialogContent>Voulez-vous vraiment retirer ce pack du panier ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRemove({ open: false })}>Annuler</Button>
          <Button onClick={confirmRemovePack} sx={{ background: '#d32f2f', color: '#fff', borderRadius: 'var(--border-radius)', '&:hover': { background: '#a72626' } }}>Retirer</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
