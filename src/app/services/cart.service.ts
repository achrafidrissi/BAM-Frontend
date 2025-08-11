import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  lineTotal: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'bam_cart';
  private cartSubject = new BehaviorSubject<CartState>({
    items: [],
    totalQuantity: 0,
    subtotal: 0,
  });

  public cart$: Observable<CartState> = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  // Load cart from localStorage on service initialization
  private loadCartFromStorage(): void {
    try {
      const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
      if (storedCart) {
        const cartData = JSON.parse(storedCart);
        this.cartSubject.next(cartData);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this.clearCart();
    }
  }

  // Save cart to localStorage
  private saveCartToStorage(cart: CartState): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // Add item to cart
  addToCart(
    product: { id: number; name: string; price: number; image: string },
    quantity: number = 1
  ): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedItems = [...currentCart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
        lineTotal:
          (updatedItems[existingItemIndex].quantity + quantity) * product.price,
      };
      this.updateCart(updatedItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        lineTotal: product.price * quantity,
      };
      const updatedItems = [...currentCart.items, newItem];
      this.updateCart(updatedItems);
    }
  }

  // Update item quantity
  updateItemQuantity(itemId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          lineTotal: newQuantity * item.price,
        };
      }
      return item;
    });

    this.updateCart(updatedItems);
  }

  // Remove item from cart
  removeItem(itemId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter((item) => item.id !== itemId);
    this.updateCart(updatedItems);
  }

  // Clear entire cart
  clearCart(): void {
    const emptyCart: CartState = {
      items: [],
      totalQuantity: 0,
      subtotal: 0,
    };
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage(emptyCart);
  }

  // Get current cart state
  getCart(): CartState {
    return this.cartSubject.value;
  }

  // Get cart item by ID
  getCartItem(itemId: number): CartItem | undefined {
    return this.cartSubject.value.items.find((item) => item.id === itemId);
  }

  // Check if item exists in cart
  isItemInCart(itemId: number): boolean {
    return this.cartSubject.value.items.some((item) => item.id === itemId);
  }

  // Get item quantity in cart
  getItemQuantity(itemId: number): number {
    const item = this.getCartItem(itemId);
    return item ? item.quantity : 0;
  }

  // Update cart and recalculate totals
  private updateCart(items: CartItem[]): void {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

    const updatedCart: CartState = {
      items,
      totalQuantity,
      subtotal,
    };

    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(price);
  }
}
