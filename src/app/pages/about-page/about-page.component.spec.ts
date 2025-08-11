import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutPageComponent } from './about-page.component';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mission and vision data', () => {
    expect(component.mission).toBeDefined();
    expect(component.vision).toBeDefined();
    expect(component.mission.title).toBe('Our Mission');
    expect(component.vision.title).toBe('Our Vision');
  });

  it('should have features array', () => {
    expect(component.features).toBeDefined();
    expect(component.features.length).toBe(4);
  });

  it('should have team members array', () => {
    expect(component.teamMembers).toBeDefined();
    expect(component.teamMembers.length).toBe(4);
  });

  it('should have FAQ items array', () => {
    expect(component.faqItems).toBeDefined();
    expect(component.faqItems.length).toBe(5);
  });

  it('should toggle FAQ item when toggleFAQ is called', () => {
    const initialState = component.faqItems[0].isOpen;
    component.toggleFAQ(0);
    expect(component.faqItems[0].isOpen).toBe(!initialState);
  });
});
