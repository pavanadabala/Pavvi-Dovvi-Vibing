import Link from "next/link";
import { Clock } from "lucide-react";

const projects = [
    {
        id: "countdown",
        name: "Countdown Timer",
        description: "A multi-project countdown timer with lap tracking and analytics.",
        href: "/projects/countdown",
        icon: Clock,
        status: "Active",
    },
    {
        id: "project2",
        name: "Project 2",
        description: "Coming soon...",
        href: "#",
        icon: null,
        status: "Coming Soon",
    },
    {
        id: "project3",
        name: "Project 3",
        description: "Coming soon...",
        href: "#",
        icon: null,
        status: "Coming Soon",
    },
];

export default function ProjectsPage() {
    return (
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32 transition-colors duration-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        My Projects
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        A collection of my work and experiments.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-800 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {projects.map((project) => (
                        <article key={project.id} className="flex max-w-xl flex-col items-start justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-x-4 text-xs">
                                <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    {project.status}
                                </span>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                    <Link href={project.href}>
                                        <span className="absolute inset-0" />
                                        {project.name}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    {project.description}
                                </p>
                            </div>
                            {project.icon && (
                                <div className="mt-4">
                                    <project.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
