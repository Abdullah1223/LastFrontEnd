import React, { useState } from 'react';
import { CreditCard, Plus, Download, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function BillingPage() {
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiry: '12/24',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      expiry: '08/25',
      brand: 'Mastercard',
      isDefault: false
    }
  ];

  const transactions = [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Competition Entry Fee - Beat Battle',
      amount: 25.00,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-03-10',
      description: 'Premium Subscription',
      amount: 19.99,
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-03-05',
      description: 'Event Ticket - Summer Festival',
      amount: 149.00,
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Billing & Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your payment methods and view transaction history
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Payment Methods</h2>
            <button
              onClick={() => setShowAddCardModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Payment Method
            </button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {method.brand} •••• {method.last4}
                      </p>
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button className="text-sm text-orange-500 hover:text-orange-600">
                      Make Default
                    </button>
                  )}
                  <button className="text-sm text-red-500 hover:text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Transaction History</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Description</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4">{transaction.description}</td>
                    <td className="py-4">${transaction.amount.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1 ${
                        transaction.status === 'completed'
                          ? 'text-green-500'
                          : 'text-yellow-500'
                      }`}>
                        {transaction.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        <span className="capitalize">{transaction.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Add Payment Method</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="makeDefault"
                  className="rounded text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="makeDefault" className="text-sm text-gray-600 dark:text-gray-400">
                  Make this my default payment method
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}