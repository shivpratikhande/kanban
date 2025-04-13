import { MoreVertical, MessageSquare, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  category: string
  categoryColor?: string
  title: string
  description: string
  progress?: string
  assignees?: { id: number; name: string; image?: string }[]
  comments?: number
  attachments?: number
  mentions?: number
}

export function TaskCard({
  category,
  categoryColor,
  title,
  description,
  progress,
  assignees = [],
  comments = 0,
  attachments = 0,
  mentions = 0,
}: TaskCardProps) {
  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "ux stages":
        return "bg-orange-100 text-orange-800"
      case "design":
        return "bg-purple-100 text-purple-800"
      case "branding":
        return "bg-red-100 text-red-800"
      default:
        return categoryColor || "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="mb-3 rounded-md border bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className={cn("rounded px-2 py-1 text-xs font-medium", getCategoryColor())}>{category}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="mb-3 text-xs text-gray-500">{description}</p>

      {progress && (
        <div className="mb-3 flex items-center text-xs text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          {progress}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {assignees.map((assignee) => (
            <Avatar key={assignee.id} className="border-2 border-white h-6 w-6">
              <AvatarImage src={assignee.image || "/placeholder.svg?height=24&width=24"} alt={assignee.name} />
              <AvatarFallback className="text-xs">{assignee.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          {comments > 0 && (
            <div className="flex items-center">
              <MessageSquare className="mr-1 h-3 w-3" />
              {comments}
            </div>
          )}

          {attachments > 0 && (
            <div className="flex items-center">
              <Paperclip className="mr-1 h-3 w-3" />
              {attachments}
            </div>
          )}

          {mentions > 0 && (
            <div className="flex items-center">
              <span className="mr-1">@</span>
              {mentions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
