$(document).ready(function() {

  var timelineNavBottomMargin = 20;
  var speed = 1000;

  var timelineOuter = $('.timeline-outer');
  var timelineInner = $('.timeline-inner');
  var dateBox = $('.date-box');  
  var activeSlide = timelineInner.first();
  var activeSlideId = activeSlide.attr('id');
  var nextSlideId;
  var dateBoxId;
  var slideIndex = 0;
  var slideTotal = timelineInner.length;
  var timelineNav = $('.timeline-nav');
  var timelineNavHeight = timelineNav.height();
  var previous = $('.previous');
  var next = $('.next');

  // Calculate the slideshow height and position based on:
  // browser height, dates height, and header height
  var windowHeight = $(window).height();
  var dates = $('.dates');
  var dateHeight = dates.height();
  var headerHeight = $('.header-wrapper').height();

  // Determine the position of the slides and elements based on
  // the header height and the dates height
  function positionElements() {
    // Set a maximum height for the timeline (typically to match the image height)
    var timelineHeight = windowHeight - dateHeight - headerHeight;
    if (timelineHeight > 800) {
      timelineHeight = 800;
    }
    var timelineTop = headerHeight;
    var dateTop = headerHeight + timelineHeight;
    var timelineNavTop = timelineTop + timelineHeight - timelineNavHeight - timelineNavBottomMargin;
    // Set the slider, date box, and navigation arrow positions
    dates.css('top', dateTop);
    timelineInner.css({'height': timelineHeight,'top': timelineTop});
    timelineNav.css('top', timelineNavTop);
  }

  // Put the elements in their places
  positionElements();

  // If the window is resized, get the new window height, then 
  // put everything in the right position again
    $(window).resize(function() {
    windowHeight = $(window).height();
    positionElements();                
  });
    
  // Activate the slider with click events
  timelineInner.hide();
  activeSlide.show();

  dateBox.click(function() {
    var previousIndex = slideIndex;
    dateBox.removeClass('selected');
    $(this).addClass('selected');
    slideIndex = $(this).index();
    dateBoxId = $(this).attr('id');
    nextSlideId = dateBoxId + '-img';
    if (slideIndex > previousIndex) {
      $('#' + activeSlideId).hide("slide", { direction: "left" }, speed);
      $('#' + nextSlideId).show("slide", { direction: "right" }, speed);
    } else {
      $('#' + activeSlideId).hide("slide", { direction: "right" }, speed);
      $('#' + nextSlideId).show("slide", { direction: "left" }, speed);
    }    
    activeSlideId = nextSlideId;    
  });

  previous.click(function() {
    var previousIndex = slideIndex;
    if (slideIndex === 0) {
      slideIndex = slideTotal -1;
    } else {
      slideIndex -= 1;
    }
    dateBox.removeClass('selected');
    dateBox.eq(slideIndex).addClass('selected');
    var current = dateBox.eq(slideIndex);
    current.addClass('selected');
    dateBoxId = current.attr('id');
    nextSlideId = dateBoxId + '-img';
    $('#' + activeSlideId).hide("slide", { direction: "right" }, speed);
    $('#' + nextSlideId).show("slide", { direction: "left" }, speed);
    activeSlideId = nextSlideId;
  });

  next.click(function() {
    if (slideIndex === slideTotal - 1) {
      slideIndex = 0;
    } else {
      slideIndex += 1;
    }
    dateBox.removeClass('selected');
    dateBox.eq(slideIndex).addClass('selected');
    var current = dateBox.eq(slideIndex);
    current.addClass('selected');
    dateBoxId = current.attr('id');
    nextSlideId = dateBoxId + '-img';
    $('#' + activeSlideId).hide("slide", { direction: "left" }, speed);
    $('#' + nextSlideId).show("slide", { direction: "right" }, speed);
    activeSlideId = nextSlideId;
  });
    
});