import React from 'react';
import { Clock, Paperclip, MessageSquare, UserCircle2 } from 'lucide-react';

const KanbanPreview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Visualize Your Work</h2>
          <p className="mt-4 text-lg text-gray-600">
            Organize tasks into columns, track progress at a glance, and move work forward with simple drag and drop.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <div className="min-w-[768px] flex gap-6">
            {/* Columns (To Do, In Progress, Done) */}
            {[
              {
                title: 'To Do',
                color: 'bg-blue-400',
                count: 3,
                cards: [
                  {
                    tag: 'Feature',
                    tagColor: 'bg-blue-100 text-blue-700',
                    title: 'Update dashboard charts',
                    desc: 'Implement new chart types and improve data visualization',
                    date: 'June 25',
                    attachments: 2,
                    comments: 3,
                  },
                  {
                    tag: 'Design',
                    tagColor: 'bg-indigo-100 text-indigo-700',
                    title: 'Improve mobile responsive design',
                    desc: 'Review and update components for better mobile experience',
                    date: 'June 27',
                    attachments: 1,
                    comments: 2,
                  },
                  {
                    tag: 'Research',
                    tagColor: 'bg-purple-100 text-purple-700',
                    title: 'Analytics feature research',
                    desc: 'Research analytics options for future implementation',
                    date: 'June 30',
                    attachments: 0,
                    comments: 1,
                  },
                ],
              },
              {
                title: 'In Progress',
                color: 'bg-yellow-400',
                count: 2,
                cards: [
                  {
                    tag: 'Backend',
                    tagColor: 'bg-green-100 text-green-700',
                    title: 'API Performance optimization',
                    desc: 'Improve API response times and caching strategy',
                    date: 'June 23',
                    avatars: ['JS', 'KL'],
                  },
                  {
                    tag: 'Bug',
                    tagColor: 'bg-red-100 text-red-700',
                    title: 'Fix authentication issues',
                    desc: 'Resolve login errors occurring on certain browsers',
                    date: 'June 22',
                    attachments: 3,
                    comments: 5,
                  },
                ],
              },
              {
                title: 'Done',
                color: 'bg-green-500',
                count: 3,
                cards: [
                  {
                    tag: 'Feature',
                    tagColor: 'bg-green-100 text-green-700',
                    title: 'User onboarding flow',
                    desc: 'Implement improved onboarding experience for new users',
                    user: 'Alex',
                    comments: 8,
                  },
                  {
                    tag: 'UI',
                    tagColor: 'bg-blue-100 text-blue-700',
                    title: 'Design system update',
                    desc: 'Update components to match new design guidelines',
                    user: 'Sarah',
                    comments: 4,
                  },
                  {
                    tag: 'Planning',
                    tagColor: 'bg-purple-100 text-purple-700',
                    title: 'Q3 Roadmap planning',
                    desc: 'Define goals and strategy for Q3 development',
                    user: 'Team',
                    comments: 12,
                    faded: true,
                  },
                ],
              },
            ].map((column, i) => (
              <div key={i} className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <span className={`w-3 h-3 rounded-full ${column.color} mr-2`} />
                      {column.title}
                    </h3>
                    <span className="text-gray-500 text-sm font-medium px-2 py-1 bg-white rounded">
                      {column.count}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {column.cards.map((card: any, j: number) => (
                      <div
                        key={j}
                        className={`bg-white p-4 rounded-lg border border-gray-100 shadow-sm ${
                          card.faded ? 'opacity-75' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${card.tagColor}`}>
                            {card.tag}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">...</button>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{card.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{card.desc}</p>

                        {/* Bottom Section */}
                        {card.avatars ? (
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {card.avatars.map((initials: string, k: number) => (
                                <div
                                  key={k}
                                  className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-medium"
                                >
                                  {initials}
                                </div>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {card.date}
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            {card.date && (
                              <span className="flex items-center">
                                <Clock size={14} className="mr-1" /> {card.date}
                              </span>
                            )}
                            {card.attachments !== undefined && (
                              <span className="flex items-center">
                                <Paperclip size={14} className="mr-1" /> {card.attachments}
                              </span>
                            )}
                            {card.comments !== undefined && (
                              <span className="flex items-center">
                                <MessageSquare size={14} className="mr-1" /> {card.comments}
                              </span>
                            )}
                            {card.user && (
                              <>
                                <span className="flex items-center">
                                  <UserCircle2 size={14} className="mr-1" /> {card.user}
                                </span>
                                <span className="flex items-center">
                                  <MessageSquare size={14} className="mr-1" /> {card.comments}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanPreview;
