import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-form',
  template: `
    <h2 mat-dialog-title>Create Hero</h2>
    <mat-dialog-content>
      <form [formGroup]="heroForm" (ngSubmit)="submit()">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" required />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Gender</mat-label>
            <input matInput formControlName="gender" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Citizenship</mat-label>
            <input matInput formControlName="citizenship" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Skills</mat-label>
            <input matInput formControlName="skills" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Occupation</mat-label>
            <input matInput formControlName="occupation" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Member Of</mat-label>
            <input matInput formControlName="memberOf" />
          </mat-form-field>

          <mat-form-field class="full-width">
            <mat-label>Creator</mat-label>
            <input matInput formControlName="creator" />
          </mat-form-field>
        </div>

        <div class="button-container">
          <button mat-raised-button color="primary" type="submit" [disabled]="heroForm.invalid">
            Create
          </button>
        </div>
      </form>
    </mat-dialog-content>
  `,
  styles: [
    `
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .full-width {
        grid-column: span 2;
      }

      .button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
      }
    `
  ],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class HeroFormComponent {
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroFormComponent>
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      gender: [''],
      citizenship: [''],
      skills: [''],
      occupation: [''],
      memberOf: [''],
      creator: ['']
    });
  }

  submit(): void {
    if (this.heroForm.valid) {
      this.dialogRef.close(this.heroForm.value);
    }
  }
}
