import React, { useState } from 'react';
import { Mail, Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'transactional' | 'marketing' | 'notification';
  lastModified: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to THE RANKK!',
    body: 'Hi {{name}},\n\nWelcome to THE RANKK! We\'re excited to have you join our community...',
    type: 'transactional',
    lastModified: '2024-03-20T15:30:00'
  },
  {
    id: '2',
    name: 'Competition Reminder',
    subject: 'Your competition starts soon!',
    body: 'Hi {{name}},\n\nYour registered competition "{{competition}}" starts in 24 hours...',
    type: 'notification',
    lastModified: '2024-03-19T10:15:00'
  }
];

export function EmailTemplatesPage() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  const handleDelete = (template: Template) => {
    setSelectedTemplate(template);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedTemplate) {
      setTemplates(prev => prev.filter(t => t.id !== selectedTemplate.id));
    }
    setShowDeleteModal(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Email Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage system email templates and notifications
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedTemplate(null);
              setShowEditor(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Template
          </button>
        </div>

        {/* Template List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.type === 'transactional'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : template.type === 'marketing'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {template.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {template.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(template.lastModified).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(template)}
                        className="text-orange-500 hover:text-orange-600 mr-3"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(template)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Template Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {selectedTemplate ? 'Edit Template' : 'New Template'}
              </h2>
              <button
                onClick={() => {
                  setShowEditor(false);
                  setSelectedTemplate(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    defaultValue={selectedTemplate?.type}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="transactional">Transactional</option>
                    <option value="marketing">Marketing</option>
                    <option value="notification">Notification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type=" text"
                  defaultValue={selectedTemplate?.subject}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Body
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    <div className="flex gap-2">
                      <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        Bold
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        Italic
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        Link
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={10}
                    defaultValue={selectedTemplate?.body}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 border-none"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Available variables: {{name}}, {{email}}, {{competition}}, {{date}}
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditor(false);
                    setSelectedTemplate(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Delete Template</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{selectedTemplate.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}