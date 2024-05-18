const router=require('express').Router();
const User=require('./userModal')
const authUser=require('./authUser');

router.post('/users', async(req,res)=>{
    console.log(req.body)
    try{
        const user=await User.create(req.body);
        await user.generateToken();
        res.send(user)
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.post('/login', async (req,res)=>{
    
    const {email,password}=req.body;
    console.log(req.body)
    try{
        const user=await User.findByCredentials(email,password);
        await user.generateToken();
        res.status(200).send(user)
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})

router.post('/auto-login', authUser, async(req, res)=>{
    res.send(req.user);
})

// router.post('/logout', async (req, res)=>{
//     const user=req.user;
//     user.token= '';
//     await user.save();
//     res.status(200).send();
// })

router.post('/logout', authUser, async (req, res) => {
    try {
        const user = req.user;
        user.token = undefined; // Remove the token field completely
        await user.save();
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "An error occurred during logout" });
    }
});


router.post('/add-favorites',authUser, async(req, res)=>{
    const {mealId}=req.body;
    // console.log('mealId', mealId);
    // console.log(req.body);
    const user=req.user;
    user.favorites.push(mealId);
    // console.log(user)
    await user.save();
    res.status(200).send(user);
})

router.post('/remove-favorites',authUser, async(req, res)=>{
    const {mealId}=req.body;
    const user=req.user;
    user.favorites=user.favorites.filter(id=> id !==mealId);
    
    await user.save();
    res.status(200).send(user);
})

module.exports=router;