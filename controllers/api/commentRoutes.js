const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Post a comment (use withAuth middleware to authenticate access)
router.post('/', withAuth, async (req, res) => {
  try {

    const newComment = await Comment.create({
      comment_text: req.body.body,
      commenter_id: req.session.user_id,
      recipe_id: req.body.recipe_id,
    });


    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment (use withAuth middleware to authenticate access)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment (use withAuth middleware to authenticate access)
router.put('/:id', withAuth, async (req, res) => {
  try {

    const updatedComment = req.body.updatedText;

    const updateComment = await Comment.update(
      {
        comment_text: updatedComment
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;