const express = require("express");
const router = express.Router();


const{
    getAllForm,setApproval,getAllAdminForm,setDisapproval,ePassSender
} = require("../controller/Form");


router.post("/getAllForms",getAllForm);
router.post("/setApproval",setApproval);
router.post("/getAllAdminForm",getAllAdminForm);
router.post("/setDisapproval",setDisapproval);
router.post("/epassSender",ePassSender);

module.exports = router;
