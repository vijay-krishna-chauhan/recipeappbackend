// const jwt=require('jsonwebtoken');
// const User=require('./userModal');
// const authUser= async(req,res, next)=>{
//     try {
//         const userToken = req.header('Authorization').replace('Bearer ',"");
//         const decodedToken=jwt.verify(userToken, 'mealsSecret');
//         //console.log(decodedToken);
//         const user= await User.findOne({_id: decodedToken._id});
//         if(!user){
//             return res.status(404).json('Please Authenticate');
//         }
//         req.user=user;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send();
//     }
// }

// module.exports=authUser;

const jwt = require('jsonwebtoken');
const User = require('./userModal');

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header is missing' });
        }
        const userToken = authHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(userToken, 'mealsSecret');
        const user = await User.findOne({ _id: decodedToken._id });
        if (!user) {
            return res.status(404).json('Please Authenticate');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

module.exports = authUser;
