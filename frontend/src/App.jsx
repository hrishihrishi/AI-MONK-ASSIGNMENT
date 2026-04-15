import { useTrees } from "./hooks/useTrees";
import TagView from "./components/TagView";
import { exportToCSV } from "./utils/exportCSV";

export default function App() {
  const {
    trees,
    loading,
    handleCreateNew,
    handleUpdateNode,
    handleExport,
    handleDelete,
  } = useTrees();

  if (loading) return <p>Loading...</p>;
  console.log("trees", trees);

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

      <button
        onClick={()=>exportToCSV(trees)}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        Download CSV
      </button>
      hi
    </div>
  );
}
