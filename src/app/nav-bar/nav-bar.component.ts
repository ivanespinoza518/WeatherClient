import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe(result => {
        this.isAuthenticated = result;
      })
  }
  
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
