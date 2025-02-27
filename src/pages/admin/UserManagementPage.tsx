import React, { useState } from 'react';
import { Users, Search, Filter, Shield, Ban, Flag, Mail, Edit, User, Star } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'artist' | 'fan' | 'judge' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  avatar: string;
  reportsCount: number;
  verified: boolean;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'artist',
    status: 'active',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=64&h=64&fit=crop',
    reportsCount: 0,
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Parker',
    email: 'sarah@example.com',
    role: 'judge',
    status: 'active',
    joinDate: '2024-02-01',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
    reportsCount: 0,
    verified: true
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'fan',
    status: 'suspended',
    joinDate: '2024-03-01',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    reportsCount: 5,
    verified: false
  }
];

export function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSuspend = (user: UserData) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
  };

  const confirmSuspend = () => {
    if (selectedUser) {
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' }
          : user
      ));
    }
    setShowSuspendModal(false);
    setSelectedUser(null);
  };

  const getRoleColor = (role: UserData['role']) => {
    switch (role) {
      case 'admin':
        return 'text-red-500';
      case 'judge':
        return 'text-yellow-500';
      case 'artist':
        return 'text-green-500';
      default:
        return 'text-blue-500';
    }
  };

  const getStatusColor = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'suspended':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and monitor user accounts
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span className="font-medium">{users.length} Users</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* User List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text <boltAction type="file" filePath="src/pages/admin/UserManagementPage.tsx">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.verified && (
                              <Star className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-2 ${getRoleColor(user.role)}`}>
                        <Shield className="w-4 h-4" />
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.reportsCount > 0 ? (
                        <span className="text-red-500 flex items-center gap-1">
                          <Flag className="w-4 h-4" />
                          {user.reportsCount}
                        </span>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-orange-500 hover:text-orange-600 mr-3"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSuspend(user)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Ban className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select 
                  defaultValue={selectedUser.role}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="artist">Artist</option>
                  <option value="fan">Fan</option>
                  <option value="judge">Judge</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Suspend User Modal */}
      {showSuspendModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              {selectedUser.status === 'suspended' ? 'Reactivate' : 'Suspend'} User
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to {selectedUser.status === 'suspended' ? 'reactivate' : 'suspend'} {selectedUser.name}?
              {selectedUser.status !== 'suspended' && ' This will prevent them from accessing the platform.'}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmSuspend}
                className={`px-4 py-2 rounded-full font-bold text-white ${
                  selectedUser.status === 'suspended'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {selectedUser.status === 'suspended' ? 'Reactivate' : 'Suspend'} User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}