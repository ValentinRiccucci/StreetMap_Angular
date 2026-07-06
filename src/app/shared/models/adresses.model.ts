

export interface AdresseModel {
  id?: string;
  id_fantoir?: string ;
  numero?: number;
  rep?: string;
  nom_voie?: string;
  code_postal?: number;
  code_insee?: number;
  nom_commune?: string;
  code_insee_ancienne_commune?: number;
  nom_ancienne_commune?: string;
  x?: number;
  y?: number;
  lon?: number;
  lat?: number;
  type_position?: string;
  alias?: string;
  nom_ld?: string;
  libelle_acheminement?: string;
  nom_afnor?: string;
  source_position?: string;
  source_nom_voie?: string;
  certification_commune?: boolean;
  cad_parcelles?: string;
}

export const defaultAdresseModel: AdresseModel = {
  id: undefined,
  id_fantoir: undefined,
  numero: undefined,
  rep: undefined,
  nom_voie: undefined,
  code_postal: undefined,
  code_insee: undefined,
  nom_commune: undefined,
  code_insee_ancienne_commune: undefined,
  nom_ancienne_commune: undefined,
  x: undefined,
  y:undefined,
  lon: undefined,
  lat: undefined,
  type_position: undefined,
  alias: undefined,
  nom_ld: undefined,
  libelle_acheminement:undefined,
  nom_afnor:undefined,
  source_position:undefined,
  source_nom_voie:undefined,
  certification_commune:undefined,
  cad_parcelles:undefined
};
