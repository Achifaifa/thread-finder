use_storage=1

function load_local(){
  try{results=JSON.parse(localStorage.results)}
  catch{results=[{"hex":"FABADA","rgb":"(5,5,5)","gut":1,"dmc":1,"anc":1}]}
}

function save_local(){
  if(use_storage){localStorage.results=JSON.stringify(results)}
}

vistypes=["none","block"]
vis={"howto":true,"local":true}
function show(panel){
  vis[panel]=!vis[panel]
  document.getElementById(panel).style.display=vistypes[+vis[panel]]
  //the + operator forces true/false into a number. Cursed shit.
}

function clear_results(){
  results=[]
  update_results()
}

function disable_storage(){
  use_storage=0
  localStorage.clear()
}

//Search the closest color to col available in the type database
//col is RGB, db can be 'gut', 'dmc' or 'anc'
function search(col,db){
  console.log("Searching: ",col)
  //closest [closest colour, total distance]
  closest=["",9999]
  db.forEach(function(i){
    d=distance(col,hex_to_rgb(i.hex))
    if(d<closest[1]){
      closest=[i,d]
    }
  })
  console.log(JSON.stringify(closest))
  return closest[0]
}

//Displays table with results at the bottom
function update_results(){
  //print header
  h="<table style='text-align:center;'><tr><th>Hexadecimal</th><th>RGB</th><th>Güttermann</th><th>DMC</th><th>Anchor</th></tr>"
  //print data
  Array.from(results).reverse().forEach(i=>h+="<tr><td style='background-color:"+i.hex+"'>"+i.hex+"</td><td>"+i.rgb+"</td><td>"+i.gut+"</td><td>"+i.dmc+"</td><td>"+i.anc+"</td><td>")
  h+="</table>"
  document.getElementById("results").innerHTML=h 
}

function hex_to_rgb(hex){
  temp=parseInt(hex,16) //convert hex to integer
  r=temp>>16 // Displace right 2 bytes, only left byte remains
  g=(temp>>8)&255 // Displace right 1 byte, logic AND with 255 (11111111) to take only the rightmost bit
  b=temp&255 // Same and operation to take the bit on the right
  return([r,g,b])
}

function rgb_to_hex(r,g,b){
  //Reverse operation as in hex_to_rgb. 
  //1<<24 adds 1 bit at the left of the red channel. 
  //This is trimmed later with slice so the output always has 8 characters
  return((1<<24|r<<16|g<<8|b).toString(16).slice(1))
}

//Euclidean distance between RGB colours
//Doesn't represent closeness of colours as perceived by humans
//TO-DO find a more accurate colour distance calculation
function distance(ca,cb){
  return(Math.abs(Math.sqrt((cb[0]-ca[0])**2+(cb[1]-ca[1])**2+(cb[2]-ca[2])**2)))
}

function convert(){
  c=document.getElementById("colour").value.replace("#","")
  t=document.getElementById("ctype").value
  res={"hex":"","rgb":"","gut":"","dmc":"","anc":""}
  ok=0
  //Filter empty string
  if(c==""){console.log("Colour empty")}

  //from hex
  else if(t=="hex"){
    console.log("converting hex:",c)
    //validate that it's a hex number
    if(typeof c=='string' && c.length==6 && !isNaN(Number("0x"+c))){
      res.hex=c
      res.rgb=hex_to_rgb(c)
      res.gut="---"
      rdmc=search(res.rgb,data_dmc)
      res.dmc=rdmc.number+"<br/>"+rdmc.name
      res.anc="---"
      ok=1
    }
    else{
      console.log("Invalid hex number")
    }
  }
  //from rgb
  else if(t=="rgb"){
    console.log("converting rgb")
    //validate string
    try{c=JSON.parse("["+c+"]")}
    catch{
      console.log("Invalid RGB data")
      return null
    }
    if(Array.isArray(c) && c.length==3){
      res.hex=rgb_to_hex(...c).toUpperCase()
      res.rgb=c 
      res.gut="---"
      rdmc=search(c,data_dmc)
      res.dmc=rdmc.number+"<br/>"+rdmc.name
      res.anc="---"
      ok=1
    }
    else{
      console.log("Invalid RGB data")
    }
  }
  //from guttermann
  else if(t=="gut"){
    console.log("converting guttermann")
  }
  //from dmc
  else if(t=="dmc"){
    console.log("converting dmc")
  }
  //from anchor
  else if(t=="anc"){
    console.log("converting anchor")
  }

  if(ok){
    results.push(res)
    save_local()
    update_results()
  }
}


window.onload=function(){

load_local()
show("howto")
show("local")
update_results()
document.getElementById("conv").onclick=convert

};//End of onload

