import { Grid2X2, LayoutGrid, MoreVertical, Plus, RefreshCcw } from "lucide-react"

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

// Sample data for projects
const projects = [
  {
    id: 1,
    name: "Paper Enterprise",
    color: "bg-blue-500",
    icon: <LayoutGrid className="h-4 w-4 text-white" />,
    isActive: true,
  },
  {
    id: 2,
    name: "Web platform",
    color: "bg-cyan-400",
    icon: <Grid2X2 className="h-4 w-4 text-white" />,
  },
  {
    id: 3,
    name: "Mobile Loop",
    color: "bg-blue-700",
    icon: <RefreshCcw className="h-4 w-4 text-white" />,
  },
  {
    id: 4,
    name: "Wire Mobile App",
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
    


  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <LayoutGrid className="h-6 w-6" />
        </div>
      </SidebarHeader>
      <SidebarRail className="bg-gray-50 border-r" />
      <SidebarContent className="w-[240px]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-sm font-medium">Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuAction asChild className="absolute right-2 top-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </SidebarMenuAction>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex h-10 w-full items-center justify-start gap-3 px-4 font-normal",
                      project.isActive && "bg-blue-50 text-blue-600",
                    )}
                  >
                    <div className={cn("flex h-6 w-6 items-center justify-center rounded", project.color)}>
                      {project.icon}
                    </div>
                    <span>{project.name}</span>
                  </Button>
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
          <SidebarGroupLabel className="px-4 py-2 text-sm font-medium">Time</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-2">
              <div className="text-xs text-gray-500">TOTAL HOURS</div>
              <div className="text-2xl font-semibold">23.7 hours</div>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <span>+3.5% from last week</span>
              </div>
            </div>
            <div className="mx-4 mt-4 border border-dashed border-blue-300 rounded-md p-3">
              <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-blue-600">
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
