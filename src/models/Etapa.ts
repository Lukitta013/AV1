import { StatusEtapa } from '../enums/StatusEtapa';
import { Funcionario } from './Funcionario';

export class Etapa {
  public funcionarios: Funcionario[] = [];

  constructor(
    public nome: string,
    public prazo: Date,
    public status: StatusEtapa = StatusEtapa.PENDENTE
  ) {}

  iniciar(): void {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO;
    }
  }

  finalizar(): void {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA;
    }
  }

  associarFuncionario(funcionario: Funcionario): void {
    if (!this.funcionarios.find(f => f.id === funcionario.id)) {
      this.funcionarios.push(funcionario);
    }
  }

  listarFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  toJSON(): any {
    return {
      nome: this.nome,
      prazo: this.prazo.toISOString(),
      status: this.status,
      funcionarios: this.funcionarios.map(func => func.toJSON())
    };
  }

  static fromJSON(json: any): Etapa {
    const etapa = new Etapa(
      json.nome,
      new Date(json.prazo),
      json.status
    );
    
    etapa.funcionarios = json.funcionarios ? json.funcionarios.map((func: any) => Funcionario.fromJSON(func)) : [];
    
    return etapa;
  }
}