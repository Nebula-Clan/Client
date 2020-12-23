export const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          const play = () => audio.play();
          resolve({ audio, audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });
    

    resolve({ start, stop });
  });

export const duration =  (audioUrl) => {
    return new Promise( (resolve,reject)=>{
        const media = new Audio(audioUrl);
        media.onloadedmetadata = function(){
        media.currentTime = Number.MAX_SAFE_INTEGER;
        media.ontimeupdate = function(){
          media.ontimeupdate = function(){};
          media.currentTime = 0.1;
          media.currentTime = 0;
          resolve(media.duration);
        }
      }
    });
  }


  
        // this.recorder = recordAudio()
        // this.recorder.then((recorder) => {
        //     recorder.start()
        //     setTimeout(() => this.stop(), 3000)  
        // })

        // this.recorder.then((record) => {
        //     record.stop().then(({ audio, audioBlob, audioUrl, play }) => {
        //         play()
        //         this.audioUrl = audioUrl
        //         duration(this.audioUrl).then((duration) => {
        //             console.log(duration)
        //         })
        //     })
        // })