var previsão1=""
var previsão2=""
Webcam.set({
    width:350,
    height:300,image_format:"png",png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera")
function tirarfoto(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML ='<img id="captured_image" src="'+data_uri+'"/>';
    
    });
}
console.log("ml5versao",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TfeVX69Af/model.json",modelLoad)
function  modelLoad() {
    console.log('Model_Loaded!');
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1= "A primeira previsão e"+ prediction_1;
    speak_data_2= "A segunda previsão e" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function checar() {
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results) {
 if (error) {
    console.error(error);
 }
 else{
    console.log(results);
    document.getElementById("nome").innerHTML=results[0].label;
    document.getElementById("nome2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label=="Feliz")
    {
        document.getElementById("emoji").innerHTML ="&#128522"
    }
    if(results[0].label=="Triste")
    {
        document.getElementById("emoji").innerHTML ="&#128532"
    }
    if(results[0].label=="Irritado")
    {
        document.getElementById("emoji").innerHTML ="&#128548"
    }
    if(results[1].label=="Feliz")
    {
        document.getElementById("emoji2").innerHTML ="&#128522"
    }
    if(results[1].label=="Triste")
    {
        document.getElementById("emoji2").innerHTML ="&#128532"
    }
    if(results[1].label=="Irritado")
    {
        document.getElementById("emoji2").innerHTML ="&#128548"
    }
 }
}