import React from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
type BuilderElement = {
  id: string
  type: 'heading' | 'text' | 'button' | 'image' | 'video' | 'form'
  props: {
    text?: string
    size?: number
    color?: string
    align?: 'left' | 'center' | 'right'
    bg?: string
    radius?: number
    src?: string
    alt?: string
    width?: number
    height?: number
    cta?: string
    fields?: Array<{ label: string; type?: string; required?: boolean }>
  }
}

export function BuilderCanvas({
  elements,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onReorder,
}: {
  elements: BuilderElement[]
  selectedId: string | null
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: any) => void
  onDelete: (id: string) => void
  onReorder: (orderedIds: string[]) => void
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const currentIds = elements.map((e) => e.id)
    const oldIndex = currentIds.indexOf(String(active.id))
    const newIndex = currentIds.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(currentIds, oldIndex, newIndex)
    onReorder(reordered)
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            {elements.map((el) => (
              <ElementRow
                key={el.id}
                element={el}
                selected={selectedId === el.id}
                onClick={() => onSelect(el.id)}
                onUpdate={onUpdate}
                onDelete={onDelete} />
            ))}
          </SortableContext>
        </DndContext>

        {elements.length === 0 && (
          <div className="text-center py-24 text-gray-500">Add elements from the left panel to get started.</div>
        )}
      </div>
  );
}

function ElementRow({ element, selected, onClick, onUpdate, onDelete }: { element: BuilderElement; selected: boolean; onClick: () => void; onUpdate: (id: string, updates: any) => void; onDelete: (id: string) => void }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: element.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} className={`mb-3 rounded-lg border ${selected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'} bg-white`}> 
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
        <div className="text-xs text-gray-500">{element.type}</div>
        <div className="flex items-center gap-2">
          <button {...attributes} {...listeners} className="text-xs text-gray-500 hover:text-gray-700">Drag</button>
          <button onClick={() => onDelete(element.id)} className="text-xs text-red-600 hover:underline">Delete</button>
        </div>
      </div>
      <div onClick={onClick} className="px-6 py-6 cursor-pointer">
        {(() => {
          switch (element.type) {
            case 'heading':
              return (
                <h1 style={{
                  color: element.props.color || '#1F2937',
                  fontSize: (element.props.size || 32) + 'px',
                  textAlign: element.props.align || 'left'
                }}>
                  {element.props.text}
                </h1>
              );
            case 'text':
              return (
                <div style={{ color: element.props.color || '#4B5563', fontSize: (element.props.size || 16) + 'px' }}>
                  {element.props.text}
                </div>
              );
            case 'button':
              return (
                <button
                  style={{
                    background: element.props.bg || '#2563EB',
                    color: element.props.color || '#FFFFFF',
                    borderRadius: (element.props.radius || 8) + 'px'
                  }}
                  className="px-5 py-3 font-medium shadow"
                >
                  {element.props.text}
                </button>
              );
            case 'image':
              return (
                <img
                  src={element.props.src}
                  alt={element.props.alt || ''}
                  style={{ width: element.props.width || 800 }}
                  className="rounded"
                />
              );
            case 'video':
              return (
                <div className="aspect-video bg-black/5 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {element.props.src ? 'Video' : 'Paste video URL in properties'}
                  </span>
                </div>
              );
            case 'form':
              return (
                <form className="space-y-3">
                  {(element.props.fields || []).map((f: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs text-gray-600">{f.label}</div>
                      <input
                        type={f.type || 'text'}
                        name={f.name || f.label}
                        required={!!f.required}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  ))}
                  <button className="px-4 py-2 bg-primary-600 text-white rounded">
                    {element.props.cta || 'Submit'}
                  </button>
                </form>
              );
            default:
              return <div className="text-gray-400">Unknown element</div>;
          }
        })()}
      </div>
    </div>
  )
}
