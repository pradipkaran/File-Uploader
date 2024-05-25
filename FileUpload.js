const express = require("express");
const router = express.Router();//express ka instance late hain lake express se router lete hain

//handler
const {localFileUpload ,imageUpload,videoUpload,imageSizeReducer } = require("../controllers/fileUpload");

//api route

//router.post("/videoUpload",videoUpload); 
router.post("/localFileUpload",localFileUpload); 
router.post("/imageUpload",imageUpload);//path,handler
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);

module.exports = router;

