import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  // Make Math available in template
  Math = Math;

  userName = 'Ahmed';

  // Mock data
  allProducts: Product[] = [
    {
      id: 1,
      name: 'Gold Sovereign Coin',
      price: 2500,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description: 'Pure gold sovereign coin from Bank Al-Maghrib collection',
    },
    {
      id: 2,
      name: 'Silver Dirham Bar',
      price: 1200,
      category: 'Silver Bars',
      image: 'assets/images/logo-bam.png',
      description: 'Limited edition silver dirham commemorative bar',
    },
    {
      id: 3,
      name: 'Moroccan Heritage Set',
      price: 3800,
      category: 'Collector Sets',
      image: 'assets/images/logo-bam.png',
      description: 'Complete collection of Moroccan heritage coins',
    },
    {
      id: 4,
      name: 'Commemorative Note',
      price: 800,
      category: 'Banknotes',
      image: 'assets/images/logo-bam.png',
      description: 'Special edition commemorative banknote',
    },
    {
      id: 5,
      name: 'Limited Edition Gold Bar',
      price: 5000,
      category: 'Limited Edition',
      image: 'assets/images/logo-bam.png',
      description: 'Exclusive limited edition gold bar',
    },
    {
      id: 6,
      name: 'Silver Commemorative Coin',
      price: 950,
      category: 'Commemorative',
      image: 'assets/images/logo-bam.png',
      description: 'Beautiful silver commemorative coin',
    },
    {
      id: 7,
      name: 'Royal Collection Set',
      price: 4200,
      category: 'Collector Sets',
      image: 'assets/images/logo-bam.png',
      description: 'Premium royal collection set',
    },
    {
      id: 8,
      name: 'Gold Investment Coin',
      price: 1800,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description: 'Investment grade gold coin',
    },
  ];

  // Filtering and search
  searchTerm: string = '';
  selectedCategory: string = 'All Categories';
  filteredProducts: Product[] = [];

  // Pagination
  currentPage: number = 1;
  productsPerPage: number = 8;
  totalPages: number = 1;

  // Categories for filter
  categories: string[] = [
    'All Categories',
    'Gold Coins',
    'Silver Bars',
    'Commemorative',
    'Collector Sets',
    'Banknotes',
    'Limited Edition',
  ];

  ngOnInit(): void {
    this.filterProducts();
  }

  // Filter products based on search and category
  filterProducts(): void {
    let filtered = this.allProducts;

    // Apply category filter
    if (this.selectedCategory !== 'All Categories') {
      filtered = filtered.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = filtered;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Calculate total pages for pagination
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.productsPerPage
    );
  }

  // Get products for current page
  getCurrentPageProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  // Pagination navigation
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Add to cart functionality
  addToCart(product: Product): void {
    console.log(`Added ${product.name} to cart`);
    // Placeholder function for add to cart functionality
  }

  // Format price with MAD currency
  formatPrice(price: number): string {
    return price.toLocaleString() + ' MAD';
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All Categories';
    this.filterProducts();
  }
}
