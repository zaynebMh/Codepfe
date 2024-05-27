import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
   
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.error = 'Veuillez remplir tous les champs correctement.';
      return;
    }
  
    const { username, email, password, role } = this.signupForm.value;
    this.userService.signup({ username, email, password, role })
      .subscribe(
        response => {
          this.router.navigate(['/projet']);
          console.log('Inscription réussie.');
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
          this.error = error.error || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.';
        }
      );
  }

  get formControls() {
    return this.signupForm.controls;
  }
}
