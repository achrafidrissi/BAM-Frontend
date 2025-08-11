import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import {
  QuantityDialogComponent,
  QuantityDialogData,
} from '../../components/quantity-dialog/quantity-dialog.component';

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
  Math = Math;
  userName = 'Ahmed';
  allProducts: Product[] = [
    {
      id: 1,
      name: 'Gold Sovereign Coin',
      price: 2500,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description:
        'Classic British gold sovereign coin, perfect for investment and collection.',
    },
    {
      id: 2,
      name: 'Silver Maple Leaf',
      price: 850,
      category: 'Silver Coins',
      image: 'assets/images/logo-bam.png',
      description:
        'Canadian silver maple leaf coin with exceptional purity and design.',
    },
    {
      id: 3,
      name: 'Platinum Eagle',
      price: 4200,
      category: 'Platinum Coins',
      image: 'assets/images/logo-bam.png',
      description:
        'American platinum eagle with stunning design and high purity.',
    },
    {
      id: 4,
      name: 'Palladium Bar',
      price: 1800,
      category: 'Palladium',
      image: 'assets/images/logo-bam.png',
      description:
        'Investment-grade palladium bar with certificate of authenticity.',
    },
    {
      id: 5,
      name: 'Gold Krugerrand',
      price: 2800,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description:
        'South African gold krugerrand, a classic investment choice.',
    },
    {
      id: 6,
      name: 'Silver American Eagle',
      price: 950,
      category: 'Silver Coins',
      image: 'assets/images/logo-bam.png',
      description: 'Iconic American silver eagle with beautiful design.',
    },
    {
      id: 7,
      name: 'Gold Britannia',
      price: 2600,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description: 'British gold britannia coin with modern security features.',
    },
    {
      id: 8,
      name: 'Silver Philharmonic',
      price: 900,
      category: 'Silver Coins',
      image: 'assets/images/logo-bam.png',
      description: 'Austrian silver philharmonic with musical theme design.',
    },
    {
      id: 9,
      name: 'Gold Maple Leaf',
      price: 2700,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description: 'Canadian gold maple leaf with exceptional purity.',
    },
    {
      id: 10,
      name: 'Silver Kangaroo',
      price: 880,
      category: 'Silver Coins',
      image: 'assets/images/logo-bam.png',
      description: 'Australian silver kangaroo with unique design.',
    },
    {
      id: 11,
      name: 'Gold American Eagle',
      price: 2900,
      category: 'Gold Coins',
      image: 'assets/images/logo-bam.png',
      description: 'American gold eagle with iconic design and high purity.',
    },
    {
      id: 12,
      name: 'Silver Britannia',
      price: 920,
      category: 'Silver Coins',
      image: 'assets/images/logo-bam.png',
      description: 'British silver britannia with modern security features.',
    },
  ];

  searchTerm: string = '';
  selectedCategory: string = 'All Categories';
  filteredProducts: Product[] = [];
  currentPage: number = 1;
  productsPerPage: number = 8;
  totalPages: number = 1;

  categories: string[] = [
    'All Categories',
    'Gold Coins',
    'Silver Coins',
    'Platinum Coins',
    'Palladium',
    'Gold Bars',
    'Silver Bars',
    'Commemorative',
    'Collector Sets',
    'Banknotes',
    'Limited Edition',
  ];

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

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

  // Show quantity dialog for add to cart
  showAddToCartDialog(product: Product): void {
    const dialogRef = this.dialog.open(QuantityDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { product } as QuantityDialogData,
      disableClose: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed, no action needed
    });
  }

  // Format price with MAD currency
  formatPrice(price: number): string {
    return this.cartService.formatPrice(price);
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All Categories';
    this.filterProducts();
  }
}
