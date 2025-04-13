"use client"

import { KanbanBoard } from '@/components/Kanban'
import { useParams } from 'next/navigation'
import React from 'react'

function Page() {
    const params = useParams();
    const project_id = params.id; // because [id].tsx

    if (!project_id) {
        return <div className="flex h-full items-center justify-center">Loading...</div>;
    }

    return (
        <div>
            <KanbanBoard project_id={project_id} />
        </div>
    )
}

export default Page
