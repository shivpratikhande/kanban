"use client"
import { Settings, Plus, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Meet from "./Meet"
import { useState } from "react"

const teamMembers = [
    { id: 1, name: "AM", image: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "JD", image: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "KL", image: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "RB", image: "/placeholder.svg?height=32&width=32" },
]

export function ProjectHeader() {
    const [clickedMeet, setClickedMeet] = useState(false)

    console.log(clickedMeet)
    return (
        <div className="border-b bg-gray-50">
            <div className="flex items-center justify-between p-4">
                <div className="relative w-full max-w-md">
                    <Input type="search" placeholder="Search" className="pl-8 bg-white" />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:cursor-pointer"
                        onClick={() => {
                            setClickedMeet(!clickedMeet)
                        }}
                    >
                        <p>{clickedMeet}</p>
                        <Video className="h-5 w-5" />
                        <Meet clickedMeet={clickedMeet} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alison Hoper" />
                        <AvatarFallback>AH</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
                            <span className="text-sm font-medium">PE</span>
                        </div>
                        <h1 className="text-xl font-semibold">Piper Enterprise</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {teamMembers.map((member) => (
                                <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback>{member.name}</AvatarFallback>
                                </Avatar>
                            ))}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs text-gray-500">
                                +2
                            </div>
                        </div>
                        <Button size="sm" className="ml-2 bg-white text-black border shadow-sm hover:bg-gray-100">
                            <Plus className="mr-1 h-4 w-4" /> Add Member
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Progress value={13} className="h-2 w-32" />
                    <span className="text-xs text-gray-500">13% complete</span>
                </div>
            </div>

            <div className="flex border-t">
                <div className="flex">
                    {["Overview", "Tasks", "Notes", "Questions"].map((tab, index) => (
                        <button
                            key={tab}
                            className={`px-6 py-3 text-sm font-medium ${index === 1 ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="ml-auto flex items-center border-l">
                    <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        Board
                    </button>
                    <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        Table
                    </button>
                    <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        List
                    </button>
                </div>
            </div>
        </div>
    )
}
