const router = require('express').Router();
const { Image, User } = require('../models');

router.post('/addNewImage', async(req, res, next) => {
    const{title, name, imageUrl, user} = req.body;
    try {
        await Image.create({title, name, imageUrl, user});
        const newImage = await Image.findOne({user});
        await User.updateOne({_id: user}, { $push: {images: newImage._id}});
        res.send('Added new image');
    } catch (error) {
        next(error);
    }
})