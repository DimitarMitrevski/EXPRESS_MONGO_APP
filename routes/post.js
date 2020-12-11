const express = require('express');
const router = express.Router();

//posts Model
const Posts = require('../models/Posts');

// /* GET users listing. */
router.get('/', async (req, res) => {

    try {
        const posts = await Posts.find();
        if (!posts) throw Error('Нема постови');
        res.render('posts', { post: posts });

    } catch (err) {
        res.status(400).json({ msg: err });
    }
});
router.get('/:id', async (req, res) => {

    try {
        const post = await Posts.findById(req.params.id);
        if (!post) throw Error('Нема пост');
        // res.status(200).json(post);
        res.render('post', { post: post });

    } catch (err) {
        res.status(400).json({ msg: err });
    }
});


router.post('/', async (req, res) => {
    const newPost = new Posts(req.body);
    try {
        const post = await newPost.save();
        if (!post) throw Error('Нешто тргна наопаку!');
        res.redirect('/posts');
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) throw Error('No post found');
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

// /* GET users listing. */
router.patch('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
        if (!post) throw Error('Нешто тргна наопаку за ажурирање на постот!');
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});
module.exports = router;
