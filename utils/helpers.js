module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // Format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.95) {
      return `<span for="img" aria-label="lightbulb">🍔</span>`;
    } else if (randomNum > 0.9 && randomNum <= 0.95) {
      return `<span for="img" aria-label="laptop">🍰</span>`;
    } else if (randomNum > 0.85 && randomNum <= 0.9) {
      return `<span for="img" aria-label="gear">🥧</span>`;
    } else if (randomNum > 0.8 && randomNum <= 0.85) {
      return `<span for="img" aria-label="dumpling">🥟</span>`;
    } else if (randomNum > 0.75 && randomNum <= 0.8) {
      return `<span for="img" aria-label="bagel">🥯</span>`;
    } else if (randomNum > 0.7 && randomNum <= 0.75) {
      return `<span for="img" aria-label="pancake">🥞</span>`;
    } else if (randomNum > 0.65 && randomNum <= 0.7) {
      return `<span for="img" aria-label="croissant">🥐</span>`;
    } else if (randomNum > 0.6 && randomNum <= 0.65) {
      return `<span for="img" aria-label="beef">🥩</span>`;
    } else if (randomNum > 0.55 && randomNum <= 0.6) {
      return `<span for="img" aria-label="ham">🍖</span>`;
    } else if (randomNum > 0.5 && randomNum <= 0.55) {
      return `<span for="img" aria-label="custard">🍮</span>`;
    } else if (randomNum > 0.45 && randomNum <= 0.5) {
      return `<span for="img" aria-label="fries">🍟</span>`;
    } else if (randomNum > 0.4 && randomNum <= 0.45) {
      return `<span for="img" aria-label="cupcake">🧁</span>`;
    } else if (randomNum > 0.35 && randomNum <= 0.4) {
      return `<span for="img" aria-label="cookie">🍪</span>`;
    } else if (randomNum > 0.3 && randomNum <= 0.35) {
      return `<span for="img" aria-label="veggie">🥦</span>`;
    } else if (randomNum > 0.25 && randomNum <= 0.3) {
      return `<span for="img" aria-label="icecream">🍦</span>`;
    } else if (randomNum > 0.2 && randomNum <= 0.25) {
      return `<span for="img" aria-label="shrimp">🍤</span>`;
    } else if (randomNum > 0.15 && randomNum <= 0.2) {
      return `<span for="img" aria-label="onigiri">🍙</span>`;
    } else if (randomNum > 0.1 && randomNum <= 0.15) {
      return `<span for="img" aria-label="salad">🥗</span>`;
    } else if (randomNum > 0.05 && randomNum <= 0.1) {
      return `<span for="img" aria-label="pan">🍳</span>`;
    } else {
      return `<span for="img" aria-label="taco">🌮</span>`;
    }

  },
  // Sees if the user is the owner of a comment (the one who commented it so that they can then edit/delete that comment)
  is_commenter: (comment_user_id, user_id) => {
    if (comment_user_id === user_id) {
      return true;
    }
  },
};
