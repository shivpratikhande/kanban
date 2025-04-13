"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { KanbanBoard } from "@/components/Kanban";

export default function Home() {
  const [userName, setUserName] = useState("User");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showBoard, setShowBoard] = useState(false);
  
  useEffect(() => {
    // Get user name from localStorage if available
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Quick stats for dashboard
  const stats = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, title: "Completed", value: "12 tasks" },
    { icon: <Clock className="h-6 w-6 text-amber-500" />, title: "In Progress", value: "5 tasks" },
    { icon: <TrendingUp className="h-6 w-6 text-blue-500" />, title: "Productivity", value: "93%" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col w-full">
        <div className="p-8 max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}, {userName}!</h1>
            <div className="flex items-center mt-2 text-gray-500">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>{formatDate()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div>{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Your Work Done!</h2>
              <p className="text-gray-600">Track your tasks and boost your productivity today</p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setShowBoard(true)}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View My Tasks
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Create New Project
              </Button>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}