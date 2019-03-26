module.exports = (io) => {
  const fs=require('fs'),
   path=require('path'),
   ffmpeg=require("ffmpeg");
   io.on('connection',(socket)=>{
     /*
    const ph = path.join(__dirname,'public','videos','Hunterx001.mp4'),
    stat = fs.statSync(ph),tamaño_video=64536
     bufferVideo = Buffer.alloc(tamaño_video);
     socket.emit("datos_video",stat);
       var start=0;
       var end=parseInt(tamaño_video,10);
       const video = fs.createReadStream(ph,{encoding:'base64',start:start,end:end});
        video.on('data', function (chunk) {
        //socket.emit("datos",chunk);
        bufferVideo.write(chunk);
        socket.emit("datos",Buffer.from(chunk));
        });
        video.on('end',function(){
          //socket.emit("termino",new Uint16Array(bufferVideo));
        });
        */
        	new ffmpeg(path.join(__dirname,'public','videos','Hunterx001.mp4'), function (err, video) {
        		if (!err) {
        			console.log('The video is ready to be processed');
              console.log(path.join(__dirname,'public','imagenes'));
              video.fnExtractFrameToJPG (path.join(__dirname,'public','imagenes'),{
                frame_rate : 1,
			          number : 5,
			         file_name : 'my_frame_%t_%s'},function (error, files) {
            			if (error)
                  console.log(error);
            				console.log('Frames: ' + files);
            		});
        		} else {
        			console.log('Error: ' + err);
        		}
        	});



  });
}
