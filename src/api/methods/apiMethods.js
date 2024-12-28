import apiClient from "../apiService";
import apiWrapper from "../apiWrapper";

const ApiMethods = {
    todos: {
      fetchAll: (page = 1, limit = 10, setLoading) =>
        apiWrapper(() => apiClient.get(`/todos?page=${page}&limit=${limit}`), setLoading),
      fetchOne: (id, setLoading) =>
        apiWrapper(() => apiClient.get(`/todos/${id}`), setLoading),
      create: (data, setLoading) =>
        apiWrapper(() => apiClient.post(`/todos`, data), setLoading),
      update: (id, data, setLoading) =>
        apiWrapper(() => apiClient.put(`/todos/${id}`, data), setLoading),
      delete: (id, setLoading) =>
        apiWrapper(() => apiClient.delete(`/todos/${id}`), setLoading),
    },
    
    users: {
      fetch: (id, setLoading) =>
        apiWrapper(() => apiClient.get(`/users/${id}`), setLoading),
    },
  };
  
  export default ApiMethods;
  