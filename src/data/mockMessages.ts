export const messages = [
  {
    _id: '678bb0d72b8d1da88e976d68',
    type: 'fan',
    from: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    content: 'Your latest track is amazing! The production quality is insane!',
    date: '2024-03-16',
    isRead: false,
    history: [
      { sender: 'John Doe', content: 'Been following your work for months!', timestamp: '2024-03-16T10:00:00' },
      { sender: 'You', content: 'Thanks for the support! Really appreciate it.', timestamp: '2024-03-16T10:05:00' },
      { sender: 'John Doe', content: 'Your latest track is amazing! The production quality is insane!', timestamp: '2024-03-16T10:10:00' }
    ]
  },
  {
    _id: '678bb0f42b8d1da88e976d6c',
    type: 'fan',
    from: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    content: 'Your latest track is amazing! The production quality is insane!',
    date: '2024-03-16',
    isRead: false,
    history: [
      { sender: 'John Doe', content: 'Been following your work for months!', timestamp: '2024-03-16T10:00:00' },
      { sender: 'You', content: 'Thanks for the support! Really appreciate it.', timestamp: '2024-03-16T10:05:00' },
      { sender: 'John Doe', content: 'Your latest track is amazing! The production quality is insane!', timestamp: '2024-03-16T10:10:00' }
    ]
  },
  {
    id: '678bb0f42b8d1da88e976d6c',
    type: 'admin',
    content: 'Your submission for "Beat Battle Championship" has been received.',
    date: '2024-03-15',
    isRead: true,
    competitionName: 'Beat Battle Championship',
    details: {
      submissionDate: '2024-03-15T14:30:00',
      trackName: 'Summer Vibes 2024',
      startDate: '2024-03-18T00:00:00',
      requirements: [
        'Track length: 2-4 minutes',
        'Genre: Hip Hop/Trap',
        'Original composition only',
        'Must include at least one vocal sample'
      ],
      status: 'Pending Review'
    }
  },
  {
    id: 3,
    type: 'result',
    competitionName: 'Electronic Music Challenge',
    content: 'Congratulations! You won 2nd place!',
    prize: '$1,000',
    date: '2024-03-14',
    isRead: true,
    details: {
      scoreBreakdown: {
        originality: 95,
        production: 92,
        arrangement: 88,
        mixing: 90
      },
      judgeComments: [
        {
          judge: 'DJ Spark',
          comment: 'Incredible sound design and creative arrangement. The drop was mind-blowing!'
        },
        {
          judge: 'Producer X',
          comment: 'Outstanding production quality. Mix could use a bit more clarity in the mid-range.'
        }
      ],
      prizeDetails: {
        amount: 1000,
        transferDate: '2024-03-20',
        additional: [
          'Featured spot on next month\'s playlist',
          'Free mixing consultation with Producer X',
          '1-year subscription to Splice'
        ]
      }
    }
  },
  {
    id: 4,
    type: 'dispute',
    competitionName: 'Remix Contest',
    content: 'Your dispute regarding submission timing has been resolved.',
    status: 'Resolved',
    date: '2024-03-13',
    isRead: true,
    history: [
      {
        timestamp: '2024-03-10T15:30:00',
        type: 'user',
        content: 'I experienced technical issues during submission. The upload failed multiple times due to server errors.'
      },
      {
        timestamp: '2024-03-11T09:15:00',
        type: 'admin',
        content: 'We\'re investigating the reported server issues during the submission window.'
      },
      {
        timestamp: '2024-03-12T14:20:00',
        type: 'admin',
        content: 'Our investigation confirmed intermittent server issues during the submission period.'
      },
      {
        timestamp: '2024-03-13T10:00:00',
        type: 'resolution',
        content: 'Dispute resolved: Submission deadline extended by 24 hours for all participants due to verified technical issues.'
      }
    ]
  }
];