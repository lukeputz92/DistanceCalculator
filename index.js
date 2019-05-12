let data = [{
	"city":"Seattle",
	"lat":"47.6211",
	"lng":"-122.3244"
},
{
	"city":"New York",
	"lat":"40.6943",
	"lng":"-73.9249"
},
{
	"city":"San Francisco",
	"lat":"37.7562",
	"lng":"-122.4430"
},
{
	"city":"Dallas",
	"lat":"32.7937",
	"lng":"-96.7662"
},
{
	"city":"Orlando",
	"lat":"28.4788",
	"lng":"-81.3420"
},
{
	"city":"Salt Lake City",
	"lat":"40.7774",
	"lng":"-111.9301"
},
{
	"city":"Denver",
	"lat":"39.7621",
	"lng":"-104.8759"
}];

let colHeadings = Object.keys(data[0]);
let numCols = 4;
let numRows = data.length;
window.addEventListener('load', () => {
  let table = document.getElementById("distance-table");
  let header = document.getElementById("distance-table-header");
  let row = header.insertRow();
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i = 0; i < numRows; i++) {
    row = tbody.insertRow();
    for (let j = 0; j < numCols; j++) {
      let cell = row.insertCell();
      let obj = data[i];
      if (j === 3) {
        let dist = distance(44.5646, -123.262, parseFloat(obj.lat), parseFloat(obj.lng), 'M').toFixed(2);
        cell.innerText = dist;
        row.distance = dist;
      }
      else {
        cell.innerText = obj[colHeadings[j]];
      }
    }
  }

  let asc = false;
  document.getElementById('distance-header').addEventListener("click", (() => {
    asc = ! asc;
    let sorted = asc ? Array.from(tbody.children).sort(compare) : Array.from(tbody.children).sort(compare).reverse();
    sorted.forEach(tr => tbody.appendChild(tr));
  }))

  const compare = (a, b) => {
    return a.distance - b.distance;  
  }
  
  function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }
});