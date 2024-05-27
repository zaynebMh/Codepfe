import { Contrat } from "../contrat/contrat.model";

export interface Facture {
  id: any;
  intitule: string;
  etablissement:string;
  montant: number;
  ref: number;
  contrat_id: number | undefined;

}
  
  