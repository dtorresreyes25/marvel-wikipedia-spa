import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import Chart from 'chart.js/auto';
import { HeroEntity } from '../../../domain/entities/hero.entity';

@Component({
  selector: 'app-hero-chart',
  template: '<div class="chart-container"><canvas #chartCanvas></canvas></div>',
  styles: `
    .chart-container {
      width: 130px;
      height: 130px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `,
  standalone: true
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() column!: string;
  @Input() data!: HeroEntity[];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance!: Chart;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['column']) {
      this.updateChart();
    }
  }

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private createChart() {
    if (!this.data || !this.column) return;

    const { labels, values } = this.getChartData();
    const chartType = labels.length <= 5 ? 'pie' : 'bar';

    this.chartInstance = new Chart(this.chartCanvas.nativeElement, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: this.getColors(labels.length)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { display: false },
          y: { display: false }
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: { size: 12 },
            bodyFont: { size: 10 },
            callbacks: {
              label: (tooltipItem) => {
                return tooltipItem.raw + ' heroes';
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private updateChart() {
    this.destroyChart();
    this.createChart();
  }

  private getChartData() {
    const values = this.data.map((item) => item[this.column as keyof HeroEntity]);
    const uniqueValues = Array.from(new Set(values));

    return {
      labels: uniqueValues,
      values: uniqueValues.map((value) => values.filter((v) => v === value).length)
    };
  }

  private getColors(count: number): string[] {
    const baseColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta'];
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  }
}
