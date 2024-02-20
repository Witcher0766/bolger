const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const multer  = require('multer')
const fs = require('fs');
const PORT = process.env.PORT || 4000;

const uploadMiddleware = multer({ dest: 'uploads/' })
const salt = bcrypt.genSaltSync(10);
const secret = 'axcjkasfjkhkhkjhjgjsfdk';
const app = express();
app.use(cors({credentials:true,origin:['http://localhost:3000', 'https://mern-blog.onrender.com']}));
app.use(express.json());
app.use(cookieparser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://vishuBlog:FDagOgVkEAFX2d5A@cluster0.tt8eis7.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
   try {
    const userDoc =  await User.create({
        username, 
        password:bcrypt.hashSync(password, salt),
    });
    // res.json({requestData:{username, password}});
    res.json(userDoc);
   } catch (e) {
    console.log("this is register error",e);
    res.status(400).json(e);
   }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json("User not found");
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            const token = jwt.sign({ username, id: userDoc._id }, secret, {});
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        } else {
            res.status(400).json("Wrong credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            res.json(info);
        }
    });
});

app.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict', 
        });
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) res.status(401).json({ error: 'Unauthorized' });
            const {title,summary,content} = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover:newPath,
                author:info.id,
            })
            res.json(postDoc);
    });
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
  
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          content,
          cover: newPath ? newPath : postDoc.cover,
        },
        { new: true }
      );
      res.json(updatedPost);
    });
  });

  
app.get('/post', async (req, res) => {
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    );
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc)
})

app.delete('/post/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost) {
          res.json({ success: true, message: 'Post deleted' });
        } else {
          res.status(404).json({ success: false, message: 'Post not found' });
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ success: false, message: 'Unable to delete post' });
      }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


// FDagOgVkEAFX2d5A