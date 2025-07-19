

const  signup = async(req, res)=>{
    const {email, password} = req.body
    console.log(email, password)
    res.send('signup succefully')
}

const login = async (req, res) =>{
    console.log("Abhinav Kumar Yadav")
    res.send("login succefully")
}

module.exports = {signup, login}