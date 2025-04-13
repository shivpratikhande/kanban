"use client";

import { useState, useEffect } from "react";
import { MoreVertical, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./task-card";
import axios from "axios";

interface Column {
    id: number;
    name: string;
    color?: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    progress: string;
    column_id: number;
    assignees: string[] | { name: string }[];
    comments: number;
    attachments: number;
    mentions: number;
    order?: number;
}

interface FormattedColumn {
    id: number;
    title: string;
    count: number;
    color: string;
}

export function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const columnStyles = {
        "TO DO": "bg-blue-400",
        "In Progress": "bg-yellow-400",
        "Done": "bg-green-500"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Attempt to fetch from API, if it fails, use fallback data
                try {
                    const [columnsRes, cardsRes] = await Promise.all([
                        axios.get("http://localhost:8080/api/v1/columns"),
                        axios.get("http://localhost:8080/api/v1/cards"),
                    ]);

                    setColumns(columnsRes.data);
                    setTasks(cardsRes.data);
                } catch (apiError) {
                    console.warn("API connection failed, using fallback data:", apiError);
                }

                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err instanceof Error ? err.message : "Failed to update card");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddCard = async (columnId : any) => {
        try {
            const newCard = {
                title: "New Task",
                description: "Click to edit this task",
                column_id: columnId,
                category: "New",
                progress: "0/1",
                assignees: [],
                comments: 0,
                attachments: 0,
                mentions: 0,
            };

            try {
                const response = await axios.post("http://localhost:8080/api/v1/cards", newCard);
                setTasks([...tasks, response.data]);
            } catch (apiError) {
                console.warn("API connection failed, using local state only:", apiError);
                // Create a new ID if API fails
                const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
                const localNewCard = { ...newCard, id: newId };
                setTasks([...tasks, localNewCard]);
            }
        } catch (err) {
            console.error("Error creating card:", err);
            setError(err instanceof Error ? err.message : "Failed to update card");
        }
    };

    const handleMoveCard = async (cardId : any, newColumnId : any, order : any) => {
        try {
            try {
                const response = await axios.put(`http://localhost:8080/api/v1/cards/${cardId}/move`, {
                    column_id: newColumnId,
                    order,
                });
                const updatedCard = response.data;
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === cardId ? { ...task, column_id: newColumnId, order } : task
                    )
                );
            } catch (apiError) {
                console.warn("API connection failed, using local state only:", apiError);
                // Update local state if API fails
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === cardId ? { ...task, column_id: newColumnId, order } : task
                    )
                );
            }
        } catch (err) {
            console.error("Error moving card:", err);
            setError(err instanceof Error ? err.message : "Failed to update card");
        }
    };

    const handleUpdateCard = async (cardId: any, updatedData: any) => {
        try {
            try {
                await axios.put(`http://localhost:8080/api/v1/cards/${cardId}`, updatedData);
            } catch (apiError) {
                console.warn("API connection failed, using local state only:", apiError);
            }

            // Update local state whether API succeeds or fails
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === cardId ? { ...task, ...updatedData } : task
                )
            );
        } catch (err) {
            console.error("Error updating card:", err);
            setError(err instanceof Error ? err.message : "Failed to update card");
        }
    };

    const handleDeleteCard = async (cardId: any) => {
        try {
            try {
                await axios.delete(`http://localhost:8080/api/v1/cards/${cardId}`);
            } catch (apiError) {
                console.warn("API connection failed, using local state only:", apiError);
            }

            // Remove from local state whether API succeeds or fails
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== cardId));
        } catch (err) {
            console.error("Error deleting card:", err);
            setError(err instanceof Error ? err.message : "Failed to update card");
        }
    };

    const handleDragOver = (e : any) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = async (e : any, columnId : any) => {
        e.preventDefault();
        const cardId = parseInt(e.dataTransfer.getData("text/plain"), 10);
        const cardsInColumn = tasks.filter((task) => task.column_id === columnId);
        const newOrder = cardsInColumn.length;

        await handleMoveCard(cardId, columnId, newOrder);
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-500">Loading board...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500">Error: {error}</p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    const formattedColumns = columns.map((column) => ({
        id: column.id,
        title: column.name,
        count: tasks.filter((task) => task.column_id === column.id).length,
        color: columnStyles[column.name as keyof typeof columnStyles] || "bg-gray-400",
    }));

    return (
        <div className="flex h-full gap-4 overflow-x-auto p-4">
            {formattedColumns.map((column) => (
                <div
                    key={column.id}
                    className="flex-shrink-0 w-72"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id)}
                >
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
                        onClick={() => handleAddCard(column.id)}
                    >
                        <Plus className="h-4 w-4" /> Add New Task
                    </Button>

                    <div className="space-y-3">
                        {tasks
                            .filter((task) => task.column_id === column.id)
                            .map((task) => (
                                <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    category={task.category}
                                    title={task.title}
                                    description={task.description}
                                    progress={task.progress}
                                    assignees={task.assignees || []}
                                    comments={task.comments}
                                    attachments={task.attachments}
                                    mentions={task.mentions}
                                    onUpdate={(updatedData) => handleUpdateCard(task.id, updatedData)}
                                    onDelete={() => handleDeleteCard(task.id)}
                                    onMove={(newColumnId, order) => handleMoveCard(task.id, newColumnId, order)}
                                    columns={formattedColumns}
                                    color={column.color}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}