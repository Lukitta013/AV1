import { TipoTeste, ResultadoTeste } from '../enums';

export class Teste {
  constructor(
    public tipo: TipoTeste,
    public resultado: ResultadoTeste
  ) {}

  toJSON(): any {
    return {
      tipo: this.tipo,
      resultado: this.resultado
    };
  }

  static fromJSON(json: any): Teste {
    return new Teste(
      json.tipo,
      json.resultado
    );
  }
}