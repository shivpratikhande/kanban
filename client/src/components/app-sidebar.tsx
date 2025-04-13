"use client"
import { Grid2X2, LayoutGrid, MoreVertical, Plus, RefreshCcw, Edit, Trash, X, Check } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import axios from "axios"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Sample data for project icons
const projectIcons = [
    {
        id: 1,
        color: "bg-blue-500",
        icon: <LayoutGrid className="h-4 w-4 text-white" />,
    },
    {
        id: 2,
        color: "bg-cyan-400",
        icon: <Grid2X2 className="h-4 w-4 text-white" />,
    },
    {
        id: 3,
        color: "bg-blue-700",
        icon: <RefreshCcw className="h-4 w-4 text-white" />,
    },
    {
        id: 4,
        color: "bg-purple-500",
        icon: <Grid2X2 className="h-4 w-4 text-white" />,
    },
]

// Sample data for team members
const teamMembers = [
    {
        id: 1,
        name: "Karen Smith",
        status: "Online",
        time: "10:23:25",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 2,
        name: "Steve Mcdonell",
        status: "Online",
        time: "10:45:36",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 3,
        name: "Sarah Green",
        status: "Offline",
        time: "08:52:52",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 4,
        name: "Brad Smith",
        status: "Offline",
        time: "12:23:38",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 5,
        name: "Alice Cornell",
        status: "Online",
        time: "09:45:15",
        avatar: "/placeholder.svg?height=32&width=32",
    },
]

export function AppSidebar() {
    const [projects, setProjects] = useState<any[]>([]);
    const [projectInput, setProjectInput] = useState<string>("");
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [confirmDeleteText, setConfirmDeleteText] = useState<string>("");
    const [editingProject, setEditingProject] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    useEffect(() => {
        fetchProjects();

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // Focus on edit input when editing starts
        if (editingProject !== null && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingProject]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/boards');
            setProjects(response.data);
        } catch (err) {
            console.error("Error fetching boards:", err);
        }
    };

    const handleCreateProject = async () => {
        if (!projectInput.trim()) return;
        try {
            await axios.post('http://localhost:8080/api/v1/boards', {
                name: projectInput,
            });
            await fetchProjects();
            resetForm();
        } catch (err) {
            console.error("Error creating project:", err);
        }
    };

    const handleUpdateProject = async (id: number, name: string) => {
        if (!name.trim()) return;
        try {
            await axios.put(`http://localhost:8080/api/v1/boards/${id}`, {
                name: name,
            });
            await fetchProjects();
            setEditingProject(null);
        } catch (err) {
            console.error("Error updating project:", err);
        }
    };

    const handleDeleteProject = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/boards/${id}`);
            await fetchProjects();
            setConfirmDelete(null);
            setConfirmDeleteText("");
        } catch (err) {
            console.error("Error deleting project:", err);
        }
    };

    const toggleDropdown = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setDropdownOpen(prevId => prevId === id ? null : id);
    };

    const startEditing = (project: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingProject(project.id);
        setEditText(project.name);
        setDropdownOpen(null);
    };

    const startDelete = (project: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirmDelete(project.id);
        setConfirmDeleteText("");
        setDropdownOpen(null);
    };

    const cancelEdit = () => {
        setEditingProject(null);
    };

    const cancelDelete = () => {
        setConfirmDelete(null);
        setConfirmDeleteText("");
    };

    const resetForm = () => {
        setShowPopup(false);
        setProjectInput("");
    };

    const getProjectIcon = (projectId: number) => {
        const iconIndex = (projectId % projectIcons.length);
        return projectIcons[iconIndex];
    };

    const getProjectById = (id: number) => {
        return projects.find(project => project.id === id);
    };

    return (
        <>
            <Sidebar className="border-r">
                <h1 className="flex items-center  p-5">
                    {/* Logo */}
                    <a href="/" className="flex items-center ">
                        <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#7E69AB" />
                            <rect x="4" y="4" width="4" height="4" rx="1" fill="white" />
                            <rect x="4" y="10" width="4" height="4" rx="1" fill="white" />
                            <rect x="4" y="16" width="4" height="4" rx="1" fill="white" />
                            <rect x="10" y="4" width="4" height="4" rx="1" fill="white" />
                            <rect x="10" y="10" width="4" height="4" rx="1" fill="#33C3F0" />
                            <rect x="10" y="16" width="4" height="4" rx="1" fill="white" />
                            <rect x="16" y="4" width="4" height="4" rx="1" fill="white" />
                            <rect x="16" y="10" width="4" height="4" rx="1" fill="white" />
                            <rect x="16" y="16" width="4" height="4" rx="1" fill="white" />
                        </svg>
                        <span className="text-xl font-bold text-gray-900">Forge</span>
                    </a>
                </h1>
                <SidebarRail className="bg-gray-50 border-r" />
                <SidebarContent className="w-[240px]">
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-4 py-2 text-sm font-medium">Projects</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {projects.map((project) => (
                                    <SidebarMenuItem key={project.id}>
                                        {editingProject === project.id ? (
                                            // Inline Edit Mode
                                            <div className="px-4 py-2 flex items-center gap-2">
                                                <div className={cn("flex h-6 w-6 items-center justify-center rounded", getProjectIcon(project.id).color)}>
                                                    {getProjectIcon(project.id).icon}
                                                </div>
                                                <input
                                                    ref={editInputRef}
                                                    type="text"
                                                    className=" relative  w-full flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleUpdateProject(project.id, editText);
                                                        } else if (e.key === 'Escape') {
                                                            cancelEdit();
                                                        }
                                                    }}
                                                />
                                                {/* <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => handleUpdateProject(project.id, editText)}
                                                >
                                                    <Check className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={cancelEdit}
                                                >
                                                    <X className="h-4 w-4 text-red-600" />
                                                </Button> */}
                                            </div>
                                        ) : confirmDelete === project.id ? (
                                            // Delete Confirmation
                                            <div className="px-4 py-2">
                                                <div className="text-xs mb-2 text-red-600">Type "{project.name}" to confirm delete:</div>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={confirmDeleteText}
                                                        onChange={(e) => setConfirmDeleteText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && confirmDeleteText === project.name) {
                                                                handleDeleteProject(project.id);
                                                            } else if (e.key === 'Escape') {
                                                                cancelDelete();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex mt-2 justify-end">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 hover:cursor-pointer"
                                                        onClick={cancelDelete}
                                                    >
                                                        <X className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="text-xs h-6 bg-red-500 text-white disabled:bg-red-300 hover:cursor-pointer"
                                                        disabled={confirmDeleteText !== project.name}
                                                        onClick={() => handleDeleteProject(project.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Normal View
                                            <>
                                                <SidebarMenuAction asChild className="absolute right-2 top-2">
                                                    <div className="">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={(e) => {
                                                                toggleDropdown(project.id, e)

                                                            }}
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                            <span className="sr-only">More options</span>
                                                        </Button>

                                                        {dropdownOpen === project.id && (
                                                            <div
                                                                ref={dropdownRef}
                                                                className="absolute right-1 top-full  bg-white border rounded-lg shadow-lg z-50 w-32"
                                                            >
                                                                <button
                                                                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                                                    onClick={(e) => startEditing(project, e)}
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                    onClick={(e) => startDelete(project, e)}
                                                                >
                                                                    <Trash className="h-4 w-4" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </SidebarMenuAction>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        "flex h-10 w-full items-center justify-start gap-3 px-4 font-normal",
                                                        activeProjectId === project.id && "bg-blue-50 text-blue-600 hover:cursor-pointer"
                                                    )}
                                                    onClick={() => {
                                                        setActiveProjectId(project.id);
                                                        router.push(`/projects/${project.name}/${project.id}`);
                                                    }}
                                                >
                                                    <div className={cn("flex h-6 w-6 items-center justify-center rounded", getProjectIcon(project.id).color)}>
                                                        {getProjectIcon(project.id).icon}
                                                    </div>
                                                    <span>{project.name}</span>
                                                </Button>
                                            </>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel className="px-4 py-2 text-sm font-medium">Team members</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {teamMembers.map((member) => (
                                    <SidebarMenuItem key={member.id}>
                                        <SidebarMenuAction asChild className="absolute right-2 top-2">
                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">More options</span>
                                            </Button>
                                        </SidebarMenuAction>
                                        <Button
                                            variant="ghost"
                                            className="flex h-10 w-full items-center justify-start gap-3 px-4 font-normal"
                                        >
                                            <Avatar className="h-6 w-6">
                                                <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                            </Avatar>
                                            <div className="flex flex-col items-start text-xs">
                                                <span className="text-sm">{member.name}</span>
                                                <span className={cn("text-gray-500", member.status === "Online" && "text-green-500")}>
                                                    {member.status} · {member.time}
                                                </span>
                                            </div>
                                        </Button>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel className="px-4 py-2 text-sm font-medium">Meets</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <div className="px-4 py-2">
                                <div className="text-xs text-gray-500">TOTAL HOURS</div>
                                <div className="text-2xl font-semibold">23.7 hours</div>
                                <div className="mt-1 flex items-center text-xs text-green-500">
                                    <span>+3.5% from last week</span>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                className={cn(
                                    "flex h-10 w-full items-center justify-start gap-3 px-4 font-normal bg-blue-50 text-blue-600 hover:cursor-pointer"
                                )}
                                onClick={() => {
                                    setActiveProjectId(null);
                                    router.push(`/projects`);
                                }}
                            >
                                <div className={cn("flex h-6 w-6 items-center justify-center rounded")}>
                                    
                                </div>
                                <span>Stand_Up</span>
                            </Button>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel className="px-4 py-2 text-sm font-medium">Time</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <div className="px-4 py-2">
                                <div className="text-xs text-gray-500">TOTAL HOURS</div>
                                <div className="text-2xl font-semibold">23.7 hours</div>
                                <div className="mt-1 flex items-center text-xs text-green-500">
                                    <span>+3.5% from last week</span>
                                </div>
                            </div>

                            {/* Add Project Button */}
                            <div className="mx-4 mt-4 border border-dashed border-blue-300 rounded-md p-3">
                                <Button
                                    variant="ghost"
                                    className="w-full flex items-center justify-center gap-2 text-blue-600"
                                    onClick={() => setShowPopup(true)}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Add Project</span>
                                </Button>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            {/* Create Project Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="relative w-[250px] bg-white border rounded-lg p-4 shadow-lg z-10">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium">Create Project</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={resetForm}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Project name"
                            value={projectInput}
                            onChange={(e) => setProjectInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreateProject();
                                } else if (e.key === 'Escape') {
                                    resetForm();
                                }
                            }}
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-8"
                                onClick={resetForm}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                className="text-xs h-8"
                                onClick={handleCreateProject}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}