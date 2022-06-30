const axios = require('axios');


module.exports = async (req, res) => {
    if (req.body.password !== req.body.confirmPass){
        res.send({ error: "Your passwords do not match "})
        return
    }

    const mutation = `mutation register($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password)
    }`
    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const token = data.data.register
        res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true })
        res.redirect('/');
    } catch(e){
        console.log(e)
        res.redirect('/auth/register')
    }
}
