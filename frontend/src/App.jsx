import React, { useState, useEffect, useTransition } from "react";
import TagView from "./components/TagView";
import { treeService } from "./api/treeService";

function App() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevents state updates on unmounted components

    const fetchTrees = async () => {
      setLoading(true);
      try {
        const data = await treeService.getData();
        if (isMounted) setTrees(data);
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTrees();
    return () => {
      isMounted = false;
    }; // Cleanup
  }, []);

  // Function to start a brand new tree if the DB is empty
  const handleCreateNew = () => {
    const newTree = {
      // We leave 'id' undefined so the backend knows to POST (create) instead of PUT (update)
      content: {
        name: "root",
        data: "New Root Data",
      },
    };
    setTrees([...trees, newTree]);
  };

  const handleExport = async (treeIndex) => {
    const treeObj = trees[treeIndex];
    // Requirement: Export structure must only have name, children, and data [cite: 29]
    console.log("Export JSON:", JSON.stringify(treeObj.content, null, 2));

    // id is created in django backend
    const isExisting = treeObj.id !== undefined;
    try {
      const response = (await isExisting)
        ? treeService.putData(treeObj)
        : treeService.postData(treeObj);

      // create new variable to update the tree to the latest index and update state.
      const updatedTrees = [...trees];
      updatedTrees[treeIndex] = response;
      setTrees(updatedTrees);

      alert("Hierarchy saved successfully!");
      console.log("response from handleExport try block : :", response);
    } catch (error) {
      alert("Failed to save to database.");
    }
  };

  const handleDeleteTree = async (treeObject, treeIndex) => {
    if (treeObject.id === undefined) {
      setTrees(trees.filter((tree) => tree.id !== treeObject.id));
      return;
    }

    try {
      const response = await treeService.deleteData(treeObject);
      console.log("newTree after deletion:", response);
      setTrees(trees.filter((tree) => tree.id !== treeObject.id));
    } catch (error) {
      console.log("error:", error);
    }
  };
  console.log("trees: ", trees);
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Nested Tags Tree Manager</h2>

      <button
        onClick={handleCreateNew}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {" "}
        + Create New Tree Structure{" "}
      </button>

      {/* Requirement: Displays each tree separately one below the other. (use create new.. button to create more separate tree)*/}
      {trees.map((tree, index) => (
        <div
          key={tree.id || `temp-${index}`}
          style={{
            marginBottom: "40px",
            borderBottom: "2px solid #eee",
            pb: "20px",
          }}
        >
          <TagView
            node={tree.content}
            onUpdate={(updatedContent) => {
              const newTrees = [...trees];
              newTrees[index].content = updatedContent;
              setTrees(newTrees);
            }}
          />
          <button
            onClick={() => handleExport(index)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Export & Save to DB
          </button>

          <button
            onClick={() => handleExport(index)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Export & Save to DB
          </button>

          <button
            onClick={() => handleDeleteTree(tree, index)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Delete Entire Tree
          </button>
        </div>
      ))}

      {trees.length === 0 && (
        <p>No trees found. Click the green button to start.</p>
      )}
    </div>
  );
}

export default App;
