import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

function Card({ id, title, description, priority }){
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className={`p-3 rounded-lg bg-white border-l-4 ${getPriorityColor(priority)} border border-gray-200 shadow-sm cursor-grab hover:shadow-md transition-shadow`}
    >
      <div className='text-sm font-medium text-gray-900'>{title}</div>
      <div className='text-xs text-gray-500 mt-1'>{description}</div>
      <div className='flex items-center justify-between mt-2'>
        <span className={`text-xs px-2 py-1 rounded-full ${
          priority === 'high' ? 'bg-red-100 text-red-800' :
          priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {priority}
        </span>
      </div>
    </div>
  );
}

export default function KanbanBoard(){
  const [columns, setColumns] = useState({
    backlog: [
      { id: 'task-1', title: 'Design landing page', description: 'Create wireframes and mockups', priority: 'high' },
      { id: 'task-2', title: 'Research competitors', description: 'Analyze market trends', priority: 'medium' },
      { id: 'task-3', title: 'Setup development environment', description: 'Configure tools and dependencies', priority: 'low' },
    ],
    inProgress: [
      { id: 'task-4', title: 'Implement authentication', description: 'Add login and signup functionality', priority: 'high' },
      { id: 'task-5', title: 'Create user dashboard', description: 'Build main dashboard interface', priority: 'medium' },
    ],
    done: [
      { id: 'task-6', title: 'Setup project repository', description: 'Initialize Git and CI/CD', priority: 'low' },
      { id: 'task-7', title: 'Write documentation', description: 'Create API and user guides', priority: 'medium' },
    ]
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find which column the active item is in
    let activeColumn = null;
    let activeIndex = -1;
    
    for (const [columnId, items] of Object.entries(columns)) {
      const index = items.findIndex(item => item.id === activeId);
      if (index !== -1) {
        activeColumn = columnId;
        activeIndex = index;
        break;
      }
    }

    if (activeColumn === null) return;

    // Find which column the over item is in
    let overColumn = null;
    let overIndex = -1;
    
    for (const [columnId, items] of Object.entries(columns)) {
      const index = items.findIndex(item => item.id === overId);
      if (index !== -1) {
        overColumn = columnId;
        overIndex = index;
        break;
      }
    }

    if (overColumn === null) return;

    // If moving within the same column
    if (activeColumn === overColumn) {
      const newItems = [...columns[activeColumn]];
      const [removed] = newItems.splice(activeIndex, 1);
      newItems.splice(overIndex, 0, removed);
      
      setColumns({
        ...columns,
        [activeColumn]: newItems
      });
    } else {
      // Moving between different columns
      const sourceItems = [...columns[activeColumn]];
      const destItems = [...columns[overColumn]];
      
      const [movedItem] = sourceItems.splice(activeIndex, 1);
      destItems.splice(overIndex, 0, movedItem);
      
      setColumns({
        ...columns,
        [activeColumn]: sourceItems,
        [overColumn]: destItems
      });
    }
  };

  const columnConfig = [
    { id: 'backlog', title: 'Backlog', items: columns.backlog },
    { id: 'inProgress', title: 'In Progress', items: columns.inProgress },
    { id: 'done', title: 'Done', items: columns.done }
  ];

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className='grid md:grid-cols-3 gap-4'>
        {columnConfig.map((column) => (
          <div key={column.id} className='p-4 rounded-xl border border-gray-200 bg-white/60'>
            <div className='font-semibold mb-3 text-gray-800'>{column.title}</div>
            <div className='text-sm text-gray-500 mb-4'>{column.items.length} tasks</div>
            <SortableContext items={column.items.map(item => item.id)} strategy={rectSortingStrategy}>
              <div className='grid gap-2 min-h-[200px]'>
                {column.items.map((item) => (
                  <Card 
                    key={item.id} 
                    id={item.id} 
                    title={item.title} 
                    description={item.description}
                    priority={item.priority}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
