/*
window.addEventListener("load",()=>{
  var socket=io('ws://localhost:3000'),
   video=document.getElementById("videoPlayer"),
      videoBuffer,valorBuffer
      var i=0;
      var final=1
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(function(stream) {
       video.src = (window.URL || window.webkitURL).createObjectURL(stream);
       console.log(stream);
      }).catch(function(err){console.log(err);});
  socket.on('connect', function () {
    socket.on("datos_video",(data)=>{
      videoBuffer=new ArrayBuffer(data.size);
      valorBuffer=new Uint8Array(videoBuffer);
    });
    socket.on("datos",(data)=>{

      if(i<final){
        i++
        valorBuffer.set(Array.prototype.slice.call(data, 0));
      }
      if(i==final){
        i++;
        console.log(valorBuffer);
        var v = new Blob([valorBuffer], { type: "video/mp4" });
         video.src = (window.URL || window.webkitURL).createObjectURL(v);
      }

    });
    socket.on("termino",(data)=>{

     var v = new Blob([data], { type: "video/webm" });
     video.setAttribute( "src", (window.URL || window.webkitURL).createObjectURL(v));

    });
  });

});
*/
window.addEventListener("load",()=>{
  var socket=io('ws://localhost:3000');

});
