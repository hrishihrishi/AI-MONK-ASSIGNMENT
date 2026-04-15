export const exportToCSV = (trees) => {
  /*
   *  FLATTENER FUNCTION
   */
  const flatten = (node, parentName = "None", treeId, rows = []) => {
    // Push the current tag's information into our list of rows. EACH ROW IS A OBJECT.
    rows.push({
      tree_id: treeId,    
      name: node.name,     
      data: node.data || "N/A", 
      parent: parentName   
    });

    // If this tag has children, RECURSE(flatten) for each child
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => flatten(child, node.name, treeId, rows));
    }
    return rows; // Returns rows = [ {...}, {...}, {...},... ]
  };

  /**
   * ITERATIVELY ACCESS ALL TREES
   * Loop through every tree saved in your React state ('trees') and flatten them.
   */
  let allRows = [];
  trees.forEach(tree => {
    // We pass the tree's content (the actual JSON) and its database ID
    allRows = [...allRows, ...flatten(tree.content, "Root", tree.id)];
  });


  /**CSV STRING CONSTRUCTION
   * Turn the array of JavaScript objects into a single long string formatted with commas.
   */
  const headers = ["Tree ID", "Tag Name", "Data", "Parent Tag"];
  
  const csvContent = [
    headers.join(","), // Creates the first row: "Tree ID,Tag Name,Data,Parent Tag"

    // for each object in rows.
    ...allRows.map(row => 
      // Wraps in "" to neatness
      `${row.tree_id},"${row.name}","${row.data}","${row.parent}"`
    )
  ].join("\n"); // Joins every row in the rows array with a New Line character, -> becomes strings!


  /** BROWSER DOWNLOAD USING BLOB STORAGE
   */
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // temporary URL that points to that file in browser memory.
  const url = URL.createObjectURL(blob);
  
  // hidden <a> element
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "tags_export.csv"); // Set the filename
  link.style.visibility = 'hidden';
  
  // auto click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};