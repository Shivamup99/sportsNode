const About = require('../model/about')

exports.getAbout = async(req,res)=>{
    try {
        let about = await About.find()
        res.status(200).json(about)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.getAboutById = async(req,res)=>{
    try {
        let about = await About.findById({_id:req.params._id})
        res.status(200).json(about)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.postAbout = async(req,res)=>{
        try {
            let image = req.file.path
            if(image===null) return null
            console.log(image)
            const about = new About({
                title: req.body.title,
                content: req.body.content,
               video:req.body.video,
                image:image,
            })
            about.image=image
            await about.save()
            res.status(201).json(about)
        } catch (error) {
           res.json({message:error.message}) 
        }
}

exports.putAbout = async(req,res)=>{
    try {
        const about = await About.findByIdAndUpdate(req.params._id,{
            title: req.body.title,
            content: req.body.content,
            video:req.body.video,
            image:req.file.path,
        },{new:true})
        await about.save()
        res.status(201).json(about)
    } catch (error) {
       res.json({message:error.message}) 
    }
}

exports.deleteAbout = async(req,res)=>{
    try {
        let about = await About.findByIdAndDelete({_id:req.params._id})
        if(about){
            res.status(200).json('data deleted')
        }else{
            res.status(400).json('data not found')
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}