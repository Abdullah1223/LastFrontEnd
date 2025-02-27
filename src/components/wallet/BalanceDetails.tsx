import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, DollarSign, CreditCard, X, AlertCircle } from 'lucide-react';

interface BalanceDetailsProps {
  onClose: () => void;
}

const mockPendingTransactions = [
  {
    id: 1,
    type: 'withdrawal',
    amount: 500,
    status: 'processing',
    eta: '2-3 business days',
    destination: 'Bank Account (*1234)'
  },
  {
    id: 2,
    type: 'deposit',
    amount: 1000,
    status: 'pending',
    source: 'Credit Card (*5678)',
    eta: '~30 minutes'
  }
];

const mockTransactions = [
  {
    id: 1,
    type: 'deposit',
    amount: 2500,
    date: '2024-03-15',
    source: 'Competition Winnings - Beat Battle',
    status: 'completed'
  },
  {
    id: 2,
    type: 'withdrawal',
    amount: -1000,
    date: '2024-03-14',
    destination: 'Bank Account (*1234)',
    status: 'completed'
  },
  {
    id: 3,
    type: 'deposit',
    amount: 750,
    date: '2024-03-13',
    source: 'Fan Donations',
    status: 'completed'
  }
];

export function BalanceDetails({ onClose }: BalanceDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Balance Details</h2>
              <p className="text-gray-500">View your transaction history and manage your funds</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-4 rounded-xl text-white">
              <h3 className="text-sm font-medium mb-2">Available Balance</h3>
              <p className="text-2xl font-bold">$1,275.50</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl text-white">
              <h3 className="text-sm font-medium mb-2">Pending</h3>
              <p className="text-2xl font-bold">$1,000.00</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl text-white">
              <h3 className="text-sm font-medium mb-2">Monthly Earnings</h3>
              <p className="text-2xl font-bold">$3,250.00</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Pending Transactions</h3>
            <div className="space-y-3">
              {mockPendingTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'withdrawal'
                        ? 'bg-orange-100 dark:bg-orange-900'
                        : 'bg-green-100 dark:bg-green-900'
                    }`}>
                      {transaction.type === 'withdrawal' ? (
                        <ArrowUpRight className="w-5 h-5 text-orange-500" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type === 'withdrawal' ? 'Withdrawal to' : 'Deposit from'}{' '}
                        {transaction.type === 'withdrawal' ? transaction.destination : transaction.source}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>ETA: {transaction.eta}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${transaction.amount.toFixed(2)}</p>
                    <p className="text-sm text-yellow-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
            <div className="space-y-2">
              {mockTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'withdrawal'
                          ? 'bg-orange-100 dark:bg-orange-900'
                          : 'bg-green-100 dark:bg-green-900'
                      }`}>
                        {transaction.type === 'withdrawal' ? (
                          <ArrowUpRight className="w-5 h-5 text-orange-500" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.source || transaction.destination}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      transaction.type === 'withdrawal'
                        ? 'text-orange-500'
                        : 'text-green-500'
                    }`}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}