import { useTrees } from "./hooks/useTrees";
import TagView from "./components/TagView";

export default function App() {
  const { trees, loading, handleCreateNew, handleUpdateNode, handleExport, handleDelete } = useTrees();

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleCreateNew}>+ Create New Tree</button>
      
      {trees.map((tree, index) => (
        <div key={tree.id || `temp-${index}`}>
          <TagView 
            node={tree.content} 
            onUpdate={(content) => handleUpdateNode(index, content)} 
          />
          <button onClick={() => handleExport(index)}>Save</button>
          <button onClick={() => handleDelete(tree)}>Delete</button>
        </div>
      ))}
    </div>
  );
}