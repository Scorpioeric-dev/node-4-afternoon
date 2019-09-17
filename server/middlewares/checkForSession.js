
module.exports = function(req,res,next){
    //check if the req.session has a user object with key of username,cart [],and total
    const {session} = req
    if(!session.user){
        session.user = { username:'', cart: [], total: 0}
    }
    next()
}