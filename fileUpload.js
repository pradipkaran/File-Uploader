const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//localfile uploader handler
exports.localFileUpload = async (req, res) =>{
    try{
         //fetch file
         const file = req.files.file; 
         console.log("FILE AAGAYA GUYSZZZ:",file);
      
         let path = __dirname +"/files/"+Date.now()+ `.${file.name.split('.')[1]}`;
         console.log("PATH:",path);
         //if u went to upload file u have to define mv(move) fun nd (where).
         file.mv(path, (err) =>{
            console.log(err);
         });
         res.json({
            success:true,
            message:'Local file uploaded successfully',
         });
    }
    catch(err){
        console.log("not able to upload the files on server");
        console.log(err);
    }
}





//image Uploader handler
//1.compare fun(validation) 
function isFileTypeSupported(type , supportedTypes){ //type(fun ka type) = supportedtypes(arr) if went to compare use includes
    return supportedTypes.includes(type);
}
//2.if supported then upload in cloudinary
async function uploadFileToCloudinary(file, folder,quality){
    const options = {folder};
    console.log("temp file path",file.tempFilePath);
    if(quality){ //means if quality exit
      options.quality = quality;
    }
    options.resource_type ="auto";//automaticlly detect karain ki file type kya hai (imp)
   return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.imageUpload = async(req,res) =>{
    try{
         //fetch data
         const {name ,tags , email} = req.body;
         console.log(name,tags , email);

         //fetch file
         const file = req.files.imageFile;
         console.log(file);

         //1.validation
         const supportedTypes = ["jpg","jpeg","png"];
         const fileType = file.name.split('.')[1].toLowerCase();//filetype -> current file type

         if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format not supported',
            });
         }
         //2.if file format supported upload in cloudinary
       const response = await uploadFileToCloudinary(file , "karan");
       console.log(response); //this is important for image url copy
       //db entry save
       const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
       });

    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image successfully uploaded',
    });


    }
    catch(error){
       console.error(error);
       res.status(400).json({
        success:false,
        message:'something went wrong',
       });
    }
}

//video uploader handler
exports.videoUpload = async(req,res) =>{
    try{
         //fetch data
         const {name ,tags , email} = req.body;
         console.log(name,tags , email);

         //fetch file
         const file = req.files.videoFile;
         console.log(file);

         //1.validation
         const supportedTypes = ["mp4","mov"];
         const fileType = file.name.split('.')[1].toLowerCase();//filetype -> current file type
         console.log("file type:",fileType);
        
        //add a upper limit of 5MB for video
         if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format not supported',
            });
         }
         //2.if file format supported upload in CLOUDINARY
       const response = await uploadFileToCloudinary(file , "karan");
       console.log(response); //this is important for image url copy


       //db entry save
       const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
       });

    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'video successfully uploaded',
    });


    }
    catch(error){
       console.error(error);
       res.status(400).json({
        success:false,
        message:'something went wrong',
       });
    }
}

//imageSizeReducer handler
exports.imageSizeReducer = async(req,res) =>{
    try{
         //fetch data
         const {name ,tags , email} = req.body;
         console.log(name,tags , email);

         //fetch file
         const file = req.files.imageFile;
         console.log(file);

         //1.validation
         const supportedTypes = ["jpg","jpeg","png"];
         const fileType = file.name.split('.')[1].toLowerCase();//filetype -> current file type

         if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format not supported',
            });
         }
         //2.if file format supported upload in cloudinary
       const response = await uploadFileToCloudinary(file , "karan", 10);
       console.log(response); //this is important for image url copy
       //db entry save
       const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
       });

    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image successfully uploaded',
    });


    }
    catch(error){
       console.error(error);
       res.status(400).json({
        success:false,
        message:'something went wrong',
       });
    }
}

