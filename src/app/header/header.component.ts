import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from "../user/logout/logout.component";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigatetoProjet(){
    this.router.navigate(['/projet']);
  }
  navigatetoOut(){
    this.router.navigate(['/user/logout']);
  }
  
}
