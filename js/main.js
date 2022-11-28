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


var IdProducto;
var NombreProducto;
var Descripcion;
var Cantidad;
var Estatus;
var Precio;
var Url;

function leerInputs()
{

    IdProducto=document.getElementById('id').value;
    NombreProducto=document.getElementById('nombre').value;
    Descripcion=document.getElementById('descripcion').value;
    Cantidad=document.getElementById('cantidad').value;
    Estatus=document.getElementById('estatus').value;
    Precio=document.getElementById('precio').value;
    Url=document.getElementById('url').value;


}

function insertarDatos()
{
    leerInputs();
    set(ref(db,'productos/'+IdProducto),{
        NombreProducto:NombreProducto,Descripcion:Descripcion,Cantidad:Cantidad,Precio:Precio,Estatus:Estatus,Url:Url
    }).then((resp)=>{
        alert("Se Realizo el Registro");
        limpiarInputs();
    }).catch((error)=>{
        alert("ERROR"+" "+error);
    })
}

function limpiarInputs()
{
    document.getElementById('id').value="";
    document.getElementById('nombre').value="";
    document.getElementById('descripcion').value="";
    document.getElementById('cantidad').value="";
   
    document.getElementById('precio').value="";
    document.getElementById('url').value="";

    document.getElementById('imagenp').src="";
}



function modificar()
{


    leerInputs();
    update(ref(db,'productos/'+IdProducto),{
        NombreProducto:NombreProducto, Descripcion:Descripcion, Cantidad:Cantidad, Precio:Precio,Estatus:Estatus,Url:Url
    }).then(resp=>{
        alert("La modificación se ha realizado con Exito");
        limpiarInputs();
    }).catch((error)=>{
        alert("Ocurrio un Error: "+error);
    })

}

function buscarCartas()
{
    leerInputs();
    if(IdProducto=="")
    {
        alert("NO DEJE CAMPOS VACIOS");
    }
    else{



        const dbref=ref(db);
        get(child(dbref,'productos/'+IdProducto)).then((snapshot)=>{
            if(snapshot.exists())
            {
                Cantidad=snapshot.val().Cantidad;
                Descripcion=snapshot.val().Descripcion;
                Estatus=snapshot.val().Estatus;
                NombreProducto=snapshot.val().NombreProducto;
                Precio=snapshot.val().Precio;
                Url=snapshot.val().Url;

                llenarInputs();
                cargarImagen2();
            }
            else{
                alert("No existe :(");
            }
        })


    }
}

function borrarCarta()
{
    Estatus=1;
    update(ref(db,'productos/'+IdProducto),{ 
        Estatus:Estatus,
    }).then(resp=>{
        alert("Se ha Borrado con Exito");
        limpiarInputs();
    }).catch((error)=>{
        alert("Ocurrio un Error: "+error);
    })
}
function llenarInputs()
{


    document.getElementById('nombre').value=NombreProducto;
    document.getElementById('descripcion').value=Descripcion;
    document.getElementById('cantidad').value=Cantidad;
    document.getElementById('estatus').value=Estatus;
    document.getElementById('precio').value=Precio;
    document.getElementById('url').value=Url;

}

async function cargarImagen()
{
    const file=event.target.files[0];
    const name=event.target.files[0].name;

    const storage=getStorage();
    const storageRef= refS(storage, 'imagenes/'+name);

    await uploadBytes(storageRef,file).then((snapshot)=>{
        descargarImagen(name);
    })
}

async function descargarImagen(name)
{
    const storage =getStorage();
    const starsRef=refS(storage,'imagenes/'+name);


    await getDownloadURL(refS(storage,'imagenes/'+name))
    .then((url)=>{
        document.getElementById('url').value=url;
        cargarImagen2()
    })
}
function cargarImagen2()
{
   var link=document.getElementById('url').value;

    document.getElementById('imagenp').src=link;
}

function existe()
{
    leerInputs();
    if(IdProducto=="" || NombreProducto=="" || Descripcion=="" ||Cantidad==""||Estatus==""||Precio=="")
    {
        alert("NO DEJE CAMPOS VACIOS")
       
    }
    else if(Url=="")
    {
        alert("INSERTE UNA IMAGEN");
        
    }
    else
    {
        const dbref=ref(db);
        get(child(dbref,'productos/'+IdProducto)).then((snapshot)=>{
            if(snapshot.exists())
            {
                alert("YA EXISTE UN PRODUCTO CON EL MISMO ID");
            }
            else{
                insertarDatos();
            }
    
        }).catch((error)=>{
            alert("ERROR"+" "+error);
        });
    }
        
    
    
}


var btnRegistro=document.getElementById('registrar');
var btnBuscar=document.getElementById('buscar');
var btnModificar=document.getElementById('modificar');
var btnLimpiar=document.getElementById('limpiar');
var archivo=document.getElementById('archivo');
var btnBorrar=document.getElementById('borrar');
btnBorrar.addEventListener('click',borrarCarta);
btnLimpiar.addEventListener('click',limpiarInputs);
btnBuscar.addEventListener('click',buscarCartas);
archivo.addEventListener('change',cargarImagen);
btnRegistro.addEventListener('click',existe);
btnModificar.addEventListener('click',modificar);

