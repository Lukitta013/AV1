import { TipoPeca, StatusPeca } from '../enums';

export class Peca {
  constructor(
    public nome: string,
    public tipo: TipoPeca,
    public fornecedor: string,
    public status: StatusPeca
  ) {}

  atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
  }

  toJSON(): any {
    return {
      nome: this.nome,
      tipo: this.tipo,
      fornecedor: this.fornecedor,
      status: this.status
    };
  }

  static fromJSON(json: any): Peca {
    return new Peca(
      json.nome,
      json.tipo,
      json.fornecedor,
      json.status
    );
  }
}