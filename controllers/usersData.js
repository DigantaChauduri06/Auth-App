
const bcrypt = require('bcryptjs');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const User = require('../model/schema');
const cloudinary = require('cloudinary').v2;

exports.signup = async (req, res) => {
    async (req, res) => {
        try {
            const form = formidable({ multiples: true });
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.log(err);
                    return;
                }
                let { firstName, lastName, email, password } = fields;
                email = email.toLowerCase();
                console.log(firstName, lastName, email, password);
                if (!firstName || !lastName || !email || !password) {
                    res.send('Please enter all required fields');
                    return;
                }
                // console.log(`C:\\Users\\digan\\AppData\\Local\\Temp\\${files.MyFile.newFilename}`);
                let ImageUrl;
                await cloudinary.uploader.upload(`C:\\Users\\digan\\AppData\\Local\\Temp\\${files.MyFile.newFilename}`, {
                    resource_type: "image",
                    public_id: `myfolder/mysubfolder/${uuidv4()}`
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    ImageUrl = result.secure_url;
                    console.log(ImageUrl);
                    console.log(result);

                });
                // if (!ImageUrl) ImageUrl = "";

                const existingUser = await User.findOne({ email: email });
                if (existingUser) {
                    res.redirect('/signin');
                    return;
                }
                const encryptedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({ firstName, lastName, email, password: encryptedPassword, ImageUrl });
                console.log(user);
                console.log(files);

            })

        } catch (e) {
            console.log(e);
        }
        res.redirect('/signin')
    }
    
}
exports.signin = async (req, res) => {
    async (req, res) => {
        try {
            let { email, password } = req.body;
            email = email.toLowerCase();
            if (!email || !password) {
                res.send('Please Enter all details.');
                return;
            }
            const findEmail = await User.findOne({ email: email });
            if (!findEmail) {
                res.send('Please Register');
                return;
            }
            const checkPassword = await bcrypt.compare(password, findEmail.password);
            if (!checkPassword) {
                res.send('Please Enter correct password');
                return;
            }
        } catch (e) {
            console.log(e);
        }
        res.redirect('dashboard');
    }
}