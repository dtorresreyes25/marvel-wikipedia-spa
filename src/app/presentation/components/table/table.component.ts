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
import { ChartComponent } from '../chart/chart.component';
import { CdkTableModule } from '@angular/cdk/table';
import { NgForOf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-table',
  template: `
    <table mat-table [dataSource]="dataSource" matSort>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-header-row *matHeaderRowDef="chartColumnsWithEmpty"></tr>

      <ng-container *ngFor="let column of columnsData" [matColumnDef]="column">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column | titlecase }}</th>
        <td mat-cell *matCellDef="let element" class="clickable-cell">{{ element[column] }}</td>
      </ng-container>

      <ng-container *ngFor="let column of columnsData" [matColumnDef]="'chart-' + column">
        <th mat-header-cell *matHeaderCellDef class="chart-cell">
          <app-hero-chart [column]="column" [data]="dataSource.data"></app-hero-chart>
        </th>
      </ng-container>

      <ng-container matColumnDef="chart-actions">
        <th mat-header-cell *matHeaderCellDef></th>
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

      <tr mat-row *matRowDef="let row; columns: displayedColumns" (click)="selectHero(row)"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }

      .clickable-cell {
        cursor: pointer;
      }

      .chart-cell {
        padding: 1rem;
      }

      canvas {
        width: 100%;
        height: 100%;
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
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    CdkTableModule,
    ChartComponent,
    NgForOf,
    TitleCasePipe
  ]
})
export class HeroTableComponent implements OnChanges, AfterViewInit {
  @Input() data: HeroEntity[] | null = [];
  @ViewChild(MatSort) sort!: MatSort;

  @Output() onHeroDeleted = new EventEmitter<string>();
  @Output() onHeroEdited = new EventEmitter<HeroEntity>();
  @Output() onHeroSelected = new EventEmitter<HeroEntity>();

  readonly columnsData = [
    'name',
    'gender',
    'citizenship',
    'skills',
    'occupation',
    'memberOf',
    'creator'
  ];
  readonly displayedColumns = [...this.columnsData, 'actions'];

  readonly chartColumns = this.columnsData.map((column) => 'chart-' + column);
  readonly chartColumnsWithEmpty = [...this.chartColumns, 'chart-actions'];

  dataSource = new MatTableDataSource<HeroEntity>();

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
}
