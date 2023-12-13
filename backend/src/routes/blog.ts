import express from 'express';
import { Request, Response } from 'express';
import BlogPost from '../models/blogModel';

const router = express.Router();

router.post('/createpost', (req,res) => {
   const { title, content , summary , author ,published ,imageURL, username } = req.body;
  
   if (!title || !content || !summary || !author ) {
       return res.status(400).json(
        {
            success: false,
            msg: 'Please enter all fields',
            data : [],
            errors :{
               err : 'Please enter all fields'
            }
          }
    
       );
   } else {
    
    const newBlogPost = new BlogPost({
        username,
        title,
        content,
        summary,
        author,
        imageURL,
        published
    });

    newBlogPost.save()
        .then((savedPost) => {
            res.json({
                success: true,
                msg: 'Post created!',
                data: [{ 
                    id: savedPost._id,
                    username: savedPost.username,
                    title: savedPost.title,
                    author: savedPost.author,
                    content: savedPost.content,
                    summary: savedPost.summary,
                    imageURL: savedPost.imageURL,
                    published: savedPost.published

                 }],
                errors: null
            });
        })
        .catch((err) => {
            res.status(400).json(
                {
                    success: false,
                    msg: 'somthing wrong',
                    data : [],
                    errors :{
                       err : err
                    }
                  }
            
               );
        });

   }

});


router.post('/updatepost', (req,res) => {
    const { id,  title, content , summary , author ,published} = req.body;
   
    if (!title || !content || !summary || !author || !id) {
        return res.status(400).json(
         {
             success: false,
             msg: 'Please enter all fields',
             data : [],
             errors :{
                err : 'Please enter all fields'
             }
           }
     
        );
    } else {
     
        const updateData = {
            title,
            content,
            summary,
            author,
            published
        };
   
        BlogPost.findByIdAndUpdate(id, updateData, { new: true })
            .then((updatedpost)=>{
                res.json({
                    success: true,
                    msg: 'Post Updated!',
                    data: [{ 
                        id: updatedpost?._id,
                        title: updatedpost?.title,
                        content: updatedpost?.content,
                        summary: updatedpost?.summary,
                        published: updatedpost?.published,
                        author: updatedpost?.author

                        }],
                    errors: null
                });
            })
            .catch((err) => {
                res.status(400).json(
                    {
                        success: false,
                        msg: 'somthing wrong ! please check error',
                        data : [],
                        errors :{
                           err : err
                        }
                      }
                
                   );
            });
    }
 
 });

 router.get('/getpostall',(req,res)=>{
    BlogPost.find()
    .then((posts)=>{
        res.json({
            success: true,
            msg: 'Post get!',
            data: posts,
            errors: null
            
        });
    })
    .catch((err) => {
        res.status(400).json(
            {
                success: false,
                msg: 'somthing wrong ! please check error',
                data : [],
                errors :{
                   err : err
                }
              }
        
           );
    });
 })


 router.get('/getpostbyid/:id' , (req,res)=>{


    BlogPost.findById(req.params.id)
    .then((post)=>{
        res.json({
            success: true,
            msg: 'Post get!',
            data: post,
            errors: null
        })
 })
    .catch((err)=>{
        res.status(400).json(
            {
                success: false,
                msg: 'somthing wrong ! please check error',
                data : [],
                errors :{
                err : err
                }
            }
        );
    })  
});


router.delete('/deletepost/:id' , (req,res)=>{

    BlogPost.findByIdAndDelete(req.params.id)
    .then((post)=>{
        res.json({
            success: true,
            msg: 'Post deleted!',
            data: post,
            errors: null
        })
 })
    .catch((err)=>{
        res.status(400).json(
            {
                success: false,
                msg: 'somthing wrong ! please check error',
                data : [],
                errors :{
                err : err
                }
            }
        );
    })  
});


router.get('/getpostbyusername/:username' , (req,res)=>{
    BlogPost.find({username : req.params.username})
    .then((post)=>{
        res.json({
            success: true,
            msg: 'Post get!',
            data: post,
            errors: null
        })
 })
    .catch((err)=>{
        res.status(400).json(
            {
                success: false,
                msg: 'somthing wrong ! please check error',
                data : [],
                errors :{
                err : err
                }
            }
        );
    })  
});
 
    


export default router;

 
