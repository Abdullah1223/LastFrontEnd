import React, { useState } from 'react';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Users, DollarSign } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { BalanceDetails } from '../components/wallet/BalanceDetails';
import { DonationDetails } from '../components/wallet/DonationDetails';

const mockTransactions = [
  {
    id: 1,
    type: 'deposit',
    amount: 500,
    date: '2024-03-15',
    description: 'Competition winnings - Beat Battle'
  },
  {
    id: 2,
    type: 'fan_donation',
    amount: 50,
    from: 'John Doe',
    date: '2024-03-14',
    message: 'Love your music!'
  },
  {
    id: 3,
    type: 'withdrawal',
    amount: -200,
    date: '2024-03-13',
    description: 'Withdrawal to bank account'
  }
];

export function WalletPage() {
  const { user } = useUser();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showBalanceDetails, setShowBalanceDetails] = useState(false);
  const [showPendingDetails, setShowPendingDetails] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const balance = 1275.50;
  const pendingEarnings = 450.00;
  const fanDonations = 375.00;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount) return;
    
    alert(`Successfully added $${depositAmount} to your wallet!`);
    setShowDepositModal(false);
    setDepositAmount('');
  };

  const renderWalletContent = () => {
    if (user?.role === 'judge') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => setShowBalanceDetails(true)}
              className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Available Balance</h2>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDepositModal(true);
                  }}
                  className="px-4 py-2 bg-white text-orange-500 rounded-full text-sm font-bold hover:bg-orange-50 transition shadow-md"
                >
                  Withdraw
                </button>
              </div>
              <p className="text-3xl font-bold mb-2">${balance.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4" />
                <span>Instant withdrawals available</span>
              </div>
            </div>

            <div 
              onClick={() => setShowPendingDetails(true)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-6 h-6" />
                <h2 className="text-xl font-bold">Pending Earnings</h2>
              </div>
              <p className="text-3xl font-bold mb-2">${pendingEarnings.toFixed(2)}</p>
              <p className="text-sm">From 3 pending reviews</p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => setShowBalanceDetails(true)}
            className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                <h2 className="text-xl font-bold">Available Balance</h2>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDepositModal(true);
                }}
                className="px-4 py-2 bg-white text-orange-500 rounded-full text-sm font-bold hover:bg-orange-50 transition shadow-md"
              >
                {user?.role === 'artist' ? 'Withdraw' : 'Add Funds'}
              </button>
            </div>
            <p className="text-3xl font-bold mb-2">${balance.toFixed(2)}</p>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Instant withdrawals available</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6" />
              <h2 className="text-xl font-bold">
                {user?.role === 'artist' ? 'Fan Donations' : 'Total Donated'}
              </h2>
            </div>
            <p className="text-3xl font-bold mb-2">${fanDonations.toFixed(2)}</p>
            <p className="text-sm">
              {user?.role === 'artist' ? 'From 12 supporters this month' : 'To 8 artists this month'}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {renderWalletContent()}

        {/* Recent Transactions */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Recent Transactions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {transaction.type === 'deposit' ? (
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                          <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                      ) : transaction.type === 'withdrawal' ? (
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                          <ArrowUpRight className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                      ) : (
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                          <DollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {transaction.type === 'fan_donation' 
                            ? `Fan donation from ${transaction.from}`
                            : transaction.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        {transaction.type === 'fan_donation' && transaction.message && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            "{transaction.message}"
                          </p>
                        )}
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
        </section>

        {/* Modals */}
        {showBalanceDetails && (
          <BalanceDetails onClose={() => setShowBalanceDetails(false)} />
        )}

        {showPendingDetails && (
          <DonationDetails onClose={() => setShowPendingDetails(false)} />
        )}

        {/* Deposit/Withdrawal Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">
                {user?.role === 'fan' ? 'Add Funds' : 'Withdraw Funds'}
              </h3>
              <form onSubmit={handleDeposit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="block w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
                  >
                    {user?.role === 'fan' ? 'Add Funds' : 'Withdraw'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}