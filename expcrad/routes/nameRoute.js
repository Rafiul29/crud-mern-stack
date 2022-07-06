const router=require('express').Router();
const { json } = require('express');
const name=require('../model/name');

router.post('/save',async (req,res)=>{
    let names=new name(req.body);
    try{
        let resp=await names.save()
        res.json({success:true,data:resp});
    }catch (err){
        res.json({success:false,data:err});
    }
})

router.get('/getName',async(req,res)=>{
    try{
        let names=await  name.find();
        res.send(names);
    }catch (err){
        res.json({err:err})
    }
})


router.put('/update/:id',async(req,res)=>{
    const  nameupdate = await name.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
    })
    try{
        res.status(200),json({
            status: "update success",
        })
    }catch(err){
        console.log(err)
    }
    console.log(nameupdate);
    })

router.delete('/delete/:id',async(req,res)=>{
   let result = await name.findByIdAndDelete(req.params.id)
    try{
        res.status(204).json({
            status: "delete success"
        })
    }catch(err){
        res.status(204).json({
            status: "delete not success",
            message: err
        })
    }
    console.log(result);
})





module.exports=router;
