module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    const postDate = new Date(date);
    return postDate.toLocaleDateString();
  },
};
