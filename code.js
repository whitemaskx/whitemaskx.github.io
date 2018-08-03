//var username = document.getElementById('username').value;

var kairos = new Kairos("5416ce33", "a2e746be731310600ae1c34f27e7d6c9");

function takePics(){
    var user = $('#username').val();
    Webcam.snap( function(data_uri) {
        var substr = data_uri.split("base64,");
        var data = substr[1];
        //console.log(data)
        document.getElementById('results').innerHTML = '<img src="'+data_uri+'"/>';
        sendPic(data,user);
    } );
}

function sendPic(dataURL,usr){
    console.log(usr)
    kairos.enroll(dataURL,'MIBTest',usr,confirmation);
}

function confirmation(response){
  console.log("Pic sent");
}

function login_attempt(){
  console.log("Login attempt");
  validation_attempt();
}

function validation_attempt(){
  Webcam.snap(function(data_uri){
    var substr = data_uri.split("base64,");
    var data = substr[1];
    validation_sent(data)
  })
}

function validation_sent(dataURL){
  kairos.recognize(dataURL, 'MIBTest', validation_msg);
}

function validation_msg(data){
  //console.log(data.responseText);
  ledata = data.responseText;
  var res = JSON.parse(ledata);
  var transaction = res.images[0].transaction;
  var status = transaction["status"];
  var confidence = transaction["confidence"];
  var subject = transaction["subject_id"];
  //console.log(res);
  //console.log(transaction);
  //console.log(status);
  console.log(confidence);
  //console.log(subject);
  confidence = confidence*100

  if(status == 'success' && confidence >= '80'){
            console.log("Entro al if");
            var newtext = "Bienvenido "+subject+"!!"
          $("#voice").text(newtext);
  }else{
    console.log("Entro al else");
    console.log(status=='success');
    console.log(confidence>=80);
    $("#voice").text("Tu oficialmente no existes... en nuestra BD, registrate");
  }
}
