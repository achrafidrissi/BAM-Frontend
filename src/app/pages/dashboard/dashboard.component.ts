import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userName = 'Achraf';
  today = new Date();
  stats = [
    { icon: 'fa-box', label: 'Total Products', value: 120 },
    { icon: 'fa-shopping-bag', label: 'Total Orders', value: 87 },
    { icon: 'fa-coins', label: 'Revenue', value: '15,500 MAD' },
  ];
  recentOrders = [
    {
      id: 'ORD-001',
      product: 'Gold Coin',
      amount: '2,000 MAD',
      date: '2024-06-01',
    },
    {
      id: 'ORD-002',
      product: 'Silver Bar',
      amount: '1,500 MAD',
      date: '2024-06-02',
    },
    {
      id: 'ORD-003',
      product: 'Commemorative Note',
      amount: '500 MAD',
      date: '2024-06-03',
    },
    {
      id: 'ORD-004',
      product: 'Collector Coin',
      amount: '3,000 MAD',
      date: '2024-06-04',
    },
  ];
}
