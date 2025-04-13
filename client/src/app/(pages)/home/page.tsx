import { AppSidebar } from "@/components/app-sidebar"
import { SidebarRailIcons } from "@/components/sidebar-rail"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ProjectHeader } from "@/components/project-header"
import { KanbanBoard } from "@/components/Kanban"

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarRailIcons /> */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProjectHeader />
          <div className="flex-1 overflow-auto">
            <KanbanBoard />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
