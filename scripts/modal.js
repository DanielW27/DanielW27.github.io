$(document).ready(function(){

  // MODAL
  var modalText = {
    roambi: {
      title: 'Crowdy',
      tag: 'CROWD SOURCED MOVIE STATS.',
      detail: 'Crowdy offers crowd sourced statistics on how busy local movie theaters are. It utilizes a 3rd part API to fetch moive theaters and times as well as uses Firebase to authenticate and keep track of how busy the theaters are.',
      link: 'https://github.com/ekuses/Group5Final'
    },
    walker: {
      title: 'Machine Intelligence Lab',
      tag: 'AUTONOMOUS UNDERWATER VEHICLE.',
      detail: 'My work as an undergraduate researcher at the University of Florida has allowed me to work on the development of an Autonomous Underwater Vehicle (AUV). The design of the robot is developed with modularity and fault-tolerance in mind.',
      link: 'http://subjugator.org'
    },
    powur: {
      title: 'National Atmospheric Release Advisory Committee',
      tag: 'Software Engineering Internship',
      detail: 'During May - August 2019 I worked as a computation intern for Lawrence Livermore National Laboratory. I learned valuable lessons in communicating within a multidisciplinary team, code reviews, and independent problem solving',
      link: 'https://narac.llnl.gov/'
    },
    mystand: {
      title: 'Machine Intelligence Lab',
      tag: 'Indy Autonomous Challenge',
      detail: 'Given a bare-bones Dallara IL-15 racecar, my research team at the University of Florida modeled simulations, and developed hardware and software to compete against 37 other Universities across 11 countries.',
      link: 'https://www.indyautonomouschallenge.com/'
    },
    never: {
      title: '',
      tag: '.',
      detail: '',
    },
    themall: {
      title: '',
      tag: '',
      detail: '',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
