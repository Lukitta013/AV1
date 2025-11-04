import { Aeronave } from '../models/Aeronave';
import { Peca } from '../models/Peca';
import { Etapa } from '../models/Etapa';
import { Funcionario } from '../models/Funcionario';
import { Teste } from '../models/Teste';

export class StorageService {
  private static readonly AERONAVES_FILE = 'data/aeronaves.json';
  private static readonly PECAS_FILE = 'data/pecas.json';
  private static readonly ETAPAS_FILE = 'data/etapas.json';
  private static readonly FUNCIONARIOS_FILE = 'data/funcionarios.json';
  private static readonly TESTES_FILE = 'data/testes.json';

  static salvarAeronaves(aeronaves: Aeronave[]): void {
    this.salvarArquivo(this.AERONAVES_FILE, aeronaves);
  }

  static carregarAeronaves(): Aeronave[] {
    const dados = this.carregarArquivo(this.AERONAVES_FILE);
    return dados ? dados.map((aeronave: any) => Aeronave.fromJSON(aeronave)) : [];
  }

  static salvarPecas(pecas: Peca[]): void {
    this.salvarArquivo(this.PECAS_FILE, pecas);
  }

  static carregarPecas(): Peca[] {
    const dados = this.carregarArquivo(this.PECAS_FILE);
    return dados ? dados.map((peca: any) => Peca.fromJSON(peca)) : [];
  }

  static salvarEtapas(etapas: Etapa[]): void {
    this.salvarArquivo(this.ETAPAS_FILE, etapas);
  }

  static carregarEtapas(): Etapa[] {
    const dados = this.carregarArquivo(this.ETAPAS_FILE);
    return dados ? dados.map((etapa: any) => Etapa.fromJSON(etapa)) : [];
  }

  static salvarFuncionarios(funcionarios: Funcionario[]): void {
    this.salvarArquivo(this.FUNCIONARIOS_FILE, funcionarios);
  }

  static carregarFuncionarios(): Funcionario[] {
    const dados = this.carregarArquivo(this.FUNCIONARIOS_FILE);
    return dados ? dados.map((funcionario: any) => Funcionario.fromJSON(funcionario)) : [];
  }

  static salvarTestes(testes: Teste[]): void {
    this.salvarArquivo(this.TESTES_FILE, testes);
  }

  static carregarTestes(): Teste[] {
    const dados = this.carregarArquivo(this.TESTES_FILE);
    return dados ? dados.map((teste: any) => Teste.fromJSON(teste)) : [];
  }

  private static salvarArquivo(nomeArquivo: string, dados: any[]): void {
    const fs = require('fs');
    const path = require('path');
    
    // Criar diretório se não existir
    const dir = path.dirname(nomeArquivo);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(nomeArquivo, JSON.stringify(dados, null, 2), 'utf8');
  }

  private static carregarArquivo(nomeArquivo: string): any[] | null {
    const fs = require('fs');
    
    try {
      if (fs.existsSync(nomeArquivo)) {
        const dados = fs.readFileSync(nomeArquivo, 'utf8');
        return JSON.parse(dados);
      }
    } catch (error) {
      console.error(`Erro ao carregar arquivo ${nomeArquivo}:`, error);
    }
    
    return null;
  }
}