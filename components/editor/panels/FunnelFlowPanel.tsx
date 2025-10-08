'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { FiFileText, FiEdit3, FiTrash2, FiPlus, FiArrowDown } from 'react-icons/fi'

interface FunnelFlowPanelProps {
  funnelId: string
  currentPageId: string
  pages: any[]
}

export function FunnelFlowPanel({ funnelId, currentPageId, pages }: FunnelFlowPanelProps) {
  const router = useRouter()

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    // TODO: Implement page reordering
    console.log('Reorder pages:', result)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Funnel Steps</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FiPlus className="w-4 h-4" />
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="funnel-steps">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {pages.map((page, index) => (
                <React.Fragment key={page.id}>
                  <Draggable draggableId={page.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => router.push(`/editor/${funnelId}/${page.id}`)}
                        className={`p-3 rounded-lg border-2 transition cursor-pointer ${
                          page.id === currentPageId
                            ? 'border-indigo-500 bg-indigo-50'
                            : snapshot.isDragging
                            ? 'border-gray-300 bg-white shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              page.id === currentPageId ? 'bg-indigo-600' : 'bg-gray-100'
                            }`}>
                              <FiFileText className={`w-4 h-4 ${
                                page.id === currentPageId ? 'text-white' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {page.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {page.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                  {index < pages.length - 1 && (
                    <div className="flex justify-center py-1">
                      <FiArrowDown className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </React.Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center gap-2">
        <FiPlus className="w-4 h-4" />
        <span className="font-medium">Add Step</span>
      </button>
    </div>
  )
}


