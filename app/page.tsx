'use client'

import { useState, useEffect } from 'react'
import { Activity, AlertCircle, CheckCircle, Clock, Server, Database, GitBranch, MessageSquare, RefreshCw, Play, Pause, X } from 'lucide-react'

interface Integration {
  id: string
  name: string
  status: 'running' | 'stopped' | 'error'
  lastRun: string
  messagesProcessed: number
  errorRate: number
}

interface Message {
  id: string
  integration: string
  timestamp: string
  status: 'success' | 'failed' | 'processing'
  direction: 'inbound' | 'outbound'
}

export default function Home() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'SAP S/4HANA to Salesforce Sync',
      status: 'running',
      lastRun: '2 minutes ago',
      messagesProcessed: 1247,
      errorRate: 0.5
    },
    {
      id: '2',
      name: 'Order Processing Flow',
      status: 'running',
      lastRun: '5 minutes ago',
      messagesProcessed: 3421,
      errorRate: 1.2
    },
    {
      id: '3',
      name: 'Invoice Generation Service',
      status: 'error',
      lastRun: '15 minutes ago',
      messagesProcessed: 892,
      errorRate: 8.5
    },
    {
      id: '4',
      name: 'Customer Data Replication',
      status: 'stopped',
      lastRun: '1 hour ago',
      messagesProcessed: 567,
      errorRate: 0
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', integration: 'SAP S/4HANA to Salesforce Sync', timestamp: '10:32:14', status: 'success', direction: 'outbound' },
    { id: '2', integration: 'Order Processing Flow', timestamp: '10:31:52', status: 'success', direction: 'inbound' },
    { id: '3', integration: 'Invoice Generation Service', timestamp: '10:30:43', status: 'failed', direction: 'outbound' },
    { id: '4', integration: 'SAP S/4HANA to Salesforce Sync', timestamp: '10:29:21', status: 'processing', direction: 'inbound' },
    { id: '5', integration: 'Customer Data Replication', timestamp: '10:28:15', status: 'success', direction: 'outbound' },
  ])

  const [stats, setStats] = useState({
    totalMessages: 6127,
    successRate: 94.2,
    activeFlows: 3,
    avgProcessingTime: 234
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'stopped':
      case 'processing':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
      case 'failed':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'error':
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Server className="w-8 h-8 text-blue-600" />
                SAP Cloud Platform Integration
              </h1>
              <p className="text-gray-600 mt-2">Monitor and manage your integration flows</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalMessages.toLocaleString()}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-600 opacity-70" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.successRate}%</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 opacity-70" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Flows</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeFlows}</p>
              </div>
              <Activity className="w-10 h-10 text-purple-600 opacity-70" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Processing</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avgProcessingTime}ms</p>
              </div>
              <Clock className="w-10 h-10 text-orange-600 opacity-70" />
            </div>
          </div>
        </div>

        {/* Integration Flows */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-blue-600" />
              Integration Flows
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {integrations.map((integration) => (
              <div key={integration.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {getStatusIcon(integration.status)}
                        {integration.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last run: {integration.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {integration.messagesProcessed.toLocaleString()} messages
                      </span>
                      <span className={`flex items-center gap-1 ${integration.errorRate > 5 ? 'text-red-600 font-semibold' : ''}`}>
                        <AlertCircle className="w-4 h-4" />
                        {integration.errorRate}% error rate
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.status === 'running' ? (
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition">
                        <Pause className="w-5 h-5" />
                      </button>
                    ) : (
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                        <Play className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              Recent Messages
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Integration Flow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Direction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.timestamp}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {message.integration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        message.direction === 'inbound' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {message.direction.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1 w-fit px-2 py-1 rounded text-xs font-medium ${getStatusColor(message.status)}`}>
                        {getStatusIcon(message.status)}
                        {message.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
