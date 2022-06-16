// Search page JS created : Luke Sciberras 5/09/2020 10:18PM */
// Added JS function to reset form : Achmad Mustafa Kemal 5/09/2020 10:48 AM //
// Added function tableFromJSON : Luke Sciberras & Achmad Mustafa Kemal 11/09/2020 6:00 PM.//
// Debugging for loop and getting table to populate : Luke Sciberras, Paddy Cassidy, Caron Kanerack & Achmad Mustafa Kemal 13/09/2020 11:00 AM //


//declare variables:
var reset = document.getElementById("newForm");
var sList = [];
console.log("Setting up onload of contextidx to run displayImages")


/* Function that populates the data from the pipeline into a dynamic table using data from pipeline.js/2nd API call: */
function tableFromJSON(data) {
  var container = document.getElementById('contentidx');
  var tableres = "";
  var result = document.getElementById('test1');

  //iterate through each element of the data passed from pipeline.js
  for (var i = 0; i < data.length; i++) {
  
    let imageElement = document.createElement('table');
    imageElement.src = data[i].uploadedDate;
    imageElement.id = data[i].imageID;
	// I added the checkbox id with record number to make the checkbox id unique. Ranel 202009142124
	vcheckboxidn = "chkbox" + i;
    //imageElement.train = data[i].pasttraining  -- update needed with correct format from Kate's DB call

    // Table Template
    tableres += ` 
          <table>
            <tr>
              <td align="center"><input type="checkbox" id="${vcheckboxidn}" name="${vcheckboxidn}" value=${imageElement.id}></td>
              <td align="center">${imageElement.id}</td>
              <td align="center">${imageElement.src}</td>
            </tr>
            </table>`
                
    //Show the result in HTML Page
    result.innerHTML= tableres;
    let slog = "Setup of checkbox for " + imageElement.id;
    console.log(slog);
  

    //if user clicks on the image, add the ID to the array.
    //imageElement.id.onclick = (e) => {
    //  addToArr(imageElement.id);
    //  console.log(sList);
    //};

    // append the image element to the container.
    container.appendChild(imageElement);

  }
	var indoco = document.getElementById('psearchbox');
	var allin = indoco.getElementsByTagName('input');
	for (var i=0, len=allin.length; i<len; i++) {
    	if ( allin[i].type === 'checkbox' ) {
    		let axlog = "checkbox onclick event for " + allin[i].value;
        	allin[i].onclick = function() {
            	// This will pick up the data from the checkbox
      			addToArr(this.id);
      			console.log(this.id);
        	}
    	}
	}	

}


//function to reset form:
function resetfunction() {
  document.getElementById("newForm").reset();
  document.getElementById("td").innerHTML = '';
}
  
//function to add image ID's to array: 
function addToArr(item) {

    //add item to the array:
    let elitem = document.getElementById(item);
    sList.push(elitem.value); 

    //submit array of images to the third API call via the newTrain function in JS:
    console.log("Images selected by user are: " + JSON.stringify(sList));
    // document.getElementById(item).onclick = function() {newTrain(JSON.stringify(sList))};
  }
  
  function manualTrain(sList) {
  	let xsList = " Manually submitted these imageIDs " + sList;
  	console.log(xsList);
  	newTrain(sList);
  }