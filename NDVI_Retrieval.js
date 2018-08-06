//NDVI retrieval script
//Written by Keelin Haynes and Jessica McCarty, Dept. of Geography, Miami University, Oxford, Ohio
//August 6, 2018



//IMPORTANT NOTE!!!!
// Our script selects out the first available image of the filtered data. 
//Therefore if the date range is "2015-010-01", "2016-12-31", the first available 
//image would be of the nearest 8-day composite date to 2015-01-01 when MODIS Terra was overhead
//Due to the nature of our script, this means that you will be required to manually change the
//date range for the filtering process.
//We have provided the 8-day composite dates for when MOD13Q1 passed over the study area and the dates are below

//Each date gets entered in as: "Year-Month-Day"
//Available 8-day composite dates:
// 2015_01_01
// 2015_01_17
// 2015_02_02
// 2015_02_18
// 2015_03_06
// 2015_03_22
// 2015_04_07
// 2015_04_23
// 2015_05_09
// 2015_05_25
// 2015_06_10
// 2015_06_26
// 2015_07_12
// 2015_07_28
// 2015_08_13
// 2015_08_29
// 2015_09_14
// 2015_09_30
// 2015_10_16
// 2015_11_01
// 2015_11_17
// 2015_12_03
// 2015_12_19
// 2016_01_01
// 2016_01_17
// 2016_02_02
// 2016_02_18
// 2016_03_05
// 2016_03_21
// 2016_04_06
// 2016_04_22
// 2016_05_08
// 2016_05_24
// 2016_06_09
// 2016_06_25
// 2016_07_11
// 2016_07_27
// 2016_08_12
// 2016_08_28
// 2016_09_13
// 2016_09_29
// 2016_10_15
// 2016_10_31
// 2016_11_16
// 2016_12_02
// 2016_12_18

//Simply take the first date in the filterDate function below and replace it with the 8-day composite date you are targeting

//For 2015-2016, we entered all 46 8-day composite dates to get all 46 NDVI images

//Additionally, this method requires you to go down to the export function and change the name (description) of
//each file before you export it. Name should be composite date. 
//For example: If the date you are looking at is 2015-04-23, then we named the file "20150423"


//These lines set up the spatial boundary for our script
var geometry = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-115.11474609375, 31.34738215038585],
          [-108.544921875, 31.25350896172739],
          [-108.369140625, 37.29444894413377],
          [-115.81787109375, 37.22449663653272]]]);

//The next few lines select the image collection we are accessing (MODIS- Terra) and filters 
// the collection by date and the geometric bounds that we set. It then selects out the
// first band from each image (NDVI)
//Here is where you select your date range as described above
var collection = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterDate('2015-01-01', '2016-12-31')
  .filterBounds(geometry)
  .select(0);
  

//These lines create a variable called "NDVI" that is the result of sorting the above filtered
// image collection and selecting the first (by date) image available
//Select out the NDVI bands out of each image
var NDVI = ee.Image(
  collection.first()
    .select(0)
  );


//These lines print out the filtered image collection for exploration as well as visualize the layer on the map below
var vizParams = {
  min: 0,
  max: 0.5};
Map.addLayer(collection, vizParams, "collection");
print ('collection', collection);
Map.addLayer(NDVI, vizParams, "NDVI");
print('NDVI', NDVI);



//These line export out the image to your google drive account. Be sure to change the name of
//of the file (description) and the folder destination (folder) before exporting out images. 
//For our purposes, we chose to name each file by its date (YearMonthDay) with no spaces
//Leave scale as is (250). This is the size of each pixel wehn exported (250 m by 250 m)
Export.image.toDrive({
  image: NDVI,
  description: '20150101',
  folder: 'MaxEnt_Data',
  scale: 250,
  region: geometry
});


//This script is only for the retrieval of NDVI images for the study area. 
//Once they have been exported to Drive, they must be downloaded to the user's computer
//Then the images can be stacked into a single geotiff, as well as the clipping of the images to the boundaries of Arizona can be done
//This next part is carried out in R 
//Associated script is MaxEnt_Stack.R




