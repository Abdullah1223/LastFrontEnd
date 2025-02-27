import React, { useState } from 'react';
import { DollarSign, Search, Filter, ArrowUpRight, ArrowDownRight, Download, AlertCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'payout' | 'deposit' | 'withdrawal' | 'refund';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payout',
    amount: 5000,
    status: 'completed',
    user: {
      name: 'Alex Thompson',
      email: 'alex@example.com',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=64&h=64&fit=crop'
    },
    date: '2024-03-20T15:30:00',
    reference: 'PAY-2024-001'
  },
  {
    id: '2',
    type: 'deposit',
    amount: 1000,
    status: 'pending',
    user: {
      name: 'Sarah Parker',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop'
    },
    date: '2024-03-20T14:45:00',
    reference: 'DEP-2024-002'
  }
];

export function PaymentManagementPage() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payout':
        return <ArrowUpRight className="w-4 h-4 text-orange-500" />;
      case 'deposit':
        return <ArrowDownRight className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'refund':
        return <ArrowDownRight className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Payment Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor and manage platform transactions
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">$45,250</p>
            <p className="text-sm text-green-500 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Pending Payouts</h3>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">$12,450</p>
            <p className="text-sm text-gray-500 mt-2">15 transactions</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Processing Fee</h3>
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">$1,250</p>
            <p className="text-sm text-orange-500 mt-2">2.5% average rate</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Failed Transactions</h3>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-red-500 mt-2">Requires attention</p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setShowDetailsModal(true);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{transaction.type}</div>
                          <div className="text-sm text-gray-500">{transaction.reference}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={transaction.user.avatar} 
                          alt="" 
                          className="w-8 h-8 rounded-full mr-3" 
                        />
                        <div>
                          <div className="font-medium">{transaction.user.name}</div>
                          <div className="text-sm text-gray-500">{transaction.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-medium">
                        ${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Transaction Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Reference</label>
                <p className="font-medium">{selectedTransaction.reference}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Type</label>
                <p className="font-medium capitalize">{selectedTransaction.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Amount</label>
                <p className="font-medium">${selectedTransaction.amount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">User</label>
                <p className="font-medium">{selectedTransaction.user.name}</p>
                <p className="text-sm text-gray-500">{selectedTransaction.user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <p className="font-medium capitalize">{selectedTransaction.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">
                  {new Date(selectedTransaction.date).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedTransaction(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}