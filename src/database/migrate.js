const User = require('../models/user');
const Post = require('../models/post');


User.sync();
Post.sync();