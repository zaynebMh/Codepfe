export interface Ao{
  id: undefined;
  intitule: string;
  etablissement: string;
  montant: number;
  ref: number;
  projet_id: number | undefined ;
  contratIds: number[];
  facturesIds: number[];
}