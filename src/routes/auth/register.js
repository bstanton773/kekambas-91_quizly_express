module.exports = async (req, res) => {
    console.log(req.body);
    if (req.body.password !== req.body.confirmPass){
        res.send({ error: "Your passwords do not match "})
        return
    }

    const mutation = `mutation register($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password)
    }`
    
    res.send('Registered!');
}