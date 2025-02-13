import Photo from "../models/PhotoModel.js";
import User from "../models/UserModel.js";

const getIndexPage = (req, res) => {
    res.render("index");
};
const getAboutPage = (req, res) => {
    res.render("about");
};
const getRegisterPage = (req, res) => {
    res.render("register");
};
const getLoginPage = (req, res) => {
    res.render("login");
};

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({user: res.locals.user._id}).populate("user");
    const user = await User.findById(res.locals.user._id).populate(["followings", "followers"]);
    res.render("dashboard", {photos, user});
};
const getLogout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
};

const getUsersPage = (req, res) => {
    res.render("users");
};


export {
    getAboutPage,
    getIndexPage,
    getLoginPage,
    getRegisterPage,
    getDashboardPage,
    getLogout,
    getUsersPage,
};
