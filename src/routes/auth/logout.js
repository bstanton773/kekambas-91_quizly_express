module.exports = async (req, res) => {
    // Clear JWT cookie
    res.cookie('jwtToken', '', { maxAge: 900000, httpOnly: true })
    res.redirect('/')
}