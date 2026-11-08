
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Simulating login check from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true; // Allow entry
  } else {
    alert('You are not logged in! I cannot let you access this page.');
    // Redirect to a specific page, or the login page
    return router.parseUrl('/contacts');
  }
};