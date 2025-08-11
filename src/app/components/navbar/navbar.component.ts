import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  mobileMenuOpen = false;
  private cartSubscription: Subscription;

  constructor(private cartService: CartService, private router: Router) {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartItemCount = cart.totalQuantity;
    });
  }

  ngOnInit(): void {
    // Component is ready
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
