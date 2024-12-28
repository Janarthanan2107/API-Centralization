// apiWrapper.js
const apiWrapper = async (apiCall, setLoading) => {
    try {
        setLoading && setLoading(true); // Set loading to true
        const response = await apiCall();
        return response;
    } catch (error) {
        throw error; // Let the caller handle the error
    } finally {
        setLoading && setLoading(false); // Set loading to false
    }
};

export default apiWrapper;
