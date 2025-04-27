
export const userMock = {
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'Sales Manager',
  avatar: 'https://i.pravatar.cc/150?img=44'
};

export const pipelineStages = [
  { id: 'new_leads', name: 'Novos Leads', color: 'pipeline-lead' },
  { id: 'initiated', name: 'Atendimento Iniciado', color: 'pipeline-contact' },
  { id: 'scheduled', name: 'Agendamento', color: 'pipeline-meeting' },
  { id: 'negotiation', name: 'Negociação', color: 'pipeline-negotiation' },
  { id: 'follow_up', name: 'Follow-Up', color: 'pipeline-followup' },
  { id: 'closed', name: 'Vendidos', color: 'pipeline-closed' }
];

export const leadsMock = [
  {
    id: 1,
    name: 'Carlos Silva',
    company: 'Tech Solutions',
    email: 'carlos@techsolutions.com',
    phone: '(11) 98765-4321',
    stage: 'new_leads',
    expectedRevenue: 5000,
    notes: 'Interessado em nosso plano empresarial',
    createdAt: '2025-04-20T10:30:00',
    lastContact: '2025-04-20T10:30:00'
  },
  {
    id: 2,
    name: 'Ana Costa',
    company: 'Marketing Pro',
    email: 'ana@marketingpro.com',
    phone: '(21) 99876-5432',
    stage: 'new_leads',
    expectedRevenue: 3500,
    notes: 'Enviou contato pelo site',
    createdAt: '2025-04-21T09:15:00',
    lastContact: '2025-04-21T09:15:00'
  },
  {
    id: 3,
    name: 'Paulo Mendes',
    company: 'Construções Mendes',
    email: 'paulo@construcoes.com',
    phone: '(31) 97654-3210',
    stage: 'initiated',
    expectedRevenue: 12000,
    notes: 'Primeiro contato via telefone, demonstrou interesse',
    createdAt: '2025-04-19T14:45:00',
    lastContact: '2025-04-22T11:20:00'
  },
  {
    id: 4,
    name: 'Márcia Oliveira',
    company: 'Clínica Saúde',
    email: 'marcia@clinicasaude.com',
    phone: '(41) 96543-2109',
    stage: 'scheduled',
    expectedRevenue: 8000,
    notes: 'Reunião agendada para 05/05 às 14h',
    createdAt: '2025-04-18T16:30:00',
    lastContact: '2025-04-23T10:00:00'
  },
  {
    id: 5,
    name: 'Roberto Almeida',
    company: 'Almeida Motors',
    email: 'roberto@almeidamotors.com',
    phone: '(51) 95432-1098',
    stage: 'negotiation',
    expectedRevenue: 25000,
    notes: 'Negociando valores do contrato anual',
    createdAt: '2025-04-15T13:20:00',
    lastContact: '2025-04-24T15:45:00'
  },
  {
    id: 6,
    name: 'Fernanda Lima',
    company: 'Modas Lima',
    email: 'fernanda@modaslima.com',
    phone: '(61) 94321-0987',
    stage: 'follow_up',
    expectedRevenue: 6800,
    notes: 'Enviar proposta revisada até sexta-feira',
    createdAt: '2025-04-14T11:10:00',
    lastContact: '2025-04-25T09:30:00'
  },
  {
    id: 7,
    name: 'Marcelo Santos',
    company: 'Santos & Associados',
    email: 'marcelo@santosassociados.com',
    phone: '(71) 93210-9876',
    stage: 'closed',
    expectedRevenue: 15000,
    notes: 'Contrato assinado, início em 01/06',
    createdAt: '2025-04-10T10:00:00',
    lastContact: '2025-04-26T14:15:00'
  },
  {
    id: 8,
    name: 'Juliana Pereira',
    company: 'JP Design',
    email: 'juliana@jpdesign.com',
    phone: '(81) 92109-8765',
    stage: 'initiated',
    expectedRevenue: 4500,
    notes: 'Enviado catálogo de serviços',
    createdAt: '2025-04-20T09:45:00',
    lastContact: '2025-04-22T13:40:00'
  },
  {
    id: 9,
    name: 'Eduardo Martins',
    company: 'Martins Consultoria',
    email: 'eduardo@martinsconsult.com',
    phone: '(91) 90987-6543',
    stage: 'closed',
    expectedRevenue: 18000,
    notes: 'Projeto fechado, início imediato',
    createdAt: '2025-04-05T15:30:00',
    lastContact: '2025-04-19T11:25:00'
  }
];

export const weeklyPerformance = [
  { name: 'Segunda', value: 4 },
  { name: 'Terça', value: 7 },
  { name: 'Quarta', value: 5 },
  { name: 'Quinta', value: 9 },
  { name: 'Sexta', value: 12 },
  { name: 'Sábado', value: 3 },
  { name: 'Domingo', value: 0 }
];

export const performanceMetrics = {
  totalLeads: 45,
  newLeadsThisWeek: 12,
  negotiationStage: 8,
  closedDeals: 15,
  totalRevenue: 170000
};
