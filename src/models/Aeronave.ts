
import { TipoAeronave } from '../enums/TipoAeronave';
import { Peca } from './Peca';
import { Etapa } from './Etapa';
import { Teste } from './Teste';

export class Aeronave {
  constructor(
    public codigo: string,
    public modelo: string,
    public tipo: TipoAeronave,
    public capacidade: number,
    public alcance: number,
    public pecas: Peca[] = [],
    public etapas: Etapa[] = [],
    public testes: Teste[] = []
  ) {}

  exibirDetalhes(): string {
    return `
Aeronave:
  Código: ${this.codigo}
  Modelo: ${this.modelo}
  Tipo: ${this.tipo}
  Capacidade: ${this.capacidade} passageiros
  Alcance: ${this.alcance} km
  Peças: ${this.pecas.length}
  Etapas: ${this.etapas.length}
  Testes: ${this.testes.length}
`;
  }

  toJSON(): any {
    return {
      codigo: this.codigo,
      modelo: this.modelo,
      tipo: this.tipo,
      capacidade: this.capacidade,
      alcance: this.alcance,
      pecas: this.pecas.map(peca => peca.toJSON()),
      etapas: this.etapas.map(etapa => etapa.toJSON()),
      testes: this.testes.map(teste => teste.toJSON())
    };
  }

  static fromJSON(json: any): Aeronave {
    const aeronave = new Aeronave(
      json.codigo,
      json.modelo,
      json.tipo,
      json.capacidade,
      json.alcance
    );
    
    aeronave.pecas = json.pecas ? json.pecas.map((peca: any) => Peca.fromJSON(peca)) : [];
    aeronave.etapas = json.etapas ? json.etapas.map((etapa: any) => Etapa.fromJSON(etapa)) : [];
    aeronave.testes = json.testes ? json.testes.map((teste: any) => Teste.fromJSON(teste)) : [];
    
    return aeronave;
  }
}