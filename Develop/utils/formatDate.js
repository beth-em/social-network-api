// Format for a readable timestamp into a date/time string
export const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
}; 