// James Perry Hartman
// Smarter Travel assignment for integration engineer position
// Task 1

let output = '';

let place = $('.summary h1').html();
output += 'Destination: ' + place + '\n';

let dates = $('.search-dates').html();
let checkIn = dates.split('-')[0].trim();
output += 'Check in: ' + checkIn + '\n';
let checkOut = dates.split('-')[1].trim();
output += 'Check out: ' + checkOut + '\n';

console.log(output);

// Task 2

let $resultsContainer = $('.listings.infinite-scroll-enabled');
let list = $resultsContainer.children('li');

$( document ).ready(() => {
  $resultsContainer.prepend('<div class="running-total"><span>' + list.length + '</span><span>hotels</span></div>')
  $('.running-total').css({
    "position": "sticky",
    "top": "0",
    "z-index": "2",
    "background-color": "#0082E6"
  })
})

$( document ).ajaxComplete(() => {
  list = $resultsContainer.children('li');
  $('.running-total:first-child').html(list.length);
});

// Task 3

$( document ).ready(() => {
  let $select = $('span:contains(Select)')
  $('#slidePanel').append(
    '<div id="selected-menu">Selected Hotels:<div id="hotel-tiles"></div></div>'
  );
  let hotelList = [];
  let idList = [];
  $select.on('click', (event) => {
    event.preventDefault(); // take this out before submitting
    let $hotel = $(event.currentTarget).closest('li');
    let hotelData = $hotel.attr('data-info').split('|');
    let newHotel = {
      name: $hotel.attr('data-title'),
      price: parseInt(hotelData[hotelData.length - 1]),
      id: parseInt(hotelData[1])
    }
    if (!idList.includes(newHotel.id)) {
      hotelList.push(newHotel);
      idList.push(newHotel.id);
    }
    hotelList.sort((a, b) => {
      return a.price - b.price
    })
    let hotelTiles = [];
    hotelList.forEach((hotel) => {
      hotelTiles.push( "<div>" + hotel.name + ": $" + hotel.price + "</div>" )
    })
    hotelTiles = hotelTiles.join('')
    $('#hotel-tiles').replaceWith( '<div id="hotel-tiles">' + hotelTiles + '</div>')
  });
})

// <div class="compression-messaging">
//   <div class="percentage">
//     <svg class="circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox=" 0 0 110 110" preserveAspectRatio="none">
//       <circle cx="55" cy="55" r="52" class="stroke" stroke-width="6" stroke-dasharray="326.73" stroke-dashOffset="0" stroke-linecap="round"></circle>
//     </svg>
//     <div class="text">
//       <span>64%</span>
//     </div>
//   </div>
//   <div class="message-wrapper">
//     <div class="message">
//       <p>...<p>
//     </div>
//     <button class="cta icon icon-close"></button>
//   </div>
// </div >
