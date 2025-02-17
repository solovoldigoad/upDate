"use client"
import React from 'react';
import { Bell, Briefcase, Clock, } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'Application Reviewed',
      company: 'Tech Solutions Inc',
      position: 'Senior Developer',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      company: 'Digital Innovations',
      position: 'UX Designer',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Application Deadline Approaching',
      company: 'Global Systems',
      position: 'Project Manager',
      time: '2 days ago',
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-red-600">Notifications</h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-red-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`border-l-4 ${
                notification.read ? 'border-l-gray-200' : 'border-l-red-500'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${
                        notification.read ? 'text-gray-700' : 'text-red-600'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{notification.company} • {notification.position}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;