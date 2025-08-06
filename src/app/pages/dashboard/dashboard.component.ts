import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userName = 'Achraf';
  today = new Date();
  stats = [
    { icon: 'fa-box', label: 'Total Products', value: 120, animatedValue: 0 },
    {
      icon: 'fa-shopping-bag',
      label: 'Total Orders',
      value: 87,
      animatedValue: 0,
    },
    {
      icon: 'fa-coins',
      label: 'Revenue',
      value: 15500,
      animatedValue: 0,
      isCurrency: true,
    },
  ];
  recentOrders = [
    {
      id: 'ORD-001',
      product: 'Gold Coin',
      amount: '2,000 MAD',
      date: '2024-06-01',
      status: 'Pending',
    },
    {
      id: 'ORD-002',
      product: 'Silver Bar',
      amount: '1,500 MAD',
      date: '2024-06-02',
      status: 'Delivered',
    },
    {
      id: 'ORD-003',
      product: 'Commemorative Note',
      amount: '500 MAD',
      date: '2024-06-03',
      status: 'Pending',
    },
    {
      id: 'ORD-004',
      product: 'Collector Coin',
      amount: '3,000 MAD',
      date: '2024-06-04',
      status: 'Delivered',
    },
  ];

  ngOnInit(): void {
    this.animateStats();
  }

  animateStats() {
    this.stats.forEach((stat, i) => {
      const target = stat.value;
      let current = 0;
      let duration = 1000;
      let stepTime = Math.max(Math.floor(duration / target), 20);
      if (stat.isCurrency) {
        // Animate to 15500 for revenue
        stepTime = 10;
      }
      const interval = setInterval(() => {
        if (current < target) {
          current += Math.ceil(target / (duration / stepTime));
          if (current > target) current = target;
          this.stats[i].animatedValue = current;
        } else {
          this.stats[i].animatedValue = target;
          clearInterval(interval);
        }
      }, stepTime);
    });
  }

  formatStatValue(stat: any): string {
    if (stat.isCurrency) {
      return stat.animatedValue.toLocaleString() + ' MAD';
    }
    return stat.animatedValue;
  }
}
