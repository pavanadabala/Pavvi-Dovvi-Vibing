import Link from 'next/link';

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: 'Daily Working Task Countdown',
            description: 'A beautiful countdown timer with lap tracking and visualization. Track your progress and analyze performance over time.',
            icon: '⏱️',
            status: 'active',
            href: '/projects/countdown',
            stats: {
                laps: '-',
                lastActivity: 'Active'
            }
        },
        {
            id: 2,
            title: 'Project 2',
            description: 'Coming soon. This project will be available in a future update.',
            icon: '🚀',
            status: 'coming-soon',
            href: '#',
        },
        {
            id: 3,
            title: 'Project 3',
            description: 'Coming soon. This project will be available in a future update.',
            icon: '📊',
            status: 'coming-soon',
            href: '#',
        },
        {
            id: 4,
            title: 'Project 4',
            description: 'Coming soon. This project will be available in a future update.',
            icon: '📈',
            status: 'coming-soon',
            href: '#',
        },
        {
            id: 5,
            title: 'Project 5',
            description: 'Coming soon. This project will be available in a future update.',
            icon: '💡',
            status: 'coming-soon',
            href: '#',
        },
        {
            id: 6,
            title: 'Project 6',
            description: 'Coming soon. This project will be available in a future update.',
            icon: '🎯',
            status: 'coming-soon',
            href: '#',
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-violet-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">My Projects</h1>
                        <p className="text-white/80 text-lg">Explore my work and experiments</p>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30
                       text-white rounded-lg transition-colors"
                    >
                        ← Home
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`
                bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6
                transition-all duration-300 
                ${project.status === 'active'
                                    ? 'hover:bg-white/15 hover:scale-105 hover:shadow-2xl cursor-pointer'
                                    : 'opacity-70'
                                }
              `}
                        >
                            {/* Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${project.status === 'active'
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                                    }
                `}>
                                    {project.status === 'active' ? 'Active' : 'Coming Soon'}
                                </span>
                            </div>

                            {/* Icon */}
                            <div className="text-6xl mb-4">{project.icon}</div>

                            {/* Content */}
                            <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                            <p className="text-white/70 mb-6 min-h-[60px]">{project.description}</p>

                            {/* Action Button */}
                            {project.status === 'active' ? (
                                <Link
                                    href={project.href}
                                    className="block w-full px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white font-semibold
                             text-center rounded-lg hover:scale-105 active:scale-95 transition-transform"
                                >
                                    Open Project →
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="w-full px-6 py-3 bg-white/10 text-white/50 font-semibold rounded-lg cursor-not-allowed"
                                >
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
