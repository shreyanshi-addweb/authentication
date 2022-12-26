const Post = require('../model/Post');
const fs = require('fs');

module.exports = class API{
    // fetch all
    static async fetchAll(req,res){
        console.log('fetch all call');
        try {
            const posts = await Post.find({});
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
     // fetch by id
     static async fetchById(req,res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    static async fetchByCategory(req,res){
        console.log("fetch categogy")
        // const category = req.query;
        // console.log(category);
        try {
            const post = await Post.find(req.query);
            res.status(200).json(post);
            // console.log(res.status(200).json(post),"postdata");
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
     // create post
     static async createPost(req,res){
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({message: 'post created successfully!!'});
        } catch (error) {
            res.status(400).json({message: error.message});
 }
    }
     // update post
     static async updatePost(req,res){
        const id = req.params.id;
        let new_image = "";
        if(req.file){
            new_image = req.file.filename;
          
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (error) {
                console.log(error);
            }
        }
        else{
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;
        try {
            await Post.findByIdAndUpdate(id,newPost);
            res.status(200).json({ message: 'post updated successfully..!!'})
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
     // delete post
     static async deletePost(req,res){
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({message: "post deleted successfully..!!"});
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};