import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-hero-view',
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>
    <mat-dialog-content>
      <p><strong>Gender:</strong> {{ data.gender }}</p>
      <p><strong>Citizenship:</strong> {{ data.citizenship }}</p>
      <p><strong>Skills:</strong> {{ data.skills }}</p>
      <p><strong>Occupation:</strong> {{ data.occupation }}</p>
      <p><strong>Member Of:</strong> {{ data.memberOf }}</p>
      <p><strong>Creator:</strong> {{ data.creator }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  styles: [
    `
      mat-dialog-content {
        max-width: 400px;
      }
    `
  ],
  imports: [MatDialogModule, CommonModule, MatButton]
})
export class HeroViewComponent {
  constructor(
    public dialogRef: MatDialogRef<HeroViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeroEntity
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
