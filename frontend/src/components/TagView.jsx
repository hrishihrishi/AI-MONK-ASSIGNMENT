import React, { useState } from 'react';

const TagView = ({ node, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  // Requirement: Handle name editing (Bonus) [cite: 33, 35]
  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    }
  };

  // Requirement: "Add Child" replaces "data" with "children" [cite: 10, 25]
  const addChild = () => {
    const newNode = { ...node };
    // delete newNode.data;
    newNode.children = [...(newNode.children || []), { name: 'New Child', data: 'Data' }];
    onUpdate(newNode);
  };

  const updateData = (val) => onUpdate({ ...node, data: val });
  const updateName = (val) => onUpdate({ ...node, name: val });

  return (
    <div style={{ border: '1px solid #007bff', margin: '10px', padding: '5px' }}>
      <div style={{ backgroundColor: '#58b4f5', display: 'flex', alignItems: 'center', padding: '5px' }}>
        {/* Requirement: Toggle "v" and ">" [cite: 20, 23] */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ marginRight: '10px' }}>
          {isCollapsed ? '>' : 'v'}
        </button>

        {isEditingName ? (
          <input 
            value={node.name} 
            onChange={(e) => updateName(e.target.value)} 
            onKeyDown={handleNameKeyDown} 
            autoFocus 
          />
        ) : (
          <span onClick={() => setIsEditingName(true)} style={{ cursor: 'pointer', flexGrow: 1 }}>
            {node.name}
          </span>
        )}

        <button onClick={addChild} style={{ marginLeft: 'auto' }}>Add Child</button>
      </div>

      {!isCollapsed && (
        <div style={{ padding: '10px' }}>
          {/* Requirement: Render data as input field if present [cite: 18] */}
          {node.data !== undefined && (
            <div>
              Data <input value={node.data} onChange={(e) => updateData(e.target.value)} />
            </div>
          )}
          {/* Requirement: Recursively render children [cite: 4, 8] */}
          {node.children && node.children.map((child, idx) => (
            <TagView 
              key={idx} 
              node={child} 
              onUpdate={(updatedChild) => {
                const newChildren = [...node.children];
                newChildren[idx] = updatedChild;
                onUpdate({ ...node, children: newChildren });
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagView;