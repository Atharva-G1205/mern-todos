export function formatDate(date) {
    const parsedDate = new Date(date);

    // check if parsedDate is an invalid date
    if (isNaN(parsedDate.getTime())) {
        console.warn("Invalid date passed to formatDate:", date);
        return ""; // or return "invalid date" or fallback string
    }

    return parsedDate.toLocaleDateString('en-IN', {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
