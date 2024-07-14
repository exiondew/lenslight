const getIndexPage = (req, res) => {
    res.render('index');
}
const getAboutPage = (req, res) => {
    res.render('about');
}
const getRegisterPage = (req, res) => {
    res.render('register');
}
const getLoginPage = (req, res) => {
    res.render('login');
}

const getDashboardPage = (req, res) => {
    res.render('dashboard');
}
const getLogout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
}
export {
    getAboutPage,
    getIndexPage,
    getLoginPage,
    getRegisterPage,
    getDashboardPage,
    getLogout
}