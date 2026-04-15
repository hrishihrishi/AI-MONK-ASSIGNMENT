const VITE_API_URL = import.meta.env.VITE_API_URL;

export const treeService = {

  // ---------checked
  getData: async () => {
    const response = await fetch(`${VITE_API_URL}/trees/`);
    if (!response.ok) throw new Error("Backend not reachable");
    const data = await response.json();
    return data;
  },

  postData: async (data) => {
    const response = await fetch(`${VITE_API_URL}/trees/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Backend not reachable");
    return response.json();
  },

  putData: async (data) => {
    const response = await fetch(`${VITE_API_URL}/trees/${data.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Backend not reachable");
    return response.json();
  },

  deleteData: async (data) => {
    const response = await fetch(`${VITE_API_URL}/trees/${data.id}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Backend not reachable");
    return response.json();
  }
}