export interface FanMessageHistory {
  sender: string;
  content: string;
  timestamp: string;
}

export interface AdminMessageDetails {
  submissionDate: string;
  trackName: string;
  startDate: string;
  requirements: string[];
  status: string;
}

export interface ResultMessageDetails {
  scoreBreakdown: Record<string, number>;
  judgeComments: Array<{
    judge: string;
    comment: string;
  }>;
  prizeDetails: {
    amount: number;
    transferDate: string;
    additional: string[];
  };
}

export interface DisputeHistory {
  timestamp: string;
  type: string;
  content: string;
}

export interface Message {
  chat_id:string;
  lastMessage:any;
  name:string;
  role:string;
  timestamp:string,
  participant_id:string,
  _id: number;
  type: 'fan' | 'admin' | 'result' | 'dispute';
  from?: string;
  avatar?: string;
  content: string;
  date: string;
  isRead: boolean;
  competitionName?: string;
  prize?: string;
  feedback?: string;
  status?: string;
  resolution?: string;
  history?: FanMessageHistory[] | DisputeHistory[];
  details?: AdminMessageDetails | ResultMessageDetails;
}