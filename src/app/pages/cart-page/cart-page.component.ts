import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, CartState, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit, OnDestroy {
  cart: CartState = {
    items: [],
    totalQuantity: 0,
    subtotal: 0,
  };

  private cartSubscription: Subscription;

  constructor(private cartService: CartService, private router: Router) {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    // Cart is already loaded via subscription
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Update item quantity
  updateQuantity(item: CartItem, newQuantity: number): void {
    this.cartService.updateItemQuantity(item.id, newQuantity);
  }

  // Remove item from cart
  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  // Clear entire cart
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Proceed to checkout (placeholder)
  proceedToCheckout(): void {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
    alert('Checkout functionality will be implemented in the next phase.');
  }

  // Continue shopping
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  // Format price for display
  formatPrice(price: number): string {
    return this.cartService.formatPrice(price);
  }

  // Check if cart is empty
  isCartEmpty(): boolean {
    return this.cart.items.length === 0;
  }

  // Get cart item count
  getCartItemCount(): number {
    return this.cart.items.length;
  }
}
