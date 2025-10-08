'use client'

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { 
  Plus, Trash2, Copy, Settings, Move, GripVertical,
  Type, Image, Square, Layout, Grid3x3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutBuilderProps {
  pageData: any
  setPageData: (data: any) => void
  viewMode: 'desktop' | 'tablet' | 'mobile'
  selectedComponent: string | null
  setSelectedComponent: (id: string | null) => void
}

const componentTypes = [
  { id: 'section', label: 'Section', icon: Layout, color: 'bg-blue-500' },
  { id: 'heading', label: 'Heading', icon: Type, color: 'bg-purple-500' },
  { id: 'text', label: 'Text', icon: Type, color: 'bg-green-500' },
  { id: 'image', label: 'Image', icon: Image, color: 'bg-pink-500' },
  { id: 'button', label: 'Button', icon: Square, color: 'bg-orange-500' },
  { id: 'grid', label: 'Grid', icon: Grid3x3, color: 'bg-teal-500' },
]

export function LayoutBuilder({
  pageData,
  setPageData,
  viewMode,
  selectedComponent,
  setSelectedComponent
}: LayoutBuilderProps) {
  const [showComponentPalette, setShowComponentPalette] = useState(false)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const sections = pageData.sections || []

  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      type: 'section',
      props: {
        backgroundColor: 'bg-white',
        padding: 'py-16 px-6',
      },
      columns: [
        {
          id: `col-${Date.now()}`,
          width: 'w-full',
          components: []
        }
      ]
    }
    setPageData({
      ...pageData,
      sections: [...sections, newSection]
    })
  }

  const handleAddComponent = (sectionId: string, columnId: string, componentType: string) => {
    const newComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      props: getDefaultProps(componentType)
    }

    const updatedSections = sections.map((section: any) => {
      if (section.id === sectionId) {
        return {
          ...section,
          columns: section.columns.map((col: any) => {
            if (col.id === columnId) {
              return {
                ...col,
                components: [...col.components, newComponent]
              }
            }
            return col
          })
        }
      }
      return section
    })

    setPageData({ ...pageData, sections: updatedSections })
    setShowComponentPalette(false)
  }

  const handleDeleteSection = (sectionId: string) => {
    setPageData({
      ...pageData,
      sections: sections.filter((s: any) => s.id !== sectionId)
    })
  }

  const handleDuplicateSection = (sectionId: string) => {
    const section = sections.find((s: any) => s.id === sectionId)
    if (section) {
      const duplicated = {
        ...section,
        id: `section-${Date.now()}`,
        columns: section.columns.map((col: any) => ({
          ...col,
          id: `col-${Date.now()}`,
          components: col.components.map((comp: any) => ({
            ...comp,
            id: `${comp.type}-${Date.now()}`
          }))
        }))
      }
      const index = sections.findIndex((s: any) => s.id === sectionId)
      const newSections = [...sections]
      newSections.splice(index + 1, 0, duplicated)
      setPageData({ ...pageData, sections: newSections })
    }
  }

  const getViewportWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm'
      case 'tablet': return 'max-w-2xl'
      default: return 'max-w-full'
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
      <div className={`mx-auto bg-white shadow-2xl ${getViewportWidth()} transition-all duration-300`}>
        {/* Canvas */}
        <div className="relative">
          {sections.length === 0 ? (
            <div className="py-32 text-center">
              <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start Building Your Page
              </h3>
              <p className="text-gray-600 mb-6">
                Add sections to start designing your funnel page
              </p>
              <button
                onClick={handleAddSection}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Add First Section
              </button>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {sections.map((section: any, index: number) => (
                <div
                  key={section.id}
                  className={`group relative border-2 transition ${
                    hoveredComponent === section.id
                      ? 'border-indigo-500 bg-indigo-50/30'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  onMouseEnter={() => setHoveredComponent(section.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                >
                  {/* Section Toolbar */}
                  <AnimatePresence>
                    {hoveredComponent === section.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -top-12 left-0 right-0 flex items-center justify-between bg-gray-900 text-white px-4 py-2 rounded-t-lg z-10"
                      >
                        <span className="text-sm font-medium">Section {index + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDuplicateSection(section.id)}
                            className="p-1.5 hover:bg-white/20 rounded transition"
                            title="Duplicate"
                          >
                            <Copy size={16} />
                          </button>
                          <button
                            onClick={() => setSelectedComponent(section.id)}
                            className="p-1.5 hover:bg-white/20 rounded transition"
                            title="Settings"
                          >
                            <Settings size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="p-1.5 hover:bg-red-500/20 rounded transition text-red-400"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Section Content */}
                  <div className={`${section.props.backgroundColor} ${section.props.padding}`}>
                    <div className="max-w-7xl mx-auto">
                      <div className={`grid gap-4 ${
                        section.columns.length === 2 ? 'grid-cols-2' :
                        section.columns.length === 3 ? 'grid-cols-3' :
                        'grid-cols-1'
                      }`}>
                        {section.columns.map((column: any) => (
                          <div key={column.id} className="space-y-4">
                            {column.components.map((component: any) => (
                              <ComponentRenderer
                                key={component.id}
                                component={component}
                                isSelected={selectedComponent === component.id}
                                onSelect={() => setSelectedComponent(component.id)}
                              />
                            ))}
                            
                            {/* Add Component Button */}
                            <button
                              onClick={() => setShowComponentPalette(true)}
                              className="w-full py-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center gap-2"
                            >
                              <Plus size={20} />
                              <span className="font-medium">Add Component</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Section Button */}
              <button
                onClick={handleAddSection}
                className="w-full py-8 border-2 border-dashed border-gray-400 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center gap-2 font-medium"
              >
                <Plus size={20} />
                <span>Add Section</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Component Palette Modal */}
      <AnimatePresence>
        {showComponentPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowComponentPalette(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Component</h3>
              <div className="grid grid-cols-3 gap-4">
                {componentTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        // For now, add to first section, first column
                        if (sections.length > 0) {
                          handleAddComponent(sections[0].id, sections[0].columns[0].id, type.id)
                        }
                      }}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition text-center group"
                    >
                      <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="font-medium text-gray-900">{type.label}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ComponentRenderer({ component, isSelected, onSelect }: any) {
  const renderContent = () => {
    switch (component.type) {
      case 'heading':
        return (
          <h2 className={`${component.props.size || 'text-4xl'} font-bold ${component.props.color || 'text-gray-900'}`}>
            {component.props.text || 'Heading Text'}
          </h2>
        )
      case 'text':
        return (
          <p className={`text-lg ${component.props.color || 'text-gray-700'}`}>
            {component.props.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
        )
      case 'button':
        return (
          <button className={`px-8 py-4 rounded-lg font-bold ${component.props.variant === 'outline' ? 'border-2 border-indigo-600 text-indigo-600' : 'bg-indigo-600 text-white'}`}>
            {component.props.text || 'Click Me'}
          </button>
        )
      case 'image':
        return (
          <img
            src={component.props.url || 'https://via.placeholder.com/800x400'}
            alt={component.props.alt || 'Image'}
            className="w-full h-auto rounded-lg"
          />
        )
      default:
        return <div className="p-4 bg-gray-100 rounded-lg">Component: {component.type}</div>
    }
  }

  return (
    <div
      onClick={onSelect}
      className={`relative p-4 rounded-lg cursor-pointer transition ${
        isSelected ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'hover:ring-2 hover:ring-gray-300'
      }`}
    >
      {renderContent()}
    </div>
  )
}

function getDefaultProps(type: string) {
  switch (type) {
    case 'heading':
      return { text: 'Heading Text', size: 'text-4xl', color: 'text-gray-900' }
    case 'text':
      return { text: 'Enter your text here...', color: 'text-gray-700' }
    case 'button':
      return { text: 'Click Me', variant: 'primary' }
    case 'image':
      return { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', alt: 'Image' }
    default:
      return {}
  }
}


