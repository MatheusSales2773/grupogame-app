import type { ImageSource } from 'expo-image';

// União de strings: TypeScript aceita somente estes quatro IDs de categoria.
// Tipos ajudam a encontrar erros durante o desenvolvimento; não são dados de uma API.
export type CategoryId = 'ranked' | 'duel' | 'fun' | 'training';

export type Category = {
  id: CategoryId;
  title: string;
  matchLabel: string;
  // Aceita uma fonte de imagem do Expo ou o identificador de um asset local via require.
  icon: ImageSource | number;
};

// id identifica a partida na lista; serverId liga a partida aos dados de servers.ts.
// categoryId permite filtrar e localizar o rótulo da categoria sem duplicá-lo.
export type Appointment = {
  id: string;
  serverId: string;
  title: string;
  categoryId: CategoryId;
  date: string;
  time: string;
  isHost: boolean;
  image: ImageSource | number;
};

// Perfil fictício usado na saudação. Não existe sessão autenticada neste projeto.
export const user = {
  name: 'Tiago',
  message: 'Hoje é dia de vitória',
  avatar: require('@/assets/images/home/avatar.png'),
};

// Array compartilhado entre Home e Agendar. [] no tipo significa lista de Category.
// export permite importar os mesmos dados em vários componentes.
export const categories: Category[] = [
  { id: 'ranked', title: 'Ranqueada', matchLabel: 'Ranqueada', icon: require('@/assets/images/home/ranked.svg') },
  { id: 'duel', title: 'Duelo 1x1', matchLabel: '1x1', icon: require('@/assets/images/home/duel.svg') },
  { id: 'fun', title: 'Diversão', matchLabel: 'Diversão', icon: require('@/assets/images/home/fun.svg') },
  { id: 'training', title: 'Treino', matchLabel: 'Treino', icon: require('@/assets/images/home/training.svg') },
];

// Dados de demonstração: não são eventos reais nem dependem de uma API.
export const appointments: Appointment[] = [
  {
    id: 'match-1', serverId: 'lendarios', title: 'Lendários', categoryId: 'ranked',
    date: '18/06', time: '21:00', isHost: true,
    image: require('@/assets/images/home/league-of-legends.png'),
  },
  {
    id: 'match-2', serverId: 'yeah-boy', title: 'Yeah, boy', categoryId: 'fun',
    date: '23/06', time: '19:00', isHost: false,
    image: require('@/assets/images/home/red-dead-redemption-2.jpg'),
  },
  {
    id: 'match-3', serverId: 'rumo-ao-topo', title: 'Rumo ao topo', categoryId: 'duel',
    date: '20/06', time: '09:00', isHost: true,
    image: require('@/assets/images/home/counter-strike.png'),
  },
  {
    id: 'match-4', serverId: 'bora-queimar-tudo', title: 'Bora queimar tudo', categoryId: 'ranked',
    date: '20/06', time: '14:20', isHost: true,
    image: require('@/assets/images/home/apex-legends.png'),
  },
  {
    id: 'match-5', serverId: 'valorosos', title: 'Valorosos', categoryId: 'fun',
    date: '18/06', time: '21:00', isHost: true,
    image: require('@/assets/images/home/valorant.png'),
  },
  {
    // A sexta partida não está visível na referência; este item é fictício.
    id: 'match-6', serverId: 'exploradores', title: 'Exploradores', categoryId: 'training',
    date: '25/06', time: '20:00', isHost: false,
    image: require('@/assets/images/home/world-of-warcraft.png'),
  },
];
