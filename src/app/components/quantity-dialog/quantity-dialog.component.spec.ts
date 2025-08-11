import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  QuantityDialogComponent,
  QuantityDialogData,
} from './quantity-dialog.component';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

describe('QuantityDialogComponent', () => {
  let component: QuantityDialogComponent;
  let fixture: ComponentFixture<QuantityDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<QuantityDialogComponent>>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    category: 'Test Category',
    image: 'test-image.jpg',
    description: 'Test description',
  };

  const mockDialogData: QuantityDialogData = {
    product: mockProduct,
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockCartService = jasmine.createSpyObj('CartService', [
      'addToCart',
      'formatPrice',
    ]);
    mockToastService = jasmine.createSpyObj('ToastService', ['showSuccess']);

    mockCartService.formatPrice.and.returnValue('MAD 100.00');

    await TestBed.configureTestingModule({
      imports: [QuantityDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: CartService, useValue: mockCartService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with quantity 1', () => {
    expect(component.quantity).toBe(1);
  });

  it('should increase quantity when increaseQuantity is called', () => {
    component.increaseQuantity();
    expect(component.quantity).toBe(2);
  });

  it('should decrease quantity when decreaseQuantity is called', () => {
    component.quantity = 3;
    component.decreaseQuantity();
    expect(component.quantity).toBe(2);
  });

  it('should not decrease quantity below 1', () => {
    component.quantity = 1;
    component.decreaseQuantity();
    expect(component.quantity).toBe(1);
  });

  it('should calculate total price correctly', () => {
    component.quantity = 3;
    expect(component.getTotalPrice()).toBe(300);
  });

  it('should call cartService.addToCart and close dialog when onAddToCart is called', () => {
    component.quantity = 2;
    component.onAddToCart();

    expect(mockCartService.addToCart).toHaveBeenCalledWith(mockProduct, 2);
    expect(mockToastService.showSuccess).toHaveBeenCalledWith(
      '2x Test Product added to cart'
    );
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should format price using cartService', () => {
    const result = component.formatPrice(100);
    expect(mockCartService.formatPrice).toHaveBeenCalledWith(100);
    expect(result).toBe('MAD 100.00');
  });
});
