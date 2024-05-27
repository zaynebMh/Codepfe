import { Projet } from "../projet/projet.model";

export interface Etablissement {
  id: number;
 nom: string;
  address: string;
  user_id: number;
  cout_projet : number;
  cout_contrat: number;
  cout_facture: number;
  projets: Projet[];
  }