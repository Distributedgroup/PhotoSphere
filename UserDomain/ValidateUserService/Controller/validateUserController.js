const { email_code_reset } = require('../services/emailService'); // Import function
const User = require('../Model/user');  

const validate_user = async function(req, res) {
    try {
        var data = req.body;
        var users = await User.find({ email: data.email });

        if (users.length >= 1) {
            let min = 1000;
            let max = 9999;
            let random = Math.floor(Math.random() * (max - min + 1) + min);

            await User.findByIdAndUpdate(users[0]._id, { code_reset: random });

            // Send the code by email
            await email_code_reset(random, users[0].email);

            res.status(200).send({ data: true });
        } else {
            res.status(200).send({ data: false });
        }
    } catch (error) {
        console.error("❌ Error in validate_user:", error);
        res.status(500).send({ error: "Server error" });
    }
};

module.exports = { validate_user };
