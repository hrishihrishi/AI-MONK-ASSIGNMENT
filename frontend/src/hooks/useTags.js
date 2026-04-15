const handleDeleteChild = (node, childIndex) => {
    const newNode = { ...node };
    newNode.children.splice(childIndex, 1);
    return newNode;
}