module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">🍔</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">🍰</span>`;
    } else {
      return `<span for="img" aria-label="gear">🍇</span>`;
    }
  },
  // Sees if the user is the owner of a comment (the one who commented it so that they can then edit/delete that comment)
  is_commenter: (comment_user_id, user_id) => {
    if (comment_user_id === user_id) {
      return true;
    }
  },
};
