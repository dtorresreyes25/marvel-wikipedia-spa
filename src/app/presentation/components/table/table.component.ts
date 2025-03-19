import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HeroEntity } from '../../../domain/entities/hero.entity';

@Component({
  selector: 'app-hero-table',
  template: `
    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>

      <ng-container matColumnDef="gender">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Gender</th>
        <td mat-cell *matCellDef="let row">{{ row.gender }}</td>
      </ng-container>

      <ng-container matColumnDef="citizenship">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Citizenship</th>
        <td mat-cell *matCellDef="let row">{{ row.citizenship }}</td>
      </ng-container>

      <ng-container matColumnDef="skills">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Skills</th>
        <td mat-cell *matCellDef="let row">{{ row.skills }}</td>
      </ng-container>

      <ng-container matColumnDef="occupation">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Occupation</th>
        <td mat-cell *matCellDef="let row">{{ row.occupation }}</td>
      </ng-container>

      <ng-container matColumnDef="memberOf">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Member Of</th>
        <td mat-cell *matCellDef="let row">{{ row.memberOf }}</td>
      </ng-container>

      <ng-container matColumnDef="creator">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Creator</th>
        <td mat-cell *matCellDef="let row">{{ row.creator }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `
  ],
  standalone: true,
  imports: [MatTableModule, MatSortModule]
})
export class HeroTableComponent implements OnChanges, AfterViewInit {
  @Input() data: HeroEntity[] | null = [];
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<HeroEntity>();
  columns = ['name', 'gender', 'citizenship', 'skills', 'occupation', 'memberOf', 'creator'];

  ngOnChanges({ data }: SimpleChanges) {
    if (data) {
      this.dataSource.data = data.currentValue || [];
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
