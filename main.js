Webcam.set({
    width:300,
    height:300,
    image_format:'png',
    png_quality:95
});

camera=document.getElementById("camera");

Webcam.attach("#camera")

function Take_snapshot(){
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="selfie.img">';
    });
}

console.log(ml5.version);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/D-xkQE2UC/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model is loaded"); 
}

function check(){
    img=document.getElementById("selfie.img");
    classifier.classify(img , gotResult);
}

function gotResult(error,result){
    if (error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("result_object").innerHTML=result[0].label;
        toSpeak="";
        gesture=result[0].label;
        if (gesture=="Thumbs up"){
            toSpeak="That's an awesome Thumbs up! ";
            document.getElementById("result_icon").innerHTML="&#128077;";
        }

        else if (gesture=="Cool"){
            toSpeak="That's a cool cool ! ";
            document.getElementById("result_icon").innerHTML="&#128076;";
        }

        else if (gesture=="Peace out"){
            toSpeak="That's a pacific peace out ! ";
            document.getElementById("result_icon").innerHTML="&#9996;";
        }
        speak();

    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}