
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


var login=document.getElementById('login');
var formulario=document.getElementById('formulario');

var usuario;
var contraseña;
var Contraseña;
var btnIniciar=document.getElementById('iniciar');
function ocultar(){
    

    login.style.display="none";
    formulario.style.display="block";

}

function comprobar()
{
    leerInputs();
    const dbref=ref(db);
    get(child(dbref,'usuarios/'+usuario)).then((snapshot)=>{
        if(snapshot.exists())
        {
            Contraseña=snapshot.val().Contraseña;
            verificar();
        }
        else{
            alert("Usuario O Contraseña Erroneas");
        }
    }).catch((error)=>{
        alert("Se ha encontrado un Error: "+error);
    });
}

function leerInputs()
{
    usuario=document.getElementById('usuario').value;
    contraseña=document.getElementById('contraseña').value;
}


function verificar()
{
    if(contraseña==Contraseña)
    {
        alert("Inicio de Sesion Correcto");
        ocultar();
    }
    else{
        alert("Usuario O Contraseña Erroneas");
    }
}

btnIniciar.addEventListener('click',comprobar);