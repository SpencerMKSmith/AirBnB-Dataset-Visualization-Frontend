function rgb2hex(orig){
 var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}

function deselectAllAmenities() {
  $('.amenity-box').each(function() {
    $(this).removeClass("tester");   //TODO: Why is this class called tester and doesn't use selected-amenities?
    $(this).removeClass("selected-amenity"); 
  })
}

$(function() {

  let amenities = [
    {"name": "Wireless Internet", "url": "wifi.png"},
    {"name": "Super Host", "url": "super.png"},
    {"name": "Allows Smoking", "url": "cig.png"},
    {"name": "Allows Pets", "url": "pets.png"},
    {"name": "Pool", "url": "pool.png"},
    {"name": "Free Parking", "url": "park.png"},
    {"name": "Washer & Dryer", "url": "washer.png"},
    {"name": "Cable TV", "url": "tv.png"},
    {"name": "Gym", "url": "gym.png"},
    {"name": "Kitchen", "url": "kitchen.png"},
    {"name": "Fast Book", "url": "instant.png"}
  ]

  amenities.forEach((data) => {
    $('#amenity-grid').append('\
    <div class="amenity-box" style="background-image: url(assets/img/'+data.url+')">\
      <div class="amenity-grid-text">'+data.name+'</div>\
    </div>\
    ')
  })

  $(".amenity-box" ).click(function() {
    if ($(this).hasClass("selected-amenity")) {
      $(this).removeClass("selected-amenity")
    } else {
      $(this).addClass("selected-amenity")
    }

    let currentColor = rgb2hex($(this).css("background-color"));
    // Add this to enable the proper hover technique
    //TO:DO Change this class from tester to something that makes more sense
    $(this).toggleClass('tester');

    onClickAmenity()
  });
})

function getFilterParams() {
  var str = "";
  let filter_params = ""

  $('.selected-amenity').each(function(){
    str += $.trim(($(this).text() + ","));
  })

  let amenities_array = str.split(',')

  amenities_array.forEach((item) => {
    if (item!=""){
      item = $.trim(item);
      switch (item) {
        case "Allows Pets":
          filter_params = filter_params + "allows_pets,";
          break;
        case "Wireless Internet":
          filter_params = filter_params + 'has_internet,';
          break;
        case "Super Host":
          filter_params = filter_params + 'host_is_superhost,';
          break;
        case "Allows Smoking":
          filter_params = filter_params + 'allows_smoking,';
          break;
        case "Pool":
          filter_params = filter_params + 'has_pool,';
          break;
        case "Free Parking":
          filter_params = filter_params + 'has_free_parking,';
          break;
        case "Washer & Dryer":
          filter_params = filter_params + 'has_washer_and_dryer,';
          break;
        case "Cable TV":
          filter_params = filter_params + 'has_tv,';
          break;
        case "Gym":
          filter_params = filter_params + 'has_gym,';
          break;
        case "Kitchen":
          filter_params = filter_params + 'has_kitchen,';
          break;
        case "Fast Book":
          filter_params = filter_params + 'instant_bookable,';
          break;
        default:
          filter_params = filter_params + "default,"
          break;
      }
    }
  })

  return filter_params.substring(0, filter_params.length-1)
}
