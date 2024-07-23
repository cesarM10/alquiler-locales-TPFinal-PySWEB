import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LocalService } from '../../services/local.service';
import { NovedadService } from '../../services/novedad.service';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent implements OnInit {

  public graficoLocal: any;
  public graficoNovedad: any;
  public graficoPagosMensuales: any;

  valores = [12, 19, 3, 5, 2, 3];
  localesDisponibles: number = 0;
  localesAlquilados: number = 0;

  novedadPendiente: number = 0;
  novedadProcesada: number = 0;
  novedadTotal: number = 0;

  constructor(private localService: LocalService,
              private novedadService: NovedadService) {
    this.obtenerLocales();
    this.obtenerNovedades();
  }

  ngOnInit(): void {
    this.graficoLocales();
    this.graficoNovedades();
    this.graficoPagos();
  }

  obtenerLocales() {
    this.localService.getLocales().subscribe(
      result => {
        result.forEach((local: any) => {
          if (local.alquilado == false) {
            this.localesDisponibles++;
          } else {
            this.localesAlquilados++;
          }
        });
        this.graficoLocal.data.datasets[0].label = "Total de locales: " + (this.localesAlquilados + this.localesDisponibles);
        this.graficoLocal.data.datasets[0].data = [this.localesAlquilados, this.localesDisponibles];
        this.graficoLocal.update();
      },
      error => console.error(error)
    )
  }

  obtenerNovedades() {
    this.novedadService.getNovedades().subscribe(
      result => {
        result.forEach((novedad: any) => {
          if (novedad.estado == "Pendiente") {
            this.novedadPendiente++;
          } else {
            this.novedadProcesada++;
          }
        });
        this.novedadTotal = this.novedadPendiente + this.novedadProcesada;
        this.graficoNovedad.data.datasets[0].label = "Total: " + (this.novedadPendiente + this.novedadProcesada);
        this.graficoNovedad.data.datasets[0].data = [this.novedadPendiente, this.novedadProcesada];
        this.graficoNovedad.update();
      },
      error => console.error(error)
    )
  }

  graficoLocales() {
    this.graficoLocal = new Chart("graficoLocales", {
      type: 'bar', // el tipo de gráfico, puedes cambiarlo a 'line', 'pie', etc.
      data: {
        labels: ['Alquilados', 'Disponibles'],
        datasets: [{
          label: '#Locales ' + (this.localesAlquilados + this.localesDisponibles),
          data: [this.localesDisponibles, this.localesAlquilados],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  graficoNovedades() {
    this.graficoNovedad = new Chart("graficoNovedades", {
      type: 'pie', // el tipo de gráfico, puedes cambiarlo a 'line', 'pie', etc.
      data: {
        labels: ['Pendientes', 'Procesadas'],
        datasets: [{
          label: '#Novedades ' + (this.novedadPendiente + this.novedadProcesada),
          data: [this.novedadPendiente, this.novedadProcesada],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
        }
      }
    });
  }

  graficoPagos() {
    this.graficoPagosMensuales = new Chart("graficoPagosMensuales", {
      type: 'bar',
      data: {
        labels: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        datasets: [{
          label: 'Pagos 2024',
          data: [12, 19, 3, 5, 2, 3, 10, 15, 7, 6, 8, 11], // Ejemplo de datos
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
