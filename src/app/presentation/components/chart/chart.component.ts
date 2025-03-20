import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2
} from '@angular/core';
import Chart from 'chart.js/auto';
import { HeroEntity } from '../../../domain/entities/hero.entity';

@Component({
  selector: 'app-hero-chart',
  template: '<canvas #chartCanvas style="width:40px; height:40px;"></canvas>',
  standalone: true
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @Input() column!: string;
  @Input() data!: HeroEntity[];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance!: Chart;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setCanvasSize();
    this.createChart();
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private setCanvasSize() {
    const canvas = this.chartCanvas.nativeElement;
    this.renderer.setStyle(canvas, 'width', '100px');
    this.renderer.setStyle(canvas, 'height', '100px');
  }

  private createChart() {
    if (!this.data || !this.column) return;
    this.destroyChart();

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
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }

  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
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
