let light;
let firstSetView=true
let bool=true
let latSpan=document.getElementById("latitude")
let longSpan=document.getElementById("Longitude");
const pause=document.querySelector(".pause")
let number;
let interval;

//setting the icon of Iss
const issIcon = L.icon({
    iconUrl: 'iss.png',
   //  shadowUrl: 'leaf-shadow.png',

    iconSize:     [46, 35], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const mymap = L.map('mapid').setView([0,0],1);
let marker = L.marker([0,0],{icon: issIcon}).addTo(mymap);



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
   




 async function getData(){
   const response=await fetch("https://api.wheretheiss.at/v1/satellites/25544");
   const data = await response.json();
   // console.log(data);
        let latitude=data.latitude
        let longitude=data.longitude
      //   console.log(latitude,longitude);
   latSpan.textContent=latitude.toFixed(2);
   longSpan.textContent=longitude.toFixed(2);
   
   //setting the initail view of the icon
   
   if(firstSetView){
      firstSetView=false
      mymap.setView([latitude,longitude],5);
      
   }
   
   marker.setLatLng([latitude,longitude],{icon: issIcon}); 
   marker.addEventListener("click",()=>{
      marker.bindPopup("<h3>ISS is here</h3>").openPopup();
   })   
   number=1
}


//calling the setinterval function 
window.addEventListener("load",getData)
window.addEventListener("load",()=>{
   
    interval=setInterval(getData,1000)   
   
   

})


pause.addEventListener("click",()=>{
    number*=-1
    console.log(number);
 


})

if(number===-1){
    console.log("stop");
    clearInterval(interval)
}else{
    setInterval(getData,1000)
}

