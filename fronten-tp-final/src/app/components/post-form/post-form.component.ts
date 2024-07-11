import { Component, inject } from '@angular/core';
import { FacebookService } from '../../services/redes-sociales/facebook.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facebookService: FacebookService
  ) {
    this.postForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]],
      imageUrl: ['', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg))')]]
    });
  }

  async postToFacebook(): Promise<void> {
    if (this.postForm.valid) {
      const message = this.postForm.get('message')?.value;
      const imageUrl = this.postForm.get('imageUrl')?.value;
      try {
        await this.facebookService.postToPage(message, imageUrl).toPromise();
        alert('Posted to Facebook successfully!');
        this.postForm.reset();
      } catch (error) {
        console.error('Error posting to Facebook:', error);
        alert('Failed to post to Facebook.');
      }
    }
  }
}
