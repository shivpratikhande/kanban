"use client"
import { useState, useRef } from "react";
import { MoreVertical, MessageSquare, Paperclip, AtSign } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TaskCardProps {
    id: number;
    category: string;
    title: string;
    description: string;
    progress: string;
    assignees: string[] | { name: string }[];
    comments: number;
    attachments: number;
    mentions: number;
    onUpdate: (data: Partial<TaskCardProps>) => void;
    onDelete: () => void;
    onMove: (newColumnId: number, order: number) => void;
    columns: {
      id: number;
      title: string;
      count: number;
      color: string;
    }[];
    color: string;
  }
  

export function TaskCard({
    id,
    category,
    title,
    description,
    progress,
    assignees = [],
    comments = 0,
    attachments = 0,
    mentions = 0,
    onUpdate,
    onDelete,
    onMove,
    columns,
    color
}:TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedCategory, setEditedCategory] = useState(category);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    const handleEdit = () => {
        setIsEditing(true);
        // Focus the title input after a short delay to ensure it's rendered
        setTimeout(() => {
            if (titleInputRef.current) {
                titleInputRef.current.focus();
            }
        }, 50);
    };

    const handleSave = () => {
        onUpdate({
            title: editedTitle,
            description: editedDescription,
            category: editedCategory
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset to original values
        setEditedTitle(title);
        setEditedDescription(description);
        setEditedCategory(category);
        setIsEditing(false);
    };

    const handleDragStart = (e:any) => {
        e.dataTransfer.setData("text/plain", id.toString());
        e.dataTransfer.effectAllowed = "move";
    };

    // Calculate progress percentage for the progress bar
    const calculateProgressWidth = () => {
        if (!progress) return "0%";
        const [current, total] = progress.split("/").map(Number);
        return `${(current / total) * 100}%`;
    };

    return (
        <div className="">
            <div
                className={`rounded-lg border-2 ${
                    color === "bg-blue-400" ? "bg-blue-400/40" :
                    color === "bg-yellow-400" ? "bg-yellow-400/40" :
                    color === "bg-green-500" ? "bg-green-500/40" : "bg-gray-500/20"
                } p-3 shadow-xl break-words`}
                draggable={true}
                onDragStart={handleDragStart}
            >
                {isEditing ? (
                    <div className="space-y-2">
                        <div className="space-y-2 border-2 p-2 rounded-lg bg-gray-100">
                            <input
                                ref={titleInputRef}
                                className="w-full border bg-white border-gray-300 rounded-sm p-2 text-sm"
                                value={editedCategory}
                                onChange={(e) => setEditedCategory(e.target.value)}
                                placeholder="Category"
                            />
                            <input
                                className="w-full border bg-white border-gray-300 rounded-sm p-2 text-sm font-medium"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                placeholder="Title"
                            />
                            <textarea
                                className="w-full border bg-white border-gray-300 rounded-sm p-2 text-xs text-gray-500"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                placeholder="Description"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button size="sm" variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs text-gray-500">{category}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreVertical className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {columns.map((column :any) => (
                                        <DropdownMenuItem
                                            key={column.id}
                                            onClick={() => onMove(column.id, 0)}
                                        >
                                            Move to {column.title}
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <h4 className="mb-1 text-sm font-medium">{title}</h4>
                        <p className="mb-4 text-xs text-gray-500">{description}</p>
                        {progress && (
                            <div className="mb-4">
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-medium">Progress</span>
                                    <span className="text-xs text-gray-500">{progress}</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100">
                                    <div
                                        className="h-1.5 rounded-full bg-blue-500"
                                        style={{ width: calculateProgressWidth() }}
                                    ></div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {assignees.map((assignee: any, index : any) => (
                                    <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                        <AvatarFallback className="text-xs">
                                            {typeof assignee === 'string' 
                                                ? assignee.substring(0, 2)
                                                : assignee.name ? assignee.name.substring(0, 2) : "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                {comments > 0 && (
                                    <div className="flex items-center text-xs">
                                        <MessageSquare className="mr-1 h-3 w-3" />
                                        {comments}
                                    </div>
                                )}
                                {attachments > 0 && (
                                    <div className="flex items-center text-xs">
                                        <Paperclip className="mr-1 h-3 w-3" />
                                        {attachments}
                                    </div>
                                )}
                                {mentions > 0 && (
                                    <div className="flex items-center text-xs">
                                        <AtSign className="mr-1 h-3 w-3" />
                                        {mentions}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}