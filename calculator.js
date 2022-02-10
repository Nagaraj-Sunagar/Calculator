const express=require("express");
const fs=require("fs");
/*The body-parser is the node packager which has the methods named urlencoded which will give 
input data that are inserted in the input boxes in the html*/
const bodyParser=require("body-parser");

const app=express();

//hear is the intializing the body-parser to get inputed values
app.use(bodyParser.urlencoded({extended:true}));

/* get method is the one which take two inputs that are route value at first and that also respond to 
 perticualar function to send the particular html file that is the way in which static website is linking 
 to the server(that is backend of for the functionality)*/
app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/BMICalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
})


/*Post is the method that respond to the action when in the form the submit button is pressed the 
one must thing is the form must include the post method to happen so 
it make the respective changes(that is make a calculations and send back it 
to requested static website)so that user(client) end can only see the result not 
all the calculations that are happing with calculations*/
app.post("/",function(req,res){
    var n1=Number(req.body.num1);
    var n2=Number(req.body.num2);
    var result=n1+n2;
    res.send("The result is:"+result);
})
app.post("/BMICalculator",function(req,res){
    var weight=Number(req.body.weight);
    var height=Number(req.body.height);
    var bmi=Math.round(weight/(height*height));
    var conclution;
    if(bmi<30){
        conclution="You are normal weighted";
    }
    else if(30<=bmi<60){
        conclution="You are over weighted";
    }
    if(60<=bmi){
        conclution="You are obasasited";
    }
    res.send("Your BMI value is:"+bmi+"\t"+conclution);
    fs.appendFileSync('Data.txt', "The result is:"+bmi+conclution+"\n", 'utf8');

})

app.listen(3000,function(){
    console.log("Port 3000 is listening");
})