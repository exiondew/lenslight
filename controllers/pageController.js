const getIndexPage = (req, res) => {
    console.log("REQUEST USER: ", req.user);
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

export {
    getAboutPage,
    getIndexPage,
    getLoginPage,
    getRegisterPage
}