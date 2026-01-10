import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Features/Auth/services/auth.service';


type Role = 'Superadmin' | 'manager' | 'user';

interface NavItem {
  label: string;
  route: string;
  icon?: string; // you can wire to icon font or emoji
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  currentRole: Role = 'user';  
  
   // set this from your auth service

  visibleMenu: NavItem[] = [];

  searchTerm = '';
  showSearch = true;
  searchPlaceholder = 'Search products, users, or orders…';

  displayName = 'Alex Morgan';
  initials = 'AM';

  private superAdminMenu: NavItem[] = [
    // { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    // { label: 'Analytics', route: '/analytics', icon: '📈' },
    // { label: 'Users', route: '/users', icon: '👥' },
    // { label: 'Categories', route: 'admin/categories', icon: '🗂️' },
    // // { label: 'Products', route: 'admin/product', icon: '📦' },
    // { label: 'Store', route: '/store', icon: '🛒' },
    // { label: 'Tasks', route: '/tasks', icon: '✅' }

     { label: 'Dashboard', route: 'admin/dashboard', icon: '📊' },
  // { label: 'Analytics', route: '/analytics', icon: '📈' },
  { label: 'Users', route: '/users', icon: '👥' },

  // NEW: Manage (with submenu)
  { label: 'Manage', route: '/manage', icon: '🛠️' },

  // Removed old Categories / Products items
  // { label: 'Categories', route: 'admin/categories', icon: '🗂️' },
  // { label: 'Products', route: 'admin/product', icon: '📦' },

  { label: 'Store', route: '/home', icon: '🛒' },
  { label: 'Tasks', route: '/tasks', icon: '✅' }
  ];

  private managerMenu: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    { label: 'Categories', route: '/categories', icon: '🗂️' },
    { label: 'Products', route: '/products', icon: '📦' },
    { label: 'Tasks', route: '/tasks', icon: '✅' }
  ];

  private userMenu: NavItem[] = [
    { label: 'Deals', route: '/deals', icon: '🔥' },
    { label: 'Account', route: '/account', icon: '👤' },
    { label: 'Cart', route: '/cart', icon: '🛒' }
  ];

  constructor(private router: Router, private authservice : AuthService) {}

  ngOnInit(): void {
    const storedRole = localStorage.getItem('auth_role');
  const storedFirstName = localStorage.getItem('auth_firstname');

  console.log(storedFirstName,storedRole);

  if (storedRole) {
    const lower = storedRole.toLowerCase();
    if (lower.includes('super')) {
      this.currentRole = 'Superadmin';
    } else if (lower.includes('manager')) {
      this.currentRole = 'manager';
    } else {
      this.currentRole = 'user';
    }
  }

  if (storedFirstName) {
    this.displayName = storedFirstName;
    this.initials = storedFirstName.charAt(0).toUpperCase();
  }

  this.setupByRole();
  }

  private setupByRole(): void {
    switch (this.currentRole) {
      case 'Superadmin':
        this.visibleMenu = this.superAdminMenu;
        this.showSearch = true; // search users/products/orders
        this.searchPlaceholder = 'Search users, products, or orders…';
        break;
      case 'manager':
        this.visibleMenu = this.managerMenu;
        this.showSearch = true; // search orders/products
        this.searchPlaceholder = 'Search products or tasks…';
        break;
      case 'user':
      default:
        this.visibleMenu = this.userMenu;
        this.showSearch = true; // Amazon-style search
        this.searchPlaceholder = 'Search products, brands, or categories…';
        break;
    }
  }

  navigate(item: NavItem): void {
    this.router.navigate([item.route]);
  }

  isActive(item: NavItem): boolean {
    
    return this.router.url.startsWith(item.route);
  }

  goHome(): void {
    if (this.currentRole === 'user') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['admin/dashboard']);
    }
  }

  onSearch(): void {
    const term = this.searchTerm?.trim();
    if (!term) return;

    if (this.currentRole === 'Superadmin') {
      // example: route to a global search page with query param
      this.router.navigate(['/search'], { queryParams: { q: term } });
    } else if (this.currentRole === 'manager') {
      this.router.navigate(['/search'], { queryParams: { q: term, scope: 'products' } });
    } else {
      // end user product search
      this.router.navigate(['/search'], { queryParams: { q: term, scope: 'catalog' } });
    }
  }

  navigateTo(route: string): void {
  this.router.navigate([route]);
}

}
