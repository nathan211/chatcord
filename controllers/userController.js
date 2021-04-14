const { User } = require('../models/userModel');

exports.insertUser = async (username) => {
    try {
        if(await User.findOne({username})) return {status: false};
        
        const user = new User({username});

        const savedUser = await user.save();

        return {
            status: true, 
            user: savedUser
        };
    } catch (error) {
        console.log(error.message);
    }
} 