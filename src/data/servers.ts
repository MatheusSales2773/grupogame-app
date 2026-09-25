import type { ImageSource } from 'expo-image';

export type Player = {
  id: string;
  name: string;
  initials: string;
  avatar?: ImageSource | number;
  status: 'available' | 'busy';
};

export type Server = {
  id: string;
  name: string;
  description: string;
  game: string;
  image: ImageSource | number;
  isAdmin: boolean;
  banner: ImageSource | number;
  players: Player[];
};

// O mesmo grupo fictício participa dos servidores desta demonstração.
const players: Player[] = [
  {
    id: 'tiago', name: 'Tiago Luchtenberg', initials: 'TL', status: 'available',
    avatar: require('@/assets/images/home/avatar.png'),
  },
  { id: 'rodrigo', name: 'Rodrigo Gonçalves', initials: 'RG', status: 'busy' },
  { id: 'diego', name: 'Diego Fernandes', initials: 'DF', status: 'busy' },
];

export const servers: Server[] = [
  {
    id: 'lendarios', name: 'Lendários',
    game: 'League of Legends', image: require('@/assets/images/home/league-of-legends.png'), isAdmin: false,
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida de md10',
    banner: require('@/assets/images/servers/banner.png'), players,
  },
  {
    id: 'yeah-boy', name: 'Yeah, boy',
    game: 'Red Dead Redemption 2', image: require('@/assets/images/home/red-dead-redemption-2.jpg'), isAdmin: false,
    description: 'Reúna os amigos para explorar o Velho Oeste e se divertir em equipe.',
    banner: require('@/assets/images/home/red-dead-redemption-2.jpg'), players,
  },
  {
    id: 'rumo-ao-topo', name: 'Rumo ao topo',
    game: 'Counter-Strike', image: require('@/assets/images/home/counter-strike.png'), isAdmin: true,
    description: 'Um duelo entre amigos para treinar a mira e melhorar a cada rodada.',
    banner: require('@/assets/images/home/counter-strike.png'), players,
  },
  {
    id: 'bora-queimar-tudo', name: 'Bora queimar tudo',
    game: 'Apex Legends', image: require('@/assets/images/home/apex-legends.png'), isAdmin: false,
    description: 'Prepare seu esquadrão para buscar a vitória na próxima partida.',
    banner: require('@/assets/images/home/apex-legends.png'), players,
  },
  {
    id: 'valorosos', name: 'Valorosos',
    game: 'Valorant', image: require('@/assets/images/home/valorant.png'), isAdmin: false,
    description: 'Uma partida entre amigos para praticar estratégias e jogar juntos.',
    banner: require('@/assets/images/home/valorant.png'), players,
  },
  {
    id: 'exploradores', name: 'Exploradores',
    game: 'World of Warcraft', image: require('@/assets/images/home/world-of-warcraft.png'), isAdmin: false,
    description: 'Vamos explorar novos caminhos e treinar em grupo nesta aventura.',
    banner: require('@/assets/images/home/world-of-warcraft.png'), players,
  },
];
