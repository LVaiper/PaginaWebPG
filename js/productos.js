// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import{ getDatabase,onValue,ref,get,set,child,update,remove }
from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

import{ getStorage, ref as refS,uploadBytes,getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-6PYwPjolGh-E-TIkKv1GoEKbjySm1Xk",
    authDomain: "sitioweb-c48d5.firebaseapp.com",
    databaseURL:"https://sitioweb-c48d5-default-rtdb.firebaseio.com",
    projectId: "sitioweb-c48d5",
    storageBucket: "sitioweb-c48d5.appspot.com",
    messagingSenderId: "176741568195",
    appId: "1:176741568195:web:1b692e302d33409f4adc76"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db=getDatabase();



const dbRef=ref(db,'productos');
onValue(dbRef,(snapshot)=>{
    contenedorImagenes.innerHTML=""
    snapshot.forEach((childSnapshot)=>{
        const childKey=childSnapshot.key;
        const childData=childSnapshot.val();
        if(childData.Estatus=="0")
        {
            contenedorImagenes.innerHTML= contenedorImagenes.innerHTML+"<picture > <img class='producto2' src='"+childData.Url+"'>"+"<article> <h3 class='texto'>"+childData.NombreProducto+"<br>"+childData.Descripcion+"<br>"+childData.Precio+"</h3> </article> </picture>";
       


        }
    });

},{
    onlyOnce:true
})