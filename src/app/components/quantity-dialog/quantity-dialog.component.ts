import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface QuantityDialogData {
  product: Product;
}

@Component({
  selector: 'app-quantity-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './quantity-dialog.component.html',
  styleUrl: './quantity-dialog.component.css',
})
export class QuantityDialogComponent implements OnInit {
  quantity = 1;
  private quantitySubject = new Subject<number>();

  constructor(
    public dialogRef: MatDialogRef<QuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuantityDialogData,
    private cartService: CartService,
    private toastService: ToastService
  ) {
    // Debounce quantity input changes
    this.quantitySubject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => {
        this.quantity = value;
      });
  }

  ngOnInit(): void {
    // Reset quantity when dialog opens
    this.quantity = 1;
  }

  // Increase quantity
  increaseQuantity(): void {
    this.quantity++;
  }

  // Decrease quantity
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Handle quantity input change
  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    if (isNaN(value) || value < 1) {
      this.quantity = 1;
      input.value = '1';
    } else {
      this.quantitySubject.next(value);
    }
  }

  // Add to cart
  onAddToCart(): void {
    if (this.data.product && this.quantity > 0) {
      this.cartService.addToCart(this.data.product, this.quantity);

      // Show success toast
      const message = `${this.quantity}x ${this.data.product.name} added to cart`;
      this.toastService.showSuccess(message);

      this.dialogRef.close();
    }
  }

  // Close dialog
  onCancel(): void {
    this.dialogRef.close();
  }

  // Format price for display
  formatPrice(price: number): string {
    return this.cartService.formatPrice(price);
  }

  // Get total price
  getTotalPrice(): number {
    return this.data.product.price * this.quantity;
  }
}
