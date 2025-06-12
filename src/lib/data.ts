export type QuizQuestion = {
  id: string;
  text: string;
  options: { value: string; label: string }[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'cameras',
    text: 'Sua casa ou empresa possui câmeras de segurança instaladas?',
    options: [
      { value: 'yes', label: 'Sim, e estão funcionando' },
      { value: 'no', label: 'Não possui' },
      { value: 'yes_not_working', label: 'Sim, mas não tenho certeza se funcionam' },
      { value: 'planning', label: 'Estou planejando instalar' },
    ],
  },
  {
    id: 'alarmSystem',
    text: 'Você utiliza algum tipo de sistema de alarme monitorado?',
    options: [
      { value: 'yes_monitored', label: 'Sim, monitorado por uma empresa' },
      { value: 'yes_not_monitored', label: 'Sim, mas não é monitorado' },
      { value: 'no', label: 'Não utilizo alarmes' },
      { value: 'considering', label: 'Estou considerando adquirir um' },
    ],
  },
  {
    id: 'mainConcern',
    text: 'Qual sua maior preocupação em relação à segurança do seu imóvel/negócio?',
    options: [
      { value: 'theft_robbery', label: 'Roubos e furtos' },
      { value: 'vandalism', label: 'Vandalismo e danos à propriedade' },
      { value: 'fire_accidents', label: 'Incêndios e acidentes' },
      { value: 'internal_threats', label: 'Ameaças internas (funcionários, etc. - para empresas)' },
    ],
  },
];

export type MythItem = {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  masterTip: string;
};

export const mythItems: MythItem[] = [
  {
    id: 'm1',
    statement: 'Alarmes que apenas disparam sirenes são suficientes para espantar invasores.',
    isTrue: false,
    explanation: 'Mito! Embora uma sirene possa assustar inicialmente, invasores experientes podem ignorá-la se não houver uma resposta rápida. Alarmes monitorados que acionam uma central de segurança e, se necessário, as autoridades, são muito mais eficazes.',
    masterTip: 'Priorize sistemas de alarme com monitoramento 24h para uma resposta garantida em caso de incidentes.',
  },
  {
    id: 'm2',
    statement: 'Ter um cachorro grande em casa já garante a segurança contra roubos.',
    isTrue: false,
    explanation: 'Mito! Cães podem ser um elemento de dissuasão, mas não substituem um sistema de segurança completo. Eles podem ser neutralizados, distraídos ou até mesmo não estar presentes no momento da invasão.',
    masterTip: 'Cães são ótimos companheiros e podem alertar, mas complemente sua segurança com tecnologia como câmeras e alarmes.',
  },
  {
    id: 'm3',
    statement: 'Esconder objetos de valor em lugares "secretos" dentro de casa é uma tática infalível.',
    isTrue: false,
    explanation: 'Mito! Ladrões experientes conhecem os esconderijos mais comuns. A melhor proteção para objetos de valor é evitar que o roubo aconteça ou utilizar cofres devidamente instalados e, se possível, monitorados.',
    masterTip: 'Para itens de alto valor, invista em um cofre de segurança e considere soluções de monitoramento específicas.',
  },
];

export const propertyTypes = [
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'escritorio', label: 'Escritório' },
  { value: 'loja', label: 'Loja Comercial' },
  { value: 'industria', label: 'Indústria' },
  { value: 'condominio', label: 'Condomínio (Residencial/Comercial)' },
  { value: 'outro', label: 'Outro' },
];

export const securityPriorities = [
  { value: 'urgente', label: 'Urgente - Preciso de soluções imediatas' },
  { value: 'alta', label: 'Alta - É uma prioridade importante no momento' },
  { value: 'media', label: 'Média - Estou pesquisando e considerando opções' },
  { value: 'baixa', label: 'Apenas buscando informações por enquanto' },
];
