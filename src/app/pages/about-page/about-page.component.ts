import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {
  // Mission & Vision
  mission = {
    title: 'Our Mission',
    description:
      'To provide a secure, trusted platform for Moroccans to access authentic Bank Al-Maghrib commemorative items, investment products, and collectibles while preserving our rich cultural heritage.',
    icon: 'fa-bullseye',
  };

  vision = {
    title: 'Our Vision',
    description:
      'To become the leading marketplace for Moroccan financial heritage, connecting citizens with authentic Bank Al-Maghrib products and fostering a culture of responsible investment.',
    icon: 'fa-eye',
  };

  // Features
  features: Feature[] = [
    {
      icon: 'fa-shield-alt',
      title: 'Secure Payments',
      description:
        'Bank-grade security with encrypted transactions and multiple payment options for your peace of mind.',
    },
    {
      icon: 'fa-certificate',
      title: 'Trusted Products',
      description:
        'All products are officially authenticated by Bank Al-Maghrib with guaranteed quality and authenticity.',
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'National Coverage',
      description:
        'Serving all regions of Morocco with reliable delivery and local customer support.',
    },
    {
      icon: 'fa-headset',
      title: 'Expert Support',
      description:
        'Dedicated customer service team with deep knowledge of our products and investment guidance.',
    },
  ];

  // Timeline/Milestones
  milestones: Milestone[] = [
    {
      year: '1959',
      title: 'Bank Al-Maghrib Founded',
      description:
        "Establishment of Morocco's central bank, beginning our journey in financial heritage.",
    },
    {
      year: '1987',
      title: 'First Commemorative Series',
      description:
        'Launch of our inaugural commemorative coin collection celebrating Moroccan culture.',
    },
    {
      year: '2000',
      title: 'Digital Transformation',
      description:
        'Introduction of online banking and digital financial services across Morocco.',
    },
    {
      year: '2024',
      title: 'Marketplace Launch',
      description:
        'Launch of the Bank Al-Maghrib Marketplace, bringing our heritage to the digital age.',
    },
  ];

  // Team/Leadership
  teamMembers: TeamMember[] = [
    {
      name: 'Dr. Abdellatif Jouahri',
      role: 'Governor',
      avatar: 'assets/images/logo-bam.png',
      bio: 'Leading Bank Al-Maghrib with over 20 years of experience in central banking and financial policy.',
    },
    {
      name: 'Fatima Zahra Mansouri',
      role: 'Deputy Governor',
      avatar: 'assets/images/logo-bam.png',
      bio: 'Expert in monetary policy and financial stability with deep knowledge of Moroccan markets.',
    },
    {
      name: 'Hassan Alami',
      role: 'Head of Operations',
      avatar: 'assets/images/logo-bam.png',
      bio: 'Overseeing daily operations and ensuring seamless customer experience across all touchpoints.',
    },
    {
      name: 'Amina Benjelloun',
      role: 'Customer Relations',
      avatar: 'assets/images/logo-bam.png',
      bio: 'Dedicated to providing exceptional service and building lasting relationships with our customers.',
    },
  ];

  // FAQ
  faqItems: FAQItem[] = [
    {
      question: 'How do I verify the authenticity of products?',
      answer:
        'All products come with official Bank Al-Maghrib certificates of authenticity. Each item has a unique serial number that can be verified through our verification system.',
      isOpen: false,
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept bank transfers, credit cards, and mobile payments. All transactions are secured with bank-grade encryption for your safety.',
      isOpen: false,
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Standard delivery takes 3-5 business days within Morocco. Express delivery is available for urgent orders with 1-2 business day delivery.',
      isOpen: false,
    },
    {
      question: 'Can I return or exchange products?',
      answer:
        'Yes, we offer a 30-day return policy for unused products in original packaging. Commemorative items may have specific return conditions.',
      isOpen: false,
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Currently, we serve customers within Morocco. International shipping will be available in future updates.',
      isOpen: false,
    },
  ];

  constructor(private router: Router) {}

  // Toggle FAQ item
  toggleFAQ(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

  // Navigate to products
  exploreProducts(): void {
    this.router.navigate(['/products']);
  }
}
