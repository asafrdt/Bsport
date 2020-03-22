exports.createPostValidator = (req,res,next) => {
    //title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min:4,
        max: 150
    });
    //body
    req.check("body", "Write a body").notEmpty();
    req.check("title", "Body must be between 4 to 2000 characters").isLength({
        min:4,
        max: 2000
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happend
    if (errors) {
        const firstError = errors.map((error)=> error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middlewate
    next();
};

exports.userSignupValidator = (req,res,next) => {
    //name is not null and between 4-10 characters
    req.check("name","Name is required").notEmpty();
    // email is not null, valid and normallized
    req.check("email", "Email must be beetween 3 to 32 characters")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage("Please enter a valid Email Adress")
    .isLength({
        min: 4,
        max:2000
    })
    //check for password
    req.check("password", "password is requierd").notEmpty();
    req.check('password')
    .isLength({min:6})
    .withMessage("Password must conatin at least 6 charcaters")
    .matches(/\d/)
    .withMessage("Password Must Contain a number")
    //check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happend
    if (errors) {
        const firstError = errors.map((error)=> error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middlewate
    next();
}