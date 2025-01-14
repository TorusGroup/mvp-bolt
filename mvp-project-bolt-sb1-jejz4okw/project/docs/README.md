# MVP Factory - Documentação

## Visão Geral

O MVP Factory é uma plataforma inovadora projetada para revolucionar o processo de desenvolvimento de MVPs (Minimum Viable Products) através da integração de múltiplos modelos de Inteligência Artificial. A plataforma oferece uma abordagem única que combina metodologias ágeis, design thinking e uma equipe virtual de IAs especializadas para acelerar e otimizar o processo de desenvolvimento.

## Arquitetura do Sistema

### 1. Frontend
- **Framework**: React + TypeScript
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: Hooks personalizados
- **Persistência**: IndexedDB (idb)
- **Ícones**: Lucide React

### 2. Integrações de IA
- OpenAI gpt-4-o-mini
- Suporte planejado para Anthropic, Google Gemini e Groq

### 3. Armazenamento
- IndexedDB para persistência local
- Sistema de arquivos virtual para projetos

## Componentes Principais

### 1. Arquiteto AI
O Arquiteto AI é o componente central da plataforma, responsável por:

#### Análise e Planejamento
- Compreensão profunda do problema
- Identificação de requisitos
- Avaliação de riscos e oportunidades
- Definição de estratégias

#### Gestão de Equipe AI
- Seleção de agentes especializados
- Definição de papéis
- Coordenação de interações
- Resolução de conflitos

#### Supervisão Técnica
- Revisão de entregas
- Garantia de qualidade
- Orientação técnica
- Documentação

### 2. Sistema de Chat
- Interface em tempo real
- Formatação Markdown
- Suporte a múltiplos tipos de mensagens
- Visualização de cadeia de pensamento
- Logs de API

### 3. Gestão de Projetos
- Múltiplos estágios de projeto
- Timeline visual
- Sistema de tarefas
- Equipes virtuais

## Fluxo de Trabalho

### 1. Criação do Projeto
1. Definição do problema
2. Análise inicial pelo Arquiteto AI
3. Planejamento de fases
4. Configuração da metodologia

### 2. Montagem da Equipe
1. Análise de necessidades
2. Seleção de agentes
3. Configuração de personalidades
4. Definição de objetivos

### 3. Desenvolvimento
1. Sprints iterativos
2. Revisões contínuas
3. Ajustes de estratégia
4. Documentação automática

### 4. Entrega
1. Validação final
2. Documentação completa
3. Empacotamento
4. Deployment

## Estágios do Projeto

1. **Aguardando Planejamento (Empty)**
   - Estado inicial após criação
   - Aguardando análise do Arquiteto AI

2. **Planejado (Planned)**
   - Projeto analisado
   - Metodologia definida
   - Requisitos documentados

3. **Recrutando Equipe (Recruiting)**
   - Seleção de agentes
   - Definição de papéis
   - Configuração de personalidades

4. **Pronto para Iniciar (Ready)**
   - Equipe completa
   - Backlog criado
   - Processos definidos

5. **Em Andamento (Ongoing)**
   - Execução ativa
   - Interações entre agentes
   - Desenvolvimento iterativo

6. **Concluído (Completed)**
   - Objetivos alcançados
   - Documentação finalizada
   - Resultados validados

## Tecnologias e Dependências

### Core
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1

### Integrações
- OpenAI API
- IndexedDB (idb 8.0.0)
- Lucide React 0.344.0

### Desenvolvimento
- ESLint 9.9.1
- PostCSS 8.4.35
- Autoprefixer 10.4.18

## Configuração do Ambiente

### Requisitos
- Node.js 18+
- NPM 9+

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Variáveis de Ambiente
```env
OPENAI_API_KEY=sk-xxx    # Chave da API OpenAI
ANTHROPIC_API_KEY=sk-xxx # Chave da API Anthropic (futura)
GEMINI_API_KEY=xxx      # Chave da API Google Gemini (futura)
GROQ_API_KEY=gsk-xxx    # Chave da API Groq (futura)
```

## Contribuição

### Padrões de Código
- ESLint para linting
- Prettier para formatação
- TypeScript strict mode
- Commits semânticos

### Fluxo de Trabalho
1. Fork do repositório
2. Criar branch feature/fix
3. Desenvolver e testar
4. Criar Pull Request

## Roadmap

### Curto Prazo
- [ ] Implementação completa do Arquiteto AI
- [ ] Sistema de chat aprimorado
- [ ] Gestão de equipe AI

### Médio Prazo
- [ ] Integrações com mais provedores de IA
- [ ] Sistema de templates de projeto
- [ ] Análise avançada de dados

### Longo Prazo
- [ ] Recursos enterprise
- [ ] Marketplace de agentes AI
- [ ] Integração com CI/CD
