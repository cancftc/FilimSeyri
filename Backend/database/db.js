const mongoose = require("mongoose");

const uri = "mongodb+srv://gezgin:1@cluster0.vy4hyw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connection = () =>{
    mongoose.connect(uri,{
    })
    .then(()=> console.log("MongoDb bağlantısı başarılı"))
    .catch((err) => console.log("Bağlatı Hatası! Hata: " + err.message));
}

module.exports = connection;