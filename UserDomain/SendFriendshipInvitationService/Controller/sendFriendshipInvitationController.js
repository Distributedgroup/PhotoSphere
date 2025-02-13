const User = require('../Model/User'); 
const User_invitation = require('../Model/User_invitation'); 



const send_friendship_invitation = async function(req, res) {
    console.log("Solicitud recibida:", req.body);  // Para ver si la solicitud llega
    if (req.user) {
        let data = req.body;
        data.user_origin = req.user.sub;
        let invitation = await User_invitation.create(data);
        res.status(200).send({ data: invitation });
    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
};


module.exports = {
    send_friendship_invitation
}
