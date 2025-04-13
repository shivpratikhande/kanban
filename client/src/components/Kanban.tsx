import { MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskCard } from "./task-card"

const columns = [
  {
    id: "todo",
    title: "To Do",
    count: 3,
    color: "bg-gray-500",
  },
  {
    id: "in-progress",
    title: "In Progress",
    count: 2,
    color: "bg-blue-500",
  },
  {
    id: "need-review",
    title: "Need Review",
    count: 1,
    color: "bg-yellow-500",
  },
  {
    id: "done",
    title: "Done",
    count: 2,
    color: "bg-green-500",
  },
]

const tasks = [
  {
    id: 1,
    column: "todo",
    category: "UX stages",
    title: "Wireframing",
    description: "Create low-fidelity designs that outline the basic structure and layout of the product.",
    progress: "0/6",
    assignees: [
      { id: 1, name: "AM" },
      { id: 2, name: "JD" },
      { id: 3, name: "KL" },
    ],
    comments: 7,
    attachments: 0,
    mentions: 0,
  },
  {
    id: 2,
    column: "todo",
    category: "Design",
    title: "First design concept",
    description:
      "Create a detailed design for the research and insights gathered during the discovery phase of the project.",
    progress: "0/4",
    assignees: [
      { id: 1, name: "AM" },
      { id: 2, name: "JD" },
      { id: 4, name: "RB" },
    ],
    comments: 1,
    attachments: 0,
    mentions: 3,
  },
  {
    id: 3,
    column: "todo",
    category: "Design",
    title: "Design library",
    description: "Create a collection of reusable design elements, such as buttons, forms, and navigation menus.",
    progress: "",
    assignees: [],
    comments: 0,
    attachments: 0,
    mentions: 0,
  },
  {
    id: 4,
    column: "in-progress",
    category: "UX stages",
    title: "Customer Journey Mapping",
    description:
      "Identify the key touchpoints and pain points in customer journey, and to develop strategies to improve the experience.",
    progress: "3/10",
    assignees: [
      { id: 1, name: "AM" },
      { id: 2, name: "JD" },
      { id: 3, name: "KL" },
    ],
    comments: 5,
    attachments: 1,
    mentions: 7,
  },
  {
    id: 5,
    column: "in-progress",
    category: "UX stages",
    title: "Persona development",
    description:
      "Create user personas based on the research data to represent different user groups and their characteristics, goals, and behaviors.",
    progress: "1/2",
    assignees: [
      { id: 1, name: "AM" },
      { id: 2, name: "JD" },
    ],
    comments: 2,
    attachments: 6,
    mentions: 3,
  },
  {
    id: 6,
    column: "need-review",
    category: "UX stages",
    title: "Competitor research",
    description:
      "Research competitors and identify weaknesses and strengths each of them. Comparing their features with yours.",
    progress: "7/7",
    assignees: [
      { id: 1, name: "AM" },
      { id: 2, name: "JD" },
      { id: 3, name: "KL" },
      { id: 4, name: "RB" },
    ],
    comments: 4,
    attachments: 3,
    mentions: 5,
  },
  {
    id: 7,
    column: "done",
    category: "Branding",
    title: "Branding, visual identity",
    description:
      "Create a brand identity system that includes a logo, typography, color palette, and brand guidelines.",
    progress: "3/3",
    assignees: [
      { id: 1, name: "AM" },
      { id: 2, name: "JD" },
      { id: 3, name: "KL" },
    ],
    comments: 3,
    attachments: 6,
    mentions: 8,
  },
  {
    id: 8,
    column: "done",
    category: "Branding",
    title: "Marketing materials",
    description: "Create a standard materials such as business cards, flyers, brochures, and social media graphics.",
    progress: "6/6",
    assignees: [
      { id: 1, name: "AM" },
      { id: 4, name: "RB" },
    ],
    comments: 5,
    attachments: 7,
    mentions: 8,
  },
]

export function KanbanBoard() {
  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-72">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${column.color}`}></div>
              <h3 className="font-medium">{column.title}</h3>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{column.count}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            className="mb-3 flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-gray-300 py-1.5 text-sm text-gray-500 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" /> Add New Task
          </Button>

          <div className="space-y-3">
            {tasks
              .filter((task) => task.column === column.id)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  category={task.category}
                  title={task.title}
                  description={task.description}
                  progress={task.progress}
                  assignees={task.assignees}
                  comments={task.comments}
                  attachments={task.attachments}
                  mentions={task.mentions}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
