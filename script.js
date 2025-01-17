/*--------------------------------------------------------------------
GGR472 LAB 4: Incorporating GIS Analysis into web maps using Turf.js 
--------------------------------------------------------------------*/

/*--------------------------------------------------------------------
Step 1: INITIALIZE MAP
--------------------------------------------------------------------*/
// Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhcmxvdHRlYmtnIiwiYSI6ImNscjlvYzM1OTA1MW8ya24xbjdmNHRhaWkifQ.H2WW8WJZiHWFksxymyigTw'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initialize map and edit to your preference
const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mapbox/streets-v12',  // ****ADD MAP STYLE HERE *****
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12 // starting zoom level
});



/*--------------------------------------------------------------------
Step 2: VIEW GEOJSON POINT DATA ON MAP
--------------------------------------------------------------------*/
//HINT: Create an empty variable
//      Use the fetch method to access the GeoJSON from your online repository
//      Convert the response to JSON format and then store the response in your new variable
let collisgeojson;
fetch('https://raw.githubusercontent.com/charlbkg/ggr472-lab4/main/data/pedcyc_collision_06-21.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        collisgeojson = response; // Store geojson as variable using URL from fetch response
    });



/*--------------------------------------------------------------------
    Step 3: CREATE BOUNDING BOX AND HEXGRID
--------------------------------------------------------------------*/
//HINT: All code to create and view the hexgrid will go inside a map load event handler
//      First create a bounding box around the collision point data then store as a feature collection variable
//      Access and store the bounding box coordinates as an array variable
//      Use bounding box coordinates as argument in the turf hexgrid function
map.on('load'), () => {
 //   let bboxcoords = turf.bbox(collisgeojson)
 //   let hexgeojson = turf.hexGrid(bboxcoords, 0.5, { units: 'kilometers' })
    map.addsource('collisgeojson', {
        type: 'geojson',
        data: collisgeojson
    });
    map.addlayer({
        'id': 'collis',
        'type': 'circle',
        'source': 'collisgeojson',
        'paint': {
            'circle-radius': 5,
            'circle-color': 'blue'
        }
    })
   // map.addsource('hexgeojson', {
   //     type: 'geojson',
   //     data: hexgeojson
  //  });
   // map.addlayer({
   //     'id': 'collishex',
   //     'type': 'fill',
   //     'source': 'hexgeojson',
  //      'paint': {
  //          "fill-color": "#00ffff"
  //      }
 //   })
};
/*--------------------------------------------------------------------
Step 4: AGGREGATE COLLISIONS BY HEXGRID
--------------------------------------------------------------------*/
//HINT: Use Turf collect function to collect all '_id' properties from the collision points data for each heaxagon
//      View the collect output in the console. Where there are no intersecting points in polygons, arrays will be empty



// /*--------------------------------------------------------------------
// Step 5: FINALIZE YOUR WEB MAP
// --------------------------------------------------------------------*/
//HINT: Think about the display of your data and usability of your web map.
//      Update the addlayer paint properties for your hexgrid using:
//        - an expression
//        - The COUNT attribute
//        - The maximum number of collisions found in a hexagon
//      Add a legend and additional functionality including pop-up windows


