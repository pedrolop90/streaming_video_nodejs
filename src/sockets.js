module.exports = (io) => {
  const fs=require('fs'),
   path=require('path'),
   ffmpeg=require("ffmpeg")
   var val=false,
   posLectura=1,
   posEscritura=0,
   valLectura=true;
   posEnvio=0,
   imagenes=[];
   io.on('connection',(socket)=>{
          var process = new ffmpeg(path.join(__dirname,'public','videos','Hunterx001.mp4'));
          process.then(function (video) {
            video.addCommand('-ss', '00:00:00')
              video.addCommand("-s","1366x768");
              //video.addCommand("-c:v","libx264");
              //video.addCommand("-crf","19");
              //video.addCommand("-strict","experimental");
               video.addCommand('-r', '23')
              //video.addCommand('-vframes', '30')
              video.addCommand('-filter_complex', '"scale=4096:3112, pad=4097:3112,setdar=4096:3112"')
            video.save(path.join(__dirname,'public','imagenes',"%d.png"),(err,file)=>{
              if(err){
                console.log(err);
              }
            });
            setInterval(()=>{
                if(valLectura){
                  valLectura=false;
                  var prov=fs.createReadStream(path.join(__dirname,"public","imagenes",posLectura+'.jpg'),{encoding:'base64'});
                  console.log(prov);
                  imagenes[posLectura]=Buffer.alloc(prov.stats.size);
                  posLectura++;
                  prov.on('data', function (data) {
                    if(!valLectura){
                      prov.pipe(imagenes[posEscritura]);
                    }
                  });
                  prov.on("end",()=>{
                    console.log(imagenes.length);
                    posLectura++;
                    posEscritura++;
                    valLectura=true;
                  });
                  prov.on("error",(err)=>{
                  });
                }

              if(!val){
                fs.readdir(path.join(__dirname,'public','imagenes'),(err,files)=>{
                  if(files.lenght>90){
                    val=true;
                  }
                });
              }else{

              }
            },10);
          }, function (err) {
            console.log('Error: ' + err);
          });

  });
}
