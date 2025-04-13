"use client"

import type * as React from "react"
import { BarChart3, Calendar, CircleHelp, Clock, Grid2X2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SidebarRailIconProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

export function SidebarRailIcon({ icon, label, isActive, onClick }: SidebarRailIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-10 w-10 rounded-lg", isActive && "bg-blue-600 text-white")}
            onClick={onClick}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SidebarRailIcons() {
  return (
    <div className="absolute left-0 top-20 flex flex-col items-center gap-4 px-2">
      <SidebarRailIcon icon={<Grid2X2 className="h-5 w-5" />} label="Dashboard" isActive />
      <SidebarRailIcon icon={<Calendar className="h-5 w-5" />} label="Calendar" />
      <SidebarRailIcon icon={<Users className="h-5 w-5" />} label="Team" />
      <SidebarRailIcon icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
      <SidebarRailIcon icon={<Clock className="h-5 w-5" />} label="Time" />
      <div className="mt-auto">
        <SidebarRailIcon icon={<CircleHelp className="h-5 w-5" />} label="Help" />
      </div>
    </div>
  )
}
