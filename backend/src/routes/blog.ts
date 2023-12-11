import express from 'express';
import { Request, Response } from 'express';
import BlogPost from '../models/blogModel';

const router = express.Router();

router.post('/createpost', (req,res) => {
   const { title, content , summary , author ,published } = req.body;
  
   if (!title || !content || !summary || !author) {
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
        title,
        content,
        summary,
        author,
        published
    });

    newBlogPost.save()
        .then((savedPost) => {
            res.json({
                success: true,
                msg: 'Post created!',
                data: [{ 
                    id: savedPost._id,
                    title: savedPost.title,
                    author: savedPost.author,
                    content: savedPost.content,
                    summary: savedPost.summary,
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
    const { id,  title, content , summary , author ,published } = req.body;
   
    if (!title || !content || !summary || !author) {
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


    


export default router;

 
