/*https://teachablemachine.withgoogle.com/models/fxjKN-TVc/*/


Webcam.set({
    width:300,
    height:250,
    img_format:'png',
    png_quality:90
});
camera= document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'>"
    });
}
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fxjKN-TVc/model.json',modelLoaded);

function modelLoaded(){
    console.log("model Loaded!");
}
function speak(){
    var synth = window.speechSynthesis;
    speech_1 = "Prediction 1 is -"+Prediction_1;
    speech_2 = "Prediction 2 is -"+Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speech_1 + speech_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}
function gotResult(error,result){
    if (error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name1").innerHTML = results[1].label;
    Prediction_1=results[0].label;
    Prediction_2=results[1].label;
    speak();
    if (results[0].label=="happy"){
        document.getElementById("update_emoji").innerHTML = "&#128512;";
    }
    if (results[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if (results[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML = "&#128545;";
    }
    if (results[1].label=="happy"){
        document.getElementById("update_emoji1").innerHTML = "&#128512;";
    }
    if (results[1].label=="sad"){
        document.getElementById("update_emoji1").innerHTML = "&#128532;";
    }
    if (results[1].label=="angry"){
        document.getElementById("update_emoji1").innerHTML = "&#128545;";
    }
}


