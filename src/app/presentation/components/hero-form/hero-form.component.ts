import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogModule
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-hero-form',
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit Hero' : 'Create Hero' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="heroForm" (ngSubmit)="submit()">
        <div class="form-grid">
          <input type="hidden" formControlName="id" />

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

          <mat-form-field>
            <mat-label>Creator</mat-label>
            <input matInput formControlName="creator" />
          </mat-form-field>

          <div class="button-container">
            <button mat-raised-button color="primary" type="submit" [disabled]="heroForm.invalid">
              {{ data ? 'Save Changes' : 'Create' }}
            </button>
          </div>
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
    ReactiveFormsModule,
    MatInput,
    ReactiveFormsModule,
    MatDialogTitle,
    MatButton
  ]
})
export class HeroFormComponent {
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeroEntity | null
  ) {
    this.heroForm = this.fb.group({
      id: [data?.id || ''],
      name: [data?.name || '', Validators.required],
      gender: [data?.gender || ''],
      citizenship: [data?.citizenship || ''],
      skills: [data?.skills || ''],
      occupation: [data?.occupation || ''],
      memberOf: [data?.memberOf || ''],
      creator: [data?.creator || '']
    });
  }

  submit(): void {
    if (this.heroForm.valid) {
      this.dialogRef.close(this.heroForm.value);
    }
  }
}
