import { useState, useEffect } from "react";
import { treeService } from "../api/treeService";

export const useTrees = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTrees = async () => {
      try {
        const data = await treeService.getData();
        if (isMounted) setTrees(data);
      } catch (err) { console.error(err); }
      finally { if (isMounted) setLoading(false); }
    };
    fetchTrees();
    return () => { isMounted = false; };
  }, []);

  const handleCreateNew = () => {
    const newTree = { content: { name: "root", data: "New Root Data", children: [] } };
    setTrees([...trees, newTree]);
  };

  const handleUpdateNode = (index, updatedContent) => {
    const newTrees = [...trees];
    newTrees[index] = { ...newTrees[index], content: updatedContent };
    setTrees(newTrees);
  };

  const handleExport = async (index) => {
    const treeObj = trees[index];
    const isExisting = treeObj.id !== undefined;
    try {
      const response = isExisting 
        ? await treeService.putData(treeObj) 
        : await treeService.postData(treeObj);
      
      const updatedTrees = [...trees];
      updatedTrees[index] = response;
      setTrees(updatedTrees);
      alert("Saved!");
    } catch (err) { alert("Save failed"); }
  };

  const handleDelete = async (treeObject) => {
    try {
      if (treeObject.id !== undefined) {
        await treeService.deleteData(treeObject);
      }
      setTrees(prev => prev.filter(t => t !== treeObject));
      window.location.reload();
    } catch (err) { console.error(err); }
  };

  return { trees, loading, handleCreateNew, handleUpdateNode, handleExport, handleDelete };
};