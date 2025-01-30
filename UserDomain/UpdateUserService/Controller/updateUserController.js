const User = require('../Model/User'); // Ensure the model is imported correctly.

const update_user = async function(req, res) {
    try {
        const id = req.params['id'];
        const data = req.body;

        // Check if the user exists
        let userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).send({ message: "User not found" });
        }

        console.log("Data received for update:", data);

        // Update user
        let user = await User.findByIdAndUpdate(id, {
            names: data.names || userExists.names,
            surnames: data.surnames || userExists.surnames,
            genrer: data.genrer || userExists.genrer,
            birth: data.birth || userExists.birth,
            profession: data.profession || userExists.profession,
            telephone: data.telephone || userExists.telephone,
            description: data.description || userExists.description
        }, { new: true }); // `new: true` returns the updated document

        res.status(200).send({ message: "User updated successfully", data: user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Server error", error });
    }
};

module.exports = {
    update_user
};
