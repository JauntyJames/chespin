// James Perry Hartman
// Smarter Travel assignment for integration engineer position
// Task 1

$( document ).ready(() => {
  let output = '';

  let place = $('.summary h1').text().split(',')
  output += 'Destination: ' + place[0].trim() + ', ' + place[1].trim() + '\n';

  let dates = $('.search-dates').text();
  let checkIn = dates.split('-')[0].trim();
  output += 'Check in: ' + checkIn + '\n';
  let checkOut = dates.split('-')[1].trim();
  output += 'Check out: ' + checkOut + '\n';

  console.log(output);

// Task 2

  let $resultsContainer = $('.listings.infinite-scroll-enabled');
  let list = $resultsContainer.children('li.hotel');

  $resultsContainer.prepend(
    '<div class="running-total"><span>Viewing </span><span class="number">' + 
    list.length + '</span> <span>' + place[0] + ' hotels</span></div>'
  )
  $('.running-total').css({
    "position": "sticky",
    "display": "inline-block",
    "top": "0",
    "z-index": "2",
    "background-color": "#0082E6",
    "color": "white",
    "font-size": "14px",
    "font-weight": "bold",
    "padding": "8px"
  })

  $( document ).ajaxComplete(() => {
    list = $resultsContainer.children('li');
    $('.running-total .number').text(list.length);
  });

// Task 3

  $('#slidePanel').append(
    '<div id="selected-menu"><h3>Selected Hotels:</h3><div id="hotel-tiles"></div></div>'
  );
  let hotelList = [];
  let idList = [];
  $('#selected-menu').css({
    "position": "fixed",
    "bottom": "1em",
    "z-index": "2",
    "font-weight": "bold",
    "width": "210px",
    "padding": "5px",
    "background-color": "#F5F5F5",
    "border-top-width": "2px",
    "border-color": "white"
  })
  
  let handleButton = () => {
    let $select = $('span:contains(Select)').parents('div.cta-wrap');
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
  };
  handleButton();
  $( document ).ajaxComplete(() => {
    handleButton();
  });
})

