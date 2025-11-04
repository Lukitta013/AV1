import { Funcionario } from '../models/Funcionario';
import { NivelPermissao } from '../enums/NivelPermissao';
import { StorageService } from './StorageService';

export class AuthService {
  private funcionarios: Funcionario[] = [];
  private usuarioLogado: Funcionario | null = null;

  constructor() {
    this.carregarFuncionarios();
    this.criarAdminPadrao();
  }

  private carregarFuncionarios(): void {
    this.funcionarios = StorageService.carregarFuncionarios();
  }

  private criarAdminPadrao(): void {
    if (this.funcionarios.length === 0) {
      const admin = new Funcionario(
        '1',
        'Administrador',
        '(11) 99999-9999',
        'São José dos Campos, SP',
        'admin',
        'admin123',
        NivelPermissao.ADMINISTRADOR
      );
      this.funcionarios.push(admin);
      StorageService.salvarFuncionarios(this.funcionarios);
    }
  }

  login(usuario: string, senha: string): boolean {
    const funcionario = this.funcionarios.find(f => 
      f.usuario === usuario && f.autenticar(usuario, senha)
    );

    if (funcionario) {
      this.usuarioLogado = funcionario;
      return true;
    }

    return false;
  }

  logout(): void {
    this.usuarioLogado = null;
  }

  getUsuarioLogado(): Funcionario | null {
    return this.usuarioLogado;
  }

  temPermissao(nivelRequerido: NivelPermissao): boolean {
    if (!this.usuarioLogado) return false;

    const hierarquia = {
      [NivelPermissao.ADMINISTRADOR]: 3,
      [NivelPermissao.ENGENHEIRO]: 2,
      [NivelPermissao.OPERADOR]: 1
    };

    return hierarquia[this.usuarioLogado.nivelPermissao] >= hierarquia[nivelRequerido];
  }

  cadastrarFuncionario(funcionario: Funcionario): boolean {
    if (!this.temPermissao(NivelPermissao.ADMINISTRADOR)) {
      return false;
    }

    if (this.funcionarios.find(f => f.id === funcionario.id || f.usuario === funcionario.usuario)) {
      return false;
    }

    this.funcionarios.push(funcionario);
    StorageService.salvarFuncionarios(this.funcionarios);
    return true;
  }
}