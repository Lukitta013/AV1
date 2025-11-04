import promptSync from 'prompt-sync';
import { AuthService } from '../services/AuthService';
import { StorageService } from '../services/StorageService';
import { Aeronave } from '../models/Aeronave';
import { Peca } from '../models/Peca';
import { Etapa } from '../models/Etapa';
import { Funcionario } from '../models/Funcionario';
import { Teste } from '../models/Teste';
import { Relatorio } from '../models/Relatorio';
import { 
  TipoAeronave, 
  TipoPeca, 
  StatusPeca, 
  StatusEtapa, 
  NivelPermissao, 
  TipoTeste, 
  ResultadoTeste 
} from '../enums';

class SistemaAerocode {
  private prompt: promptSync.Prompt;
  private authService: AuthService;
  private aeronaves: Aeronave[];
  private pecas: Peca[];
  private etapas: Etapa[];
  private testes: Teste[];

  constructor() {
    this.prompt = promptSync({ sigint: true });
    this.authService = new AuthService();
    this.aeronaves = [];
    this.pecas = [];
    this.etapas = [];
    this.testes = [];
    this.carregarDados();
  }
  private carregarDados(): void {
    this.aeronaves = StorageService.carregarAeronaves();
    this.pecas = StorageService.carregarPecas();
    this.etapas = StorageService.carregarEtapas();
    this.testes = StorageService.carregarTestes();
  }

  private salvarDados(): void {
    StorageService.salvarAeronaves(this.aeronaves);
    StorageService.salvarPecas(this.pecas);
    StorageService.salvarEtapas(this.etapas);
    StorageService.salvarTestes(this.testes);
  }

  public executar(): void {
    console.log('=== SISTEMA AEROCODE ===');
    console.log('Sistema de Gestão para Produção de Aeronaves\n');

    while (true) {
      if (!this.authService.getUsuarioLogado()) {
        this.menuLogin();
      } else {
        this.menuPrincipal();
      }
    }
  }

  private menuLogin(): void {
    console.log('\n=== LOGIN ===');
    const usuario = this.prompt('Usuário: ');
    const senha = this.prompt('Senha: ', { echo: '*' });

    if (this.authService.login(usuario, senha)) {
      const user = this.authService.getUsuarioLogado();
      console.log(`\nBem-vindo, ${user?.nome}! (${user?.nivelPermissao})`);
    } else {
      console.log('\nUsuário ou senha inválidos!');
    }
  }

  private menuPrincipal(): void {
    console.log('\n=== MENU PRINCIPAL ===');
    console.log('1. Gerenciar Aeronaves');
    console.log('2. Gerenciar Peças');
    console.log('3. Gerenciar Etapas');
    console.log('4. Gerenciar Funcionários');
    console.log('5. Gerenciar Testes');
    console.log('6. Gerar Relatório');
    console.log('7. Logout');
    console.log('0. Sair');

    const opcao = this.prompt('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        this.menuAeronaves();
        break;
      case '2':
        this.menuPecas();
        break;
      case '3':
        this.menuEtapas();
        break;
      case '4':
        this.menuFuncionarios();
        break;
      case '5':
        this.menuTestes();
        break;
      case '6':
        this.gerarRelatorio();
        break;
      case '7':
        this.authService.logout();
        console.log('Logout realizado com sucesso!');
        break;
      case '0':
        console.log('Saindo do sistema...');
        process.exit(0);
      default:
        console.log('Opção inválida!');
    }
  }

  private menuAeronaves(): void {
    console.log('\n=== GERENCIAR AERONAVES ===');
    console.log('1. Cadastrar Aeronave');
    console.log('2. Listar Aeronaves');
    console.log('3. Associar Peça');
    console.log('4. Associar Etapa');
    console.log('5. Associar Teste');
    console.log('6. Voltar');

    const opcao = this.prompt('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        this.cadastrarAeronave();
        break;
      case '2':
        this.listarAeronaves();
        break;
      case '3':
        this.associarPecaAeronave();
        break;
      case '4':
        this.associarEtapaAeronave();
        break;
      case '5':
        this.associarTesteAeronave();
        break;
      case '6':
        return;
      default:
        console.log('Opção inválida!');
    }
  }

  private cadastrarAeronave(): void {
    console.log('\n=== CADASTRAR AERONAVE ===');
    
    const codigo = this.prompt('Código: ');
    if (this.aeronaves.find(a => a.codigo === codigo)) {
      console.log('Já existe uma aeronave com este código!');
      return;
    }

    const modelo = this.prompt('Modelo: ');
    
    console.log('Tipos disponíveis:');
    Object.values(TipoAeronave).forEach((tipo, index) => {
      console.log(`${index + 1}. ${tipo}`);
    });
    const tipoIndex = parseInt(this.prompt('Tipo (número): ')) - 1;
    const tipo = Object.values(TipoAeronave)[tipoIndex];

    const capacidade = parseInt(this.prompt('Capacidade: '));
    const alcance = parseFloat(this.prompt('Alcance (km): '));

    const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
    this.aeronaves.push(aeronave);
    this.salvarDados();

    console.log('Aeronave cadastrada com sucesso!');
  }

  private listarAeronaves(): void {
    console.log('\n=== LISTA DE AERONAVES ===');
    
    if (this.aeronaves.length === 0) {
      console.log('Nenhuma aeronave cadastrada.');
      return;
    }

    this.aeronaves.forEach(aeronave => {
      console.log(aeronave.exibirDetalhes());
    });
  }

  private associarPecaAeronave(): void {
    // Implementação similar para associações
    console.log('Funcionalidade de associação de peças...');
  }

  private associarEtapaAeronave(): void {
    console.log('Funcionalidade de associação de etapas...');
  }

  private associarTesteAeronave(): void {
    console.log('Funcionalidade de associação de testes...');
  }

  private menuPecas(): void {
    console.log('\n=== GERENCIAR PEÇAS ===');
    console.log('1. Cadastrar Peça');
    console.log('2. Listar Peças');
    console.log('3. Atualizar Status');
    console.log('4. Voltar');

    const opcao = this.prompt('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        this.cadastrarPeca();
        break;
      case '2':
        this.listarPecas();
        break;
      case '3':
        this.atualizarStatusPeca();
        break;
      case '4':
        return;
      default:
        console.log('Opção inválida!');
    }
  }

  private cadastrarPeca(): void {
    console.log('\n=== CADASTRAR PEÇA ===');
    
    const nome = this.prompt('Nome: ');
    
    console.log('Tipos disponíveis:');
    Object.values(TipoPeca).forEach((tipo, index) => {
      console.log(`${index + 1}. ${tipo}`);
    });
    const tipoIndex = parseInt(this.prompt('Tipo (número): ')) - 1;
    const tipo = Object.values(TipoPeca)[tipoIndex];

    const fornecedor = this.prompt('Fornecedor: ');
    
    console.log('Status disponíveis:');
    Object.values(StatusPeca).forEach((status, index) => {
      console.log(`${index + 1}. ${status}`);
    });
    const statusIndex = parseInt(this.prompt('Status (número): ')) - 1;
    const status = Object.values(StatusPeca)[statusIndex];

    const peca = new Peca(nome, tipo, fornecedor, status);
    this.pecas.push(peca);
    this.salvarDados();

    console.log('Peça cadastrada com sucesso!');
  }

  private listarPecas(): void {
    console.log('\n=== LISTA DE PEÇAS ===');
    
    if (this.pecas.length === 0) {
      console.log('Nenhuma peça cadastrada.');
      return;
    }

    this.pecas.forEach(peca => {
      console.log(`- ${peca.nome} (${peca.tipo}) - ${peca.fornecedor} - Status: ${peca.status}`);
    });
  }

  private atualizarStatusPeca(): void {
    console.log('\n=== ATUALIZAR STATUS DA PEÇA ===');
    this.listarPecas();
    
    const nome = this.prompt('Nome da peça: ');
    const peca = this.pecas.find(p => p.nome === nome);
    
    if (!peca) {
      console.log('Peça não encontrada!');
      return;
    }

    console.log('Novos status disponíveis:');
    Object.values(StatusPeca).forEach((status, index) => {
      console.log(`${index + 1}. ${status}`);
    });
    const statusIndex = parseInt(this.prompt('Novo status (número): ')) - 1;
    const novoStatus = Object.values(StatusPeca)[statusIndex];

    peca.atualizarStatus(novoStatus);
    this.salvarDados();

    console.log('Status atualizado com sucesso!');
  }

  private menuEtapas(): void {
    console.log('\n=== GERENCIAR ETAPAS ===');
    console.log('1. Cadastrar Etapa');
    console.log('2. Listar Etapas');
    console.log('3. Iniciar Etapa');
    console.log('4. Finalizar Etapa');
    console.log('5. Voltar');

    const opcao = this.prompt('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        this.cadastrarEtapa();
        break;
      case '2':
        this.listarEtapas();
        break;
      case '3':
        this.iniciarEtapa();
        break;
      case '4':
        this.finalizarEtapa();
        break;
      case '5':
        return;
      default:
        console.log('Opção inválida!');
    }
  }

  private cadastrarEtapa(): void {
    console.log('\n=== CADASTRAR ETAPA ===');
    
    const nome = this.prompt('Nome: ');
    const prazoStr = this.prompt('Prazo (YYYY-MM-DD): ');
    const prazo = new Date(prazoStr);

    const etapa = new Etapa(nome, prazo);
    this.etapas.push(etapa);
    this.salvarDados();

    console.log('Etapa cadastrada com sucesso!');
  }

  private listarEtapas(): void {
    console.log('\n=== LISTA DE ETAPAS ===');
    
    if (this.etapas.length === 0) {
      console.log('Nenhuma etapa cadastrada.');
      return;
    }

    this.etapas.forEach(etapa => {
      console.log(`- ${etapa.nome} - Prazo: ${etapa.prazo.toLocaleDateString()} - Status: ${etapa.status}`);
    });
  }

  private iniciarEtapa(): void {
    console.log('\n=== INICIAR ETAPA ===');
    this.listarEtapas();
    
    const nome = this.prompt('Nome da etapa: ');
    const etapa = this.etapas.find(e => e.nome === nome);
    
    if (!etapa) {
      console.log('Etapa não encontrada!');
      return;
    }

    try {
      etapa.iniciar();
      this.salvarDados();
      console.log('Etapa iniciada com sucesso!');
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  private finalizarEtapa(): void {
    console.log('\n=== FINALIZAR ETAPA ===');
    this.listarEtapas();
    
    const nome = this.prompt('Nome da etapa: ');
    const etapa = this.etapas.find(e => e.nome === nome);
    
    if (!etapa) {
      console.log('Etapa não encontrada!');
      return;
    }

    try {
      etapa.finalizar();
      this.salvarDados();
      console.log('Etapa finalizada com sucesso!');
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  private menuFuncionarios(): void {
    console.log('\n=== GERENCIAR FUNCIONÁRIOS ===');
    console.log('1. Cadastrar Funcionário');
    console.log('2. Listar Funcionários');
    console.log('3. Voltar');

    const opcao = this.prompt('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        this.cadastrarFuncionario();
        break;
      case '2':
        this.listarFuncionarios();
        break;
      case '3':
        return;
      default:
        console.log('Opção inválida!');
    }
  }

  private cadastrarFuncionario(): void {
    if (!this.authService.temPermissao(NivelPermissao.ADMINISTRADOR)) {
      console.log('Permissão negada! Apenas administradores podem cadastrar funcionários.');
      return;
    }

    console.log('\n=== CADASTRAR FUNCIONÁRIO ===');
    
    const id = this.prompt('ID: ');
    const nome = this.prompt('Nome: ');
    const telefone = this.prompt('Telefone: ');
    const endereco = this.prompt('Endereço: ');
    const usuario = this.prompt('Usuário: ');
    const senha = this.prompt('Senha: ');
    
    console.log('Níveis de permissão:');
    Object.values(NivelPermissao).forEach((nivel, index) => {
      console.log(`${index + 1}. ${nivel}`);
    });
    const nivelIndex = parseInt(this.prompt('Nível (número): ')) - 1;
    const nivelPermissao = Object.values(NivelPermissao)[nivelIndex];

    const funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao);
    
    if (this.authService.cadastrarFuncionario(funcionario)) {
      console.log('Funcionário cadastrado com sucesso!');
    } else {
      console.log('Erro ao cadastrar funcionário! ID ou usuário já existente.');
    }
  }

  private listarFuncionarios(): void {
    const funcionarios = StorageService.carregarFuncionarios();
    
    console.log('\n=== LISTA DE FUNCIONÁRIOS ===');
    
    if (funcionarios.length === 0) {
      console.log('Nenhum funcionário cadastrado.');
      return;
    }

    funcionarios.forEach(funcionario => {
      console.log(`- ${funcionario.nome} (${funcionario.usuario}) - ${funcionario.nivelPermissao}`);
    });
  }

  private menuTestes(): void {
    console.log('\n=== GERENCIAR TESTES ===');
    console.log('1. Cadastrar Teste');
    console.log('2. Listar Testes');
    console.log('3. Voltar');

    const opcao = this.prompt('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        this.cadastrarTeste();
        break;
      case '2':
        this.listarTestes();
        break;
      case '3':
        return;
      default:
        console.log('Opção inválida!');
    }
  }

  private cadastrarTeste(): void {
    console.log('\n=== CADASTRAR TESTE ===');
    
    console.log('Tipos de teste:');
    Object.values(TipoTeste).forEach((tipo, index) => {
      console.log(`${index + 1}. ${tipo}`);
    });
    const tipoIndex = parseInt(this.prompt('Tipo (número): ')) - 1;
    const tipo = Object.values(TipoTeste)[tipoIndex];

    console.log('Resultados:');
    Object.values(ResultadoTeste).forEach((resultado, index) => {
      console.log(`${index + 1}. ${resultado}`);
    });
    const resultadoIndex = parseInt(this.prompt('Resultado (número): ')) - 1;
    const resultado = Object.values(ResultadoTeste)[resultadoIndex];

    const teste = new Teste(tipo, resultado);
    this.testes.push(teste);
    this.salvarDados();

    console.log('Teste cadastrado com sucesso!');
  }

  private listarTestes(): void {
    console.log('\n=== LISTA DE TESTES ===');
    
    if (this.testes.length === 0) {
      console.log('Nenhum teste cadastrado.');
      return;
    }

    this.testes.forEach(teste => {
      console.log(`- ${teste.tipo}: ${teste.resultado}`);
    });
  }

  private gerarRelatorio(): void {
    console.log('\n=== GERAR RELATÓRIO ===');
    
    if (this.aeronaves.length === 0) {
      console.log('Nenhuma aeronave cadastrada para gerar relatório.');
      return;
    }

    this.listarAeronaves();
    const codigo = this.prompt('Código da aeronave: ');
    const aeronave = this.aeronaves.find(a => a.codigo === codigo);
    
    if (!aeronave) {
      console.log('Aeronave não encontrada!');
      return;
    }

    const cliente = this.prompt('Nome do cliente: ');
    const dataEntregaStr = this.prompt('Data de entrega (YYYY-MM-DD): ');
    const dataEntrega = new Date(dataEntregaStr);

    const relatorio = new Relatorio(aeronave, cliente, dataEntrega);
    const nomeArquivo = `relatorio_${codigo}.txt`;
    
    relatorio.salvarRelatorio(nomeArquivo);
    console.log(`Relatório salvo em: ${nomeArquivo}`);
    
    console.log('\n' + relatorio.gerarRelatorio());
  }
}

// Inicializar o sistema
const sistema = new SistemaAerocode();
sistema.executar();