import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { async, filter, map, of, switchMap, take } from 'rxjs';
import { User } from '../models/user';



export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    take(1), // Take the first emission from currentUser
    switchMap(user => {
      if (user) {
        return of(true); // User is authenticated
      } else {
      
       
       
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

          if (token) {
            // Try loading the user if a token is available
            return accountService.loadCurrentUser(token).pipe(
              map(() => true), // Loaded successfully
              switchMap(() => of(true)), // Ensure observable completes
              take(1) // Complete after first emission
            );
          } else {
            router.navigate(['/login']);
            return of(false); // No token, redirect to login
          }
       
        
      }
    })
  );


  //  return (accountService.currentUser$).pipe(
  //    // Wait until user is loaded
  //     take(1), 
  //    map(user => {
  //      if(user){
  //        console.log('User is authenticated:', user);
  //        console.log(user); 
  //        return true;
  //      }
        
  //      else{
        
  //        console.log(user);
  //        console.log('User not authenticated, redirecting to login.'); // Debugging
  //        router.navigate(['login'], { queryParams: { returnUrl: state.url } });
  //        return false;

  //      } 
  //    })
  //  )

  // if (accountService.isAuthenticated()) {
  //   return true; // User is authenticated
  // } else {
  //   router.navigate(['/login']); // Redirect to login if not authenticated
  //   return false;
  // }  
 
  // return accountService.currentUser$.pipe(
  //   take(1), // Get the first emission from currentUser
  //   switchMap(user => {
  //     if (user) {
  //       return of(true); // User is authenticated
  //     } else {
  //       // Check for token in localStorage
  //       const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        
  //       if (token) {
  //         // Try loading the user if a token is available
  //         return accountService.loadCurrentUser(token).pipe(
  //           map(() => true), // Successfully loaded user
  //           take(1) // Complete after first emission
  //         );
  //       }

  //       // If not authenticated, redirect to login
  //       router.navigate(['/login']);
  //       return of(false);
  //     }
  //   })
  // );


  
};
