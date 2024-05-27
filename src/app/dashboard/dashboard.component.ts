// dashboard.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Chart, { ChartType, ChartDataset } from 'chart.js/auto';
import { Etablissement } from './Etablissement';
import { DashboardService } from './dashboard.service';
import { ProjetService } from '../projet/projet.service';
import { AoService } from '../ao/ao.service';
import { ContratService } from '../contrat/contrat.service';
import { FactureService } from '../facture/facture.service';
import { CompteService } from '../user/compte.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx: CanvasRenderingContext2D | null | undefined;
  public datasets: any;
  public data: any;
  public myChartData: any;
  public turnovers: any[] | undefined;
  public nb = -1;
  loading: boolean = true;
  isArabic: boolean = false;
  numberAppointmentByClient: any;
  percentCancelledAppointment: any;
  newClientsLastTwoMonths: any;
  totalPrices: number = 0;
  etablissements: Etablissement[] = [];
  public nbProjets: number = 0;
  public nbao: number = 0;
  public nbContrat: number = 0;
  public nbFactures: number = 0;
  public totalMontantFactures: number = 0;
  public totalMontantContrats: number = 0;
  public comptes: any[] = [];
  public nbComptes: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private projetService: ProjetService,
    private aoService: AoService,
    private contratService: ContratService,
    private factureService: FactureService,
    private compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getAllEtablissements().subscribe(data => {
      this.etablissements = data;
      
      const canvas3 = document.getElementById('myChart3') as HTMLCanvasElement;
      const ctx3 = canvas3?.getContext('2d');
      
      const labels = this.etablissements.map(etab => etab.nom);
      const projectCosts = this.etablissements.map(etab => etab.cout_projet);
      
      this.createChart(ctx3, 'bar', labels, projectCosts);
    });

    this.projetService.getAllProjets().subscribe(projets => {
      this.nbProjets = projets.length;
    });

    this.aoService.getAllAOs().subscribe(ao => {
      this.nbao = ao.length;
    });

    this.contratService.getAllContrats().subscribe(contrats => {
      this.nbContrat = contrats.length;
      this.totalMontantContrats = contrats.reduce((sum, contrat) => sum + contrat.montant, 0);
    });

    this.factureService.getAllFactures().subscribe(factures => {
      this.nbFactures = factures.length;
      this.totalMontantFactures = factures.reduce((sum, facture) => sum + facture.montant, 0);

      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      this.ctx = canvas?.getContext('2d');
      const labels = ['Projects', 'Contracts', 'Invoices', 'AOs']; 
      const data = [this.nbProjets, this.nbContrat, this.nbFactures, this.nbao];
    
      this.createChart(this.ctx, 'pie', labels, data);
      const canvas2 = document.getElementById('myChart2') as HTMLCanvasElement;
      const ctx2 = canvas2?.getContext('2d');
      this.createChart(ctx2, 'bar', ['Nombre de factures', 'Montant total des factures', 'Nombre de contrats', 'Montant total des contrats'], [this.nbFactures, this.totalMontantFactures, this.nbContrat, this.totalMontantContrats]);
    });
    this.compteService.getAllComptes().subscribe(comptes => {
      this.comptes = comptes;
      this.nbComptes = comptes.length;
    });
  }


  private createChart(ctx: CanvasRenderingContext2D | null | undefined, chartType: ChartType, labels: string[], data: number[]) {
    if (ctx) {
      const datasets: ChartDataset<ChartType>[] = [{
        data: data,
        backgroundColor: [
          'rgba(16, 175, 61, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderColor: [
          'rgba(16, 175, 61, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }];

      new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: false
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Coût des Projets par Établissement'
            }
          }
        },
      });
    }
  }
}
