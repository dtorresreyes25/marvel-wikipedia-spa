import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  EventEmitter,
  Output
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-table',
  template: `
    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container *ngFor="let column of columnsData" [matColumnDef]="column">
        <th mat-header-cell *matHeaderCellDef mat-sort-header [hidden]="isHiddenColumn(column)">
          {{ column | titlecase }}
        </th>
        <td mat-cell *matCellDef="let row" class="clickable-row" [hidden]="isHiddenColumn(column)">
          {{ row[column] }}
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let row">
          <button mat-button (click)="editHero(row); $event.stopPropagation()">Edit</button>
          <button mat-button color="warn" (click)="deleteHero(row); $event.stopPropagation()">
            Delete
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: columns"
        (click)="selectHero(row); $event.stopPropagation()"
      ></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }

      .clickable-row {
        cursor: pointer;
      }

      mat-button {
        text-transform: none;
        padding: 0;
        min-width: auto;
        font-size: 0.75rem;
      }
    `
  ],
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatButtonModule, NgForOf, TitleCasePipe]
})
export class HeroTableComponent implements OnChanges, AfterViewInit {
  @Input() data: HeroEntity[] | null = [];
  @ViewChild(MatSort) sort!: MatSort;

  @Output() onHeroDeleted = new EventEmitter<string>();
  @Output() onHeroEdited = new EventEmitter<HeroEntity>();
  @Output() onHeroSelected = new EventEmitter<HeroEntity>();

  readonly dataSource = new MatTableDataSource<HeroEntity>();

  readonly columnsData = [
    'id',
    'name',
    'gender',
    'citizenship',
    'skills',
    'occupation',
    'memberOf',
    'creator'
  ];

  readonly columns = [...this.columnsData, 'actions'];

  ngOnChanges({ data }: SimpleChanges) {
    if (data) {
      this.dataSource.data = data.currentValue || [];
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  selectHero(hero: HeroEntity): void {
    this.onHeroSelected.emit(hero);
  }

  editHero(hero: HeroEntity): void {
    this.onHeroEdited.emit(hero);
  }

  deleteHero(hero: HeroEntity): void {
    this.onHeroDeleted.emit(hero.id);
  }

  isHiddenColumn(column: string): boolean {
    return column === 'id';
  }
}
