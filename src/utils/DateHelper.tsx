// Helper function to check if a date is within this week
const isThisWeek = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay();
    const lastDayOfWeek = firstDayOfWeek + 6;

    const startOfWeek = new Date(today.setDate(firstDayOfWeek));
    const endOfWeek = new Date(today.setDate(lastDayOfWeek));

    return date >= startOfWeek && date <= endOfWeek;
};

// Helper function to check if a date is within this month
const isThisMonth = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

export { isThisWeek, isThisMonth };