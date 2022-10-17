import mongoose from "mongoose";

const EntrykeySchema = mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    Key:{
        type:String,
        required:true
    }
})

const EntryKey = mongoose.model("EntryKey",EntrykeySchema)
export default EntryKey