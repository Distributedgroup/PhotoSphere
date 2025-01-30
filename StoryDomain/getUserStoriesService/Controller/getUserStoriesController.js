var User_friend = require('../models/User_friend');
var Story = require('../models/Story');
var fs = require('fs');
var path = require('path');

const get_user_stories = async function (req, res) {
    if (req.user) {
        let friends = await User_friend.find({ user_origin: req.user.sub }).populate('user_friend');

        let today = Date.parse(new Date()) / 1000;
        var current_stories_ = [];


        for (var item of friends) {
            var current_stories = [];
            var stories = await Story.find({ user: item.user_friend._id }).populate('user');


            for (var subitem of stories) {
                var tt_created = Date.parse(subitem.createdAt) / 1000;
                var tt_exp = Date.parse(subitem.exp) / 1000;

                if (today >= tt_created && today <= tt_exp) {
                    current_stories.push(subitem);
                    current_stories_.push(subitem);
                }
            }
        }

        res.status(200).send({ data: current_stories_ });

    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
}

module.exports = {
    get_user_stories
};