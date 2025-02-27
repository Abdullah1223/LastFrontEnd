export interface Competition {
  title: string;
  prize: string;
  status: 'Live' | 'Upcoming';
  entryFee: string;
  genre: string;
  participants: string;
  deadline: string;
  description: string;
}

export interface Artist {
  name: string;
  genre: string;
  image: string;
  achievements: string;
  followers: string;
}

export interface Event {
  _id:any
  title: string;
  startdate: string;
  location: string;
  image: string;
  description: string;
}