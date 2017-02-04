



                  $('body').waypoint(function(direction) {
                    if (direction == 'down') {
                      $('.Mynavbar').addClass('sticky');
                    } else {
                      $('.Mynavbar').removeClass('sticky');
                    }
                  }, {
                    offset: '-300'
                  });

                  // side bar script

                  function toggleSlider() {
                    // $('.Mynavbar').toggleClass('safarifix');
                    $('body').toggleClass('slided');
                    $('aside').toggleClass('slidedside');
                    $('.overlay').toggleClass('overlayOn');

                    $('.burger').toggleClass('activeBurger')
                  };

                  $('.mobileAdd').click(function(event) {
                    /* Act on the event */
                    event.preventDefault();
                    console.log("mobileAdd clicked")
                    toggleSlider();
                  });

                  $('.overlay').click(function(event) {
                    /* Act on the event */
                    toggleSlider();
                  });

                  $('.icon-cancel').click(function(event) {
                    /* Act on the event */
                    toggleSlider();
                  });
