const axios = require('axios');

module.exports = async (req, res) => {
    if (!req.body.email || !req.body.password){
        res.redirect('/auth/login')
        return
    }

    const mutation = `
        mutation login($email: String!, $password: String!){
            login( email: $email, password: $password)
        }
    `
    try{
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(data);
        res.redirect('/')
    } catch(e) {
        console.log(e)
        res.redirect('/auth/login')
    }
}