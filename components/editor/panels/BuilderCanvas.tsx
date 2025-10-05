import React from 'react'
import { useDroppable, useDraggable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BuilderElement } from '../PageEditor'

export function BuilderCanvas({
  elements,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
}: {
  elements: BuilderElement[]
  selectedId: string | null
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: any) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="max-w-3xl mx-auto py-8">
        <SortableContext items={elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          {elements.map((el) => (
            <ElementRow
              key={el.id}
              element={el}
              selected={selectedId === el.id}
              onClick={() => onSelect(el.id)}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>

        {elements.length === 0 && (
          <div className="text-center py-24 text-gray-500">Add elements from the left panel to get started.</div>
        )}
      </div>
    </div>
  )
}

function ElementRow({ element, selected, onClick, onUpdate, onDelete }: { element: BuilderElement; selected: boolean; onClick: () => void; onUpdate: (id: string, updates: any) => void; onDelete: (id: string) => void }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useDraggable({ id: element.id })
  const style = { transform: CSS.Translate.toString(transform), transition }

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
        <RenderElement element={element} />
      </div>
    </div>
  )
}

function RenderElement({ element }: { element: BuilderElement }) {
  switch (element.type) {
    case 'heading':
      return (
        <div style={{ textAlign: element.props.align || 'left', color: element.props.color || '#111827', fontSize: (element.props.size || 36) + 'px' }} className="font-bold">
          {element.props.text}
        </div>
      )
    case 'text':
      return (
        <div style={{ color: element.props.color || '#4B5563', fontSize: (element.props.size || 16) + 'px' }}>
          {element.props.text}
        </div>
      )
    case 'button':
      return (
        <button
          style={{ background: element.props.bg || '#2563EB', color: element.props.color || '#FFFFFF', borderRadius: (element.props.radius || 8) + 'px' }}
          className="px-5 py-3 font-medium shadow"
        >
          {element.props.text}
        </button>
      )
    case 'image':
      return <img src={element.props.src} alt={element.props.alt || ''} style={{ width: element.props.width || 800 }} className="rounded" />
    case 'video':
      return (
        <div className="aspect-video bg-black/5 flex items-center justify-center">
          <span className="text-gray-500 text-sm">{element.props.src ? 'Video' : 'Paste video URL in properties'}</span>
        </div>
      )
    case 'form':
      return (
        <form className="space-y-3">
          {(element.props.fields || []).map((f: any, idx: number) => (
            <div key={idx} className="space-y-1">
              <div className="text-xs text-gray-600">{f.label}</div>
              <input type={f.type || 'text'} required={!!f.required} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
          ))}
          <button className="px-4 py-2 bg-primary-600 text-white rounded">{element.props.cta || 'Submit'}</button>
        </form>
      )
    default:
      return <div className="text-gray-500">Unsupported element</div>
  }
}
