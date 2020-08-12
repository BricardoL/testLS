<template>
  <div id="app">
    <div class="container">
      <div class="data-list" v-show="datalist" >
        <div class="data-photo">
          <div class="data-photo-border">
            <div class="img-userdata"><img id="img-edit" @click="editUser" src="../RECURSOS/ICONOS_ILUSTRACIONES/iconoeditar.svg"/>
            </div>
          </div>
        </div>
        <div class="name-user">
          
        </div>
        <div class="lastname-user">

        </div>
      </div>
      <p class="paragraphOne">Usuarios</p>
      <div class="users"  @mouseover="goneObject()" @mouseout="getObject()">
        <img v-show="emptyUser" class="user-photos" src="../RECURSOS/ICONOS_ILUSTRACIONES/ilustracionusuariosvacios.svg" height="78px"
             width="99.69px"/>
        <div class="showUser" v-show="showUser"></div>

      </div>
      <div id="add">
        <div class="border" @click="indexSomething()">
          <img v-show="add" src="../RECURSOS/ICONOS_ILUSTRACIONES/iconoagregarusuario.svg" height="86px" width="86px"/>
        </div>
      </div>
      <div id="form" v-show="form">
        <hr/>
        <div class="container-user">
          <div class="border-user" @dragover="onDragEnter"
          @dragleave="onDragLeave"
          @dragover.prevent
          @drop="onDrop"
          :class="{ dragging: isDragging }">
            
            <img src="../RECURSOS/ICONOS_ILUSTRACIONES/iconoperfil.svg" class="drop-zone__prompt"/>
            
            <input type="file" name="myFile" class="drop-zone__input"/>
          </div>
        </div>
        <div class="form-item">
          <input id="name" v-model="name" placeholder="Nombre:">
          <input id="lastname" v-model="lastname" placeholder="Apellido:">
        </div>
        <div class="save-user" @click="saveUser()">
          <img src="../RECURSOS/ICONOS_ILUSTRACIONES/iconosave.svg"/>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
var userList = [];
var userPhoto = [];
var i =0;
var k=0;
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $


export default {
  data(){
    return{
      datalist: false,
      add: true,
      dragCount: 0,
      emptyUser: true,
      showUser: false,
      isDragging: false,
      carrera: "Hola",
      form: false,
      fileMatch: false,
      name: '',
      lastname: '',
      error: ''
    };
   },
   methods:{
     indexSomething(){
       this.form = true
     },
     goneObject(){
      var elem = document.getElementById("add");
      var pos = 0;
      var opc = 100;
      var id = setInterval(frame, 5);
      var io = setInterval(opacity, 8);
      function frame(){
        if (pos == 150){
          clearInterval(id)
        } else{
          pos++;
          elem.style.left = pos + "px";
        }
      }
      function opacity(){
        if (opc == 0){
          clearInterval(io)
        } else{
          opc--;
          elem.style.opacity = opc + "%"
        }
      }
     },
    getObject(){
       var elem = document.getElementById("add");
       var pos = 150;
       var opc = 0;
       var io = setInterval(opacity, 8)
       var id = setInterval(frame, 1);
       function frame(){
        if (pos == 0){
          clearInterval(id)
        } else{
          pos--;
          elem.style.left = pos + "px";
        }
     }
     function opacity(){
        if (opc == 100){
          clearInterval(io)
        } else{
          opc++;
          elem.style.opacity = opc + "%"
        }
     }
   },
   onDragEnter(e){
     e.preventDefault();
     this.dragCount++;
     this.isDragging = true
     return false
   },

   onDragLeave(e){
     e.preventDefault();
     this.dragCount++;
     if(this.dragCount<=0)
     this.isDragging= false
   },

   onInputChange(e){
     const files = e.target.files[0]
     this.updateThumbnail(files)
   },

   onDrop(e){
     e.preventDefault();
     e.stopPropagation();
     this.isDragging = false;
     const files = e.dataTransfer.files[0];
     this.updateThumbnail(files)
     const reader = new FileReader()
     reader.addEventListener("load", ()=>{
       var array = {
       photo: reader.result
     }
     userPhoto.push(array) // ACA ESTAAAAA
   })
     reader.readAsDataURL(files)
     
   },
   
   updateThumbnail(file) {
  let dropZoneElement = document.querySelector(".border-user")
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
},
   saveUser(){
     this.showUser = true
     this.emptyUser = false   
     var user={};     //var url = photo[0]
     console.log(userPhoto);
     k++
     if(userPhoto.length > 0){
     var user1 = {
       nombre: this.name,
       apellido: this.lastname,
       photo: userPhoto[userPhoto.length-1].photo,   //poner atencion A ESTOOOO
       id: `${userPhoto[userPhoto.length-1].photo.substr(10, 60)}_${k}`
     }
       user=user1
     }else{
       var catching = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNzkiIHZpZXdCb3g9IjAgMCA1MCA3OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIxNy45NTIxIiByPSIxNyIgZmlsbD0iIzY1NkM3RSIvPgo8cmVjdCB5PSIzOC41NzUyIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIHJ4PSIxMCIgZmlsbD0iIzY1NkM3RSIvPgo8L3N2Zz4K"
       var user2 = {
         nombre: this.name,
         apellido: this.lastname,
         photo: catching,
         id: `${catching.substr(10, 60)}_${k}`
       }
       user=user2
     }
     console.log(user);
     
     userList.push(user)
     this.localStorageUsers(userList);
     var photod= JSON.parse(localStorage.getItem("User List"))
     var photoy= photod[photod.length-1].photo
     var hex = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMiIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0MyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjAwMzQgMS4yODQwOUMyMS4zMTExIDEuMTA4MDggMjEuNjg4OSAxLjEwODA4IDIxLjk5NjYgMS4yODQwOUwzMS4yNjUgNi41ODY1Mkw0MC40OTEzIDExLjk2MkM0MC43OTc1IDEyLjE0MDQgNDAuOTg2NCAxMi40Njc2IDQwLjk4NzggMTIuODIyMUw0MS4wMyAyMy41TDQwLjk4NzggMzQuMTc3OUM0MC45ODY0IDM0LjUzMjQgNDAuNzk3NSAzNC44NTk2IDQwLjQ5MTMgMzUuMDM4TDMxLjI2NSA0MC40MTM1TDIxLjk5NjYgNDUuNzE1OUMyMS42ODg5IDQ1Ljg5MTkgMjEuMzExMSA0NS44OTE5IDIxLjAwMzQgNDUuNzE1OUwxMS43MzUgNDAuNDEzNUwyLjUwODc1IDM1LjAzOEMyLjIwMjQ5IDM0Ljg1OTYgMi4wMTM1NyAzNC41MzI0IDIuMDEyMTcgMzQuMTc3OUwxLjk3IDIzLjVMMi4wMTIxNyAxMi44MjIxQzIuMDEzNTcgMTIuNDY3NiAyLjIwMjQ5IDEyLjE0MDQgMi41MDg3NSAxMS45NjJMMTEuNzM1IDYuNTg2NTJMMjEuMDAzNCAxLjI4NDA5WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzg4N0NEMiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo="
     var createImage = document.querySelector(".showUser").appendChild(document.createElement("div"));
     createImage.setAttribute("style", `background-image: url(${hex})`);
     createImage.setAttribute("id", photoy.substr(13, 46));
     var hex1 = createImage.appendChild(document.createElement("div"));
     hex1.setAttribute("class", "hexagon")
     var hex2= hex1.appendChild(document.createElement("div"));
     hex2.setAttribute("class", "hexagon-in")
     var imgAC = hex2.appendChild(document.createElement("div"));
     imgAC.setAttribute("style", `background-image: url(${photoy})`);
     imgAC.setAttribute("contenteditable", photoy)
     i++
     imgAC.setAttribute("id", `${photoy.substr(10, 60)}_${i}`);
     imgAC.setAttribute("class", "hexagon-image")
     
     this.form= false;
     //var event = document.getElementById(photor)
     //imgAC.addEventListener("click", this.obtengoID(this))
     $('.showUser').click((e)=>{
       var id = e.target.id;
       //var doc = document.getElementById(id)
       //var photoData = doc.getAttribute('contenteditable')
       //console.log(photoData)
       this.userData(id)
     });
     this.deleteForm()
   },

   deleteForm(){
     this.name="";
     this.lastname = "";
     var link = userPhoto.splice(0, userPhoto.length-1)
     userPhoto=link 
     console.log(userPhoto);
     /*let queryone = document.querySelector(".border-user");
     var kha = queryone.querySelector(".drop-zone__thumb")
     
     //var w = document.createElement("img")}
     /*w.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNzkiIHZpZXdCb3g9IjAgMCA1MCA3OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIxNy45NTIxIiByPSIxNyIgZmlsbD0iIzY1NkM3RSIvPgo8cmVjdCB5PSIzOC41NzUyIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIHJ4PSIxMCIgZmlsbD0iIzY1NkM3RSIvPgo8L3N2Zz4K")
     w.classList.add("drop-zone__prompt");
     
     queryone.appendChild(w)}
  */
   },
   
   localStorageUsers(list){
     localStorage.setItem("User List", JSON.stringify(list))
   },
   obtengoID(b){
     console.log(b.id)
   },
   editUser(){
     //console.log(userList)
     var docData= $('.img-userdata').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
       console.log(docData)
       var storage= JSON.parse(localStorage.getItem("User List"));
       var wanted = storage.filter((item)=>{return item.photo === docData})
       
       //var deletenot = storage.filter((item)=>{return item.photo != docData})
       var deletenotph = userPhoto.filter((item)=>{return item.photo != docData})
       
       userPhoto = deletenotph
       console.log(docData.substr(13,46))
       this.form = true;
       this.name = wanted[wanted.length-1].nombre
       this.lastname = wanted[wanted.length-1].apellido
       var elementPic = document.querySelector(".drop-zone__thumb");
       elementPic.setAttribute("style", `background-image: url(${wanted[wanted.length-1].photo})`);
       var picEdit={
         photo: wanted[wanted.length-1].photo
       }
       userPhoto.push(picEdit)
       
      
      var elem= document.getElementById(docData.substr(13,46));
      var children = elem.lastElementChild;
      while(children){
        elem.removeChild(children);
        children = elem.lastElementChild
      }
      elem.parentNode.removeChild(elem)
      
      

     
   },
   userData(pic){
     
     var photod= JSON.parse(localStorage.getItem("User List"));
     

     //var photoy= photod[photod.length-1].photo
     //var photor = photoy.substr(40, 30);
     
       var wanted = photod.filter((item)=>{return item.id === pic})
       console.log(wanted);
       this.datalist=true

       var elementPic = document.querySelector(".img-userdata");
       elementPic.setAttribute("style", `background-image: url(${wanted[wanted.length-1].photo})`);
       var elementName = document.querySelector(".name-user");
       elementName.innerHTML = `<p><b>Nombre:</b> ${wanted[wanted.length-1].nombre} </p>`;
       var elementLastname = document.querySelector(".lastname-user");
       elementLastname.innerHTML=`<p><b>Apellido:</b> ${wanted[wanted.length-1].apellido} </p>`
       
     
   
  }}

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

#app{
  background: white;
  text-align: center;
}

.container {
  margin: 30px auto;
  width: 720px;
  height: 720px;
  position: relative;
  background: rgb(185, 180, 187);
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: 40% 2% 18% 40%;
}

.container .data-list{
   grid-row: 1/2;
   grid-column: 1/3;
   display: grid;
   grid-template-rows: 60% 20% 20%;
   align-items: center;
}

.container .data-list .data-photo{
    grid-row: 1/2;
    background: white;
    border-radius: 10px;
    width: 191px;
    height: 167px;
    margin: 7px auto 2px;
}

.container .data-list .data-photo .data-photo-border{
  height: 149px;
  width: 172px;
  border: 2px dashed;
  color: gray;
  background-color: cc3366;
  font-family: verdana, arial;
  font-size: 30pt;
  margin: 7px auto;
  border-radius: 10px;
}

.container .data-list .data-photo .data-photo-border .img-userdata{
  display:flex;
  width: 100%;
  height: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  justify-content: flex-end;
  align-items: flex-start;
}

.container .data-list .name-user{
  grid-row: 2/3;
  margin:auto auto 0px;
}

.container .data-list .name-user p{
  margin: auto auto 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; ;
  font-size: 20px;
}

.container .data-list .lastname-user p{
  margin: 0px auto auto;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; ;
  font-size: 20px;
}
.container .data-list .lastname-user{
  grid-row: 3/4;
  margin: 10px auto auto 
}

.container .paragraphOne{
  margin-bottom: 30px;
  grid-row: 2/3;
  grid-column: 1/3;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; ;
  font-size: 18px;
  font-weight: bold;
}

.container .users{
  background: #F1F4F7;
  margin: auto 10px auto auto;
  height: 86px;
  width: 431px;
  border-radius: 10px;
  text-align: center;
  grid-row: 3/4;
  grid-column: 1/2;
}

.container #add{
  height: 86px;
  width: 86px;
  background: #F1F4F7;
  position: absolute;
  border-radius: 10px;
  margin: 22px 10px;
  grid-row: 3/4;
  grid-column: 2/3;
}

.container #add .border{
  height: 76px;
  width: 76px;
  border-radius: 10px;
  border-style: dotted;
  border-width: 1px;
  border-color: 660033;
  background-color: cc3366;
  font-family: verdana, arial;
  font-size: 30pt;
  margin: 4px auto;
}

.container #add .border img{
  height: 55px;
  width: 55px;
  margin: 9px auto;
  display: inline;
}

.container #form{
  grid-row: 4/5;
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  justify-content: center;
  text-align: center;
}

.container #form .container-user{
  height: 102px;
  width: 120px;
  display: flex;
  align-items: center;
  background: white;
  grid-column: 1/2;
  margin: auto 4px auto auto;
  border-radius: 10px;
}

.container #form .container-user .border-user{
  height: 90px;
  width: 108px;
  border: 2px dashed;
  color: gray;
  background-color: cc3366;
  font-family: verdana, arial;
  font-size: 30pt;
  margin: 4px auto;
  border-radius: 10px;
}

.showUser{
  background: #F1F4F7;
  min-height: 86px;
  margin-right: 5px;
  width: 445px;
  display: flex;
  flex-flow: wrap;
  border-radius:10px;
}

.showUser div{
  width: 42px;
  height: 47px;
  align-items: center
}

.showUser > div{
  margin: 1px;
  background-repeat: no-repeat;
}

.showUser div img{
  width: 60%;
  height: 60%;
  margin: 0 2px auto;
  overflow:hidden;
  background-size: cover;
  background-position: center;
  position: relative;
}
.container #form .container-user .border-user img{
  height: 77.62px;
  width: 50px;
  margin: 4px auto
}

.container #form .form-item{
  grid-column: 2/3;
  margin: auto auto auto 0px;
  min-width: 300px;
}

.drop-zone__input{
  display: none
}

.drop-zone__over{
  border-style: solid;
}

.container #form .form-item input{
  margin: 15px  auto 15px 10px;
  min-width: 300px;
  min-height: 40px;
  font-size: 14pt;
  color: solid black;
  border: 1px solid black;
  border-radius: 5px;
  text-indent: 5px;
}

.container #form .save-user{
  background: white;
  height: 86px;
  width: 86px;
  border-radius: 10px;
  grid-column: 3/4;
  margin: auto auto auto 65px
}

.container #form .save-user img{
  height: 78px;
  width: 78px;
  margin: 2px auto;
}

.container #form hr{
  max-height: 0.75px;
  min-width: 554px;
  background: #D3ECFF;
  grid-column: 1/-1;
  margin: auto
}

.drop-zone__thumb{
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow:hidden;
  background-size: cover;
  position: relative
}

.drop-zone__thumb::after{
  content: attr(data-label);
  font-size: 8pt;
  background: rgba(0,0,0,0.75);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 3px 0;
  text-align: center;
}

.hexagon{
  background-position: center;
  overflow: hidden;
  visibility: hidden;
  -moz-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  -o-transform: rotate(120deg);
  -webkit-transform: rotate(120deg);
}

.hexagon-in{
  width: 100%;
  height: 100%;
  background-position: center;
  transform: rotate(-60deg);
  overflow: hidden;
  -moz-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  -o-transform: rotate(120deg);
  -webkit-transform: rotate(120deg);
}

.hexagon-image{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(-60deg);
  visibility: visible;
  -moz-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  -o-transform: rotate(120deg);
  -webkit-transform: rotate(120deg);
}

</style>
