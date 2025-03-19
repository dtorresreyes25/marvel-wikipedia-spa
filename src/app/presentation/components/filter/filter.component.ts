import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-hero-filter',
  template: `
    <form>
      <mat-form-field class="hero-names-list">
        <mat-label>Heroes</mat-label>
        <mat-chip-grid #chipGrid aria-label="Hero selection">
          <mat-chip-row
            *ngFor="let heroName of heroNames; trackBy: trackByIndex"
            (removed)="remove(heroName)"
          >
            {{ heroName }}
            <button matChipRemove [attr.aria-label]="'remove ' + heroName">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        </mat-chip-grid>

        <input
          name="currentHero"
          placeholder="New Hero..."
          [(ngModel)]="currentHero"
          [matChipInputFor]="chipGrid"
          [matAutocomplete]="auto"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
          aria-label="Add hero input"
        />
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
          <mat-option *ngFor="let hero of filteredHeroes" [value]="hero">{{ hero }}</mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      .hero-names-list {
        width: 100%;
      }
    `
  ],
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    NgForOf,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger
  ]
})
export class HeroFilterComponent {
  currentHero: string = '';

  readonly heroNames: string[] = [];
  readonly filteredHeroes: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {}

  remove(heroName: string): void {}

  selected(event: MatAutocompleteSelectedEvent): void {}

  trackByIndex(index: number): number {
    return index;
  }
}
