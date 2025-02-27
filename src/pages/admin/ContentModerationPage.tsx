import React, { useState } from 'react';
import { Flag, Search, Filter, AlertTriangle, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

interface Report {
  id: string;
  type: 'content' | 'user' | 'comment';
  status: 'pending' | 'resolved' | 'dismissed';
  priority: 'high' | 'medium' | 'low';
  reporter: {
    name: string;
    avatar: string;
  };
  reported: {
    name: string;
    avatar: string;
  };
  reason: string;
  date: string;
  details: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    type: 'content',
    status: 'pending',
    priority: 'high',
    reporter: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop'
    },
    reported: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=64&h=64&fit=crop'
    },
    reason: 'Copyright Infringement',
    date: '2024-03-20T15:30:00',
    details: 'Submission contains copyrighted material without proper licensing'
  },
  {
    id: '2',
    type: 'user',
    status: 'pending',
    priority: 'medium',
    reporter: {
      name: 'Sarah Parker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop'
    },
    reported: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop'
    },
    reason: 'Inappropriate Behavior',
    date: '2024-03-20T14:45:00',
    details: 'User is sending harassing messages in competition chat'
  }
];

export function ContentModerationPage() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getPriorityColor = (priority: Report['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'resolved':
        return 'bg-green-500';
      case 'dismissed':
        return 'bg-gray-500';
    }
  };

  const handleResolve = (report: Report) => {
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, status: 'resolved' } : r
    ));
  };

  const handleDismiss = (report: Report) => {
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, status: 'dismissed' } : r
    ));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Content Moderation
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Review and manage reported content
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="font-medium">
              {reports.filter(r => r.status === 'pending').length} Pending Reports
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Reports List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reporter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reported
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reports.map((report) => (
                  <tr 
                    key={report.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Flag className={`w-5 h-5 mr-3 ${getPriorityColor(report.priority)}`} />
                        <div>
                          <div className="font-medium">{report.reason}</div>
                          <div className="text-sm text-gray-500 capitalize">{report.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={report.reporter.avatar} 
                          alt="" 
                          className="w-8 h-8 rounded-full mr-3" 
                        />
                        <span className="font-medium">{report.reporter.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={report.reported.avatar} 
                          alt="" 
                          className="w-8 h-8 rounded-full mr-3" 
                        />
                        <span className="font-medium">{report.reported.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(report.status)}` }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(report.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          setShowDetailsModal(true);
                        }}
                        className="text-orange-500 hover:text-orange-600 mr-3"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      {report.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleResolve(report)}
                            className="text-green-500 hover:text-green-600 mr-3"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDismiss(report)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Report Details Modal */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Report Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Type</label>
                <p className="font-medium capitalize">{selectedReport.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Reason</label>
                <p className="font-medium">{selectedReport.reason}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Details</label>
                <p className="text-gray-600 dark:text-gray-400">{selectedReport.details}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Reporter</label>
                <div className="flex items-center mt-1">
                  <img 
                    src={selectedReport.reporter.avatar} 
                    alt="" 
                    className="w-8 h-8 rounded-full mr-3" 
                  />
                  <span className="font-medium">{selectedReport.reporter.name}</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Reported User/Content</label>
                <div className="flex items-center mt-1">
                  <img 
                    src={selectedReport.reported.avatar} 
                    alt="" 
                    className="w-8 h-8 rounded-full mr-3" 
                  />
                  <span className="font-medium">{selectedReport.reported.name}</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <p className="font-medium capitalize">{selectedReport.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date Reported</label>
                <p className="font-medium">
                  {new Date(selectedReport.date).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedReport(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Close
              </button>
              {selectedReport.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleResolve(selectedReport);
                      setShowDetailsModal(false);
                      setSelectedReport(null);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-600"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => {
                      handleDismiss(selectedReport);
                      setShowDetailsModal(false);
                      setSelectedReport(null);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600"
                  >
                    Dismiss
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}