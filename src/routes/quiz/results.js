const axios = require('axios')

module.exports = async (req, res) => {
    let submission;
    try {
        const query = `
            query submissionById($id: String!){
                submissionById(id: $id){
                    id
                    quiz{
                        title
                    }
                    user{
                        id
                    }
                    score
                }
            }
        `
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            {
                query,
                variables: { id: req.params.id }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        submission = data.data.submissionById

        if (submission.user.id !== req.verifiedUser.user._id){
            req.redirect('/')
        }
    } catch(e) {
        console.log(e)
    }
    res.render('quiz-results', { submission })
}