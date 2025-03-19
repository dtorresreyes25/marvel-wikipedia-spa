import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-hero-filter',
  template: `
    <mat-form-field class="hero-names-list" appearance="fill">
      <mat-label>Hero name filter</mat-label>
      <mat-chip-grid #chipGrid aria-label="Hero name selection">
        <input
          [formControl]="heroNameControl"
          placeholder="Type a hero name..."
          [matChipInputFor]="chipGrid"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
        />

        <mat-chip *ngFor="let name of names" [removable]="true" (removed)="remove(name)">
          {{ name }} <mat-icon matChipRemove>cancel</mat-icon>
        </mat-chip>
      </mat-chip-grid>
    </mat-form-field>
  `,
  standalone: true,
  styles: [
    `
      .hero-names-list {
        width: 100%;
      }
    `
  ],
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, ReactiveFormsModule, NgForOf]
})
export class HeroFilterComponent {
  private namesSet = new Set<string>();
  readonly separatorKeysCodes = [ENTER, COMMA];
  readonly heroNameControl = new FormControl('');

  @Output() onFilterChange = new EventEmitter<string[]>();

  get names(): string[] {
    return Array.from(this.namesSet);
  }

  add(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value && !this.namesSet.has(value)) {
      this.namesSet.add(value);
      this.emitChange();
    }
    event.chipInput.clear();
  }

  remove(name: string): void {
    if (this.namesSet.delete(name)) {
      this.emitChange();
    }
  }

  private emitChange(): void {
    this.onFilterChange.emit(this.names);
  }
}
