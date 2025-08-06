import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css',
})
export class ClientDashboardComponent {
  userName = 'Ahmed';
  today = new Date();

  featuredProducts = [
    {
      id: 1,
      name: 'Gold Sovereign Coin',
      price: '2,500 MAD',
      image: 'assets/images/gold-coin.jpg',
      description: 'Pure gold sovereign coin from Bank Al-Maghrib collection',
    },
    {
      id: 2,
      name: 'Silver Dirham Bar',
      price: '1,200 MAD',
      image: 'assets/images/silver-bar.jpg',
      description: 'Limited edition silver dirham commemorative bar',
    },
    {
      id: 3,
      name: 'Moroccan Heritage Set',
      price: '3,800 MAD',
      image: 'assets/images/heritage-set.jpg',
      description: 'Complete collection of Moroccan heritage coins',
    },
    {
      id: 4,
      name: 'Commemorative Note',
      price: '800 MAD',
      image: 'assets/images/commemorative-note.jpg',
      description: 'Special edition commemorative banknote',
    },
  ];

  categories = [
    { name: 'Gold Coins', icon: 'fa-coins', count: 12 },
    { name: 'Silver Bars', icon: 'fa-cube', count: 8 },
    { name: 'Commemorative', icon: 'fa-star', count: 15 },
    { name: 'Collector Sets', icon: 'fa-gem', count: 6 },
    { name: 'Banknotes', icon: 'fa-money-bill', count: 10 },
    { name: 'Limited Edition', icon: 'fa-crown', count: 4 },
  ];

  recentOrders = [
    {
      id: 'ORD-2024-001',
      productName: 'Gold Sovereign Coin',
      status: 'Delivered',
      date: '2024-05-28',
    },
    {
      id: 'ORD-2024-002',
      productName: 'Silver Dirham Bar',
      status: 'In Transit',
      date: '2024-05-30',
    },
    {
      id: 'ORD-2024-003',
      productName: 'Moroccan Heritage Set',
      status: 'Processing',
      date: '2024-06-01',
    },
  ];

  constructor(private router: Router) {}

  addToCart(productId: number) {
    console.log(`Added product ${productId} to cart`);
    // Placeholder function for add to cart functionality
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  exploreProducts() {
    this.router.navigate(['/products']);
  }
}
