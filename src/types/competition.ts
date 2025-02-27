export interface Competition {
  title: string;
  prize: string;
  status: 'Live' | 'Upcoming';
  entryFee: string;
  genre: string;
  participants: string;
  deadline: string;
  description: string;
  image: string;
}