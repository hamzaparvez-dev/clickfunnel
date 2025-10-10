import React from 'react'


import { FiType, FiEdit3, FiImage, FiPlayCircle, FiSend, FiClipboard } from 'react-icons/fi'

type ElementKey = 'heading' | 'text' | 'button' | 'image' | 'video' | 'form'

const ELEMENTS: { key: ElementKey; name: string; icon: any; desc: string }[] = [
  { key: 'button', name: 'Button', icon: FiSend, desc: 'Call to action' },
  { key: 'image', name: 'Image', icon: FiImage, desc: 'Upload or link an image' },
  { key: 'video', name: 'Video', icon: FiPlayCircle, desc: 'Embed a video' },
  { key: 'form', name: 'Form', icon: FiClipboard, desc: 'Capture leads' },
]

export function ElementsPanel({ onAdd }: { onAdd: (type: ElementKey) => void }) {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="h-14 px-4 flex items-center border-b border-gray-200">
        <div className="font-semibold text-gray-900">Elements</div>
      </div>
      <div className="p-3 space-y-3 overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
        {ELEMENTS.map((el) => (
          <button
            key={el.key}
            onClick={() => onAdd(el.key)}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <el.icon className="w-5 h-5 text-primary-600" />
              <div>
                <div className="font-medium text-gray-900">{el.name}</div>
                <div className="text-xs text-gray-500">{el.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
