const mongoose=require("mongoose");

const workSchema=mongoose.Schema({
    Role:{
        type: String,
        required: [true, "Please Enter Role Name"],
    },
    description:{
        type: String,
        required: [true, "Please Enter description"],
    },
    company:{
        type: String,
        required: [true, "Please Enter company Name"],
    },
    salary:{
        type: Number,
        required: [true, "Please Enter salary"],
    },
    location:{
        type: String,
        required: [true, "Please Enter Locations/Location"],
    },
    logo:{
        type: String,
        required: [true, "Please upload company logo"],
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', 
        required: true
    }
})

module.exports = mongoose.model("Work", workSchema);
