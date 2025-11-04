import { Aeronave } from './Aeronave';

export class Relatorio {
  constructor(
    public aeronave: Aeronave,
    public cliente: string,
    public dataEntrega: Date
  ) {}

  gerarRelatorio(): string {
    let relatorio = `RELATÓRIO FINAL DE AERONAVE\n`;
    relatorio += `============================\n\n`;
    relatorio += `Dados da Aeronave:\n`;
    relatorio += `- Código: ${this.aeronave.codigo}\n`;
    relatorio += `- Modelo: ${this.aeronave.modelo}\n`;
    relatorio += `- Tipo: ${this.aeronave.tipo}\n`;
    relatorio += `- Capacidade: ${this.aeronave.capacidade} passageiros\n`;
    relatorio += `- Alcance: ${this.aeronave.alcance} km\n\n`;

    relatorio += `Cliente: ${this.cliente}\n`;
    relatorio += `Data de Entrega: ${this.dataEntrega.toLocaleDateString()}\n\n`;

    relatorio += `Peças Utilizadas:\n`;
    this.aeronave.pecas.forEach(peca => {
      relatorio += `- ${peca.nome} (${peca.tipo}) - ${peca.fornecedor} - Status: ${peca.status}\n`;
    });

    relatorio += `\nEtapas Realizadas:\n`;
    this.aeronave.etapas.forEach(etapa => {
      relatorio += `- ${etapa.nome} - Prazo: ${etapa.prazo.toLocaleDateString()} - Status: ${etapa.status}\n`;
    });

    relatorio += `\nTestes Realizados:\n`;
    this.aeronave.testes.forEach(teste => {
      relatorio += `- ${teste.tipo}: ${teste.resultado}\n`;
    });

    return relatorio;
  }

  salvarRelatorio(nomeArquivo: string): void {
    const fs = require('fs');
    const relatorio = this.gerarRelatorio();
    fs.writeFileSync(nomeArquivo, relatorio, 'utf8');
  }
}