const Contact = require("../models/contact");

const createContact = async (req,res)=>{
  try{
    const contact = new Contact(req.body);
    await contact.save();

    res.json({message:"Data saved"});
  }
  catch(error){
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {createContact};