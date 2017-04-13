
/*
 * All interactions should be routed through this file so that the components
 * are connected but decoupled.  Add events if necessary
 */

var selected_neighborhood = 'all'
var selected_city = 'Amsterdam'
var selected_price_max = ''
var selected_price_min = ''
var selected_income_max = ''
var selected_income_min = ''
var selected_stay_max = ''
var selected_stay_min = ''

function didClickChoroplethMap(neighborhood) {
    selected_neighborhood = neighborhood

    let city_delimited = selected_city.replace(/\s+/g, '_')
    let neighbourhood_delimited = regionName.replace(/\s+/g, '_')

    renderParallelCoorPlot(selected_city, regionName, getFilterParams())
    renderHeatMap(city_delimited, neighbourhood_delimited)

}

function postAmenities(city, filters) {
  console.log('Post Amenities')
  console.log(selected_price_min)
  console.log(selected_price_max)
  console.log(selected_stay_min)
  console.log(selected_stay_max)
  console.log(selected_income_min)
  console.log(selected_income_max)
  let metric = $("#dd-list").val()
  console.log(city, metric, filters)
  $.post( "http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/amenities/", {
    "city_name": city,
    "metric": metric,
    "filters": filters,
    "min_price": selected_price_min,
    "max_price": selected_price_max,
    "min_staycount": selected_stay_min,
    "max_staycount": selected_stay_max,
    "min_est_monthly_income": selected_income_min,
    "max_est_monthly_income": selected_income_max
  }, function( data ) {
    update_city(city);
     update_map_criteria(metric, data);
     console.log(data);
  });
}

function onClickAmenity() {
  console.log('Amenity Click!')
  let filter_string = getFilterParams()
  let neighbourhood_delimited = selected_neighborhood.replace(/\s+/g, '_')

  postAmenities(selected_city, filter_string)
  if (selected_neighborhood == 'all') {
    renderParallelCoorPlot(selected_city, null, filter_string)
  } else {
    renderParallelCoorPlot(selected_city, selected_neighborhood, filter_string)
  }
}

function onCityChange() {
  console.log("city change!")
  let city = $(this).text()
  selected_city = city
  $("#dropdownMenuButton").text(city);
  $("#dropdownMenuButton").val(city);
  let city_delimited = city.replace(/\s+/g, '_')

  postAmenities(city, getFilterParams())
  renderParallelCoorPlot(city, null, getFilterParams())
  renderHeatMap(city_delimited, 'all')
  renderWorldCloud(city)
  selected_neighborhood = 'all'
}

function onParallelCoordinatePlotBrush () {
  // let parallelcoordState = d3.parcoords()("#example").state
  // console.log(parallelcoordState)
  postAmenities(selected_city, getFilterParams())
}

function onClickMetric() {

}

function update_filter_ranges(price_max, price_min, income_max, income_min, stay_max, stay_min) {
  selected_price_max = price_max
  selected_price_min = price_min
  selected_income_max = income_max
  selected_income_min = income_min
  selected_stay_max = stay_max
  selected_stay_min = stay_min
}
