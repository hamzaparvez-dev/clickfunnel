import React from 'react'

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
  }
}

type PropertyUpdates = Partial<BuilderElement['props']>

export function PropertiesPanel({ selected, onChange, onDelete }: { selected: BuilderElement | null; onChange: (updates: PropertyUpdates) => void; onDelete: () => void }) {
  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex-shrink-0">
      <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200">
        <div className="font-semibold text-gray-900">Properties</div>
        {selected && (
          <button onClick={onDelete} className="text-red-600 text-sm hover:underline">Delete</button>
        )}
      </div>
      <div className="p-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
        {!selected && <div className="text-sm text-gray-500">Select an element to edit its properties.</div>}
        {selected && (
          <div className="space-y-4">
            {selected.type === 'heading' && (
              <>
                <Field label="Text">
                  <input className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.text || ''} onChange={(e) => onChange({ text: e.target.value })} />
                </Field>
                <Field label="Size">
                  <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.size || 36} onChange={(e) => onChange({ size: Number(e.target.value) })} />
                </Field>
                <Field label="Color">
                  <input type="color" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.color || '#111827'} onChange={(e) => onChange({ color: e.target.value })} />
                </Field>
                <Field label="Align">
                  <select className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.align || 'left'} onChange={(e) => onChange({ align: e.target.value as 'left' | 'center' | 'right' })}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </Field>
              </>
            )}

            {selected.type === 'text' && (
              <>
                <Field label="Text">
                  <textarea className="w-full border border-gray-300 rounded px-2 py-1" rows={4} value={selected.props.text || ''} onChange={(e) => onChange({ text: e.target.value })} />
                </Field>
                <Field label="Size">
                  <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.size || 16} onChange={(e) => onChange({ size: Number(e.target.value) })} />
                </Field>
                <Field label="Color">
                  <input type="color" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.color || '#4B5563'} onChange={(e) => onChange({ color: e.target.value })} />
                </Field>
              </>
            )}

            {selected.type === 'button' && (
              <>
                <Field label="Text">
                  <input className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.text || ''} onChange={(e) => onChange({ text: e.target.value })} />
                </Field>
                <Field label="Background">
                  <input type="color" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.bg || '#2563EB'} onChange={(e) => onChange({ bg: e.target.value })} />
                </Field>
                <Field label="Color">
                  <input type="color" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.color || '#FFFFFF'} onChange={(e) => onChange({ color: e.target.value })} />
                </Field>
                <Field label="Radius">
                  <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.radius || 8} onChange={(e) => onChange({ radius: Number(e.target.value) })} />
                </Field>
              </>
            )}

            {selected.type === 'image' && (
              <>
                <Field label="Image URL">
                  <input className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.src || ''} onChange={(e) => onChange({ src: e.target.value })} />
                </Field>
                <Field label="Alt">
                  <input className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.alt || ''} onChange={(e) => onChange({ alt: e.target.value })} />
                </Field>
                <Field label="Width">
                  <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.width || 800} onChange={(e) => onChange({ width: Number(e.target.value) })} />
                </Field>
              </>
            )}

            {selected.type === 'video' && (
              <>
                <Field label="Video URL">
                  <input className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.src || ''} onChange={(e) => onChange({ src: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Width">
                    <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.width || 800} onChange={(e) => onChange({ width: Number(e.target.value) })} />
                  </Field>
                  <Field label="Height">
                    <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.height || 450} onChange={(e) => onChange({ height: Number(e.target.value) })} />
                  </Field>
                </div>
              </>
            )}

            {selected.type === 'form' && (
              <>
                <Field label="CTA Text">
                  <input className="w-full border border-gray-300 rounded px-2 py-1" value={selected.props.cta || 'Submit'} onChange={(e) => onChange({ cta: e.target.value })} />
                </Field>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-gray-600">{label}</div>
      {children}
    </div>
  )
}
