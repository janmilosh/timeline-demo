$(document).ready(function() {
  'use strict';

  // Variables that we might want to adjust
  var timelineNavBottomMargin = 20;
  var textContainerBottomMargin = 100;
  var maxSpeed = 1000;
  var minSpeed = 500;

  // Get objects from DOM
  var timelineWrapper = $('.timeline-wrapper');
  var timelineInner = $('.timeline-inner');
  var dateBox = $('.date-box');
  var timelineNav = $('.timeline-nav');
  var previous = $('.previous');
  var next = $('.next');
  var dates = $('.dates');
  var dateInner = $('.date-inner');
  var headerWrapper = $('.header-wrapper');
  var textContainer = $('.text-container');
  
  // Set initial values
  var activeSlide = timelineInner.first();
  var activeSlideId = activeSlide.attr('id');
  var nextSlideId;
  var dateBoxId;
  var slideIndex = 0;
  var slideTotal = timelineInner.length;
  var dateInnerWidth = dateBox.length * dateBox.outerWidth();
  dateInner.css('width', dateInnerWidth + 'px');

  // Calculate element's heights
  var dateHeight = dates.height();
  var timelineNavHeight = timelineNav.outerHeight();
  var headerHeight = headerWrapper.height();
  var textContainerHeight = textContainer.outerHeight();
  
  // Determine the position of the slides and elements based on
  // the header height, the dates height, and max image height;
  function positionElements() {
    // Set a maximum height for the timeline (typically to match the image height)
    var windowHeight = $(window).height();
    var timelineHeight = windowHeight - dateHeight - headerHeight;
    if (timelineHeight > 700) {
      timelineHeight = 700;
    }
    var timelineWrapperHeight = timelineHeight + dateHeight;
    var dateTop = timelineHeight;
    var timelineNavTop = timelineHeight - timelineNavBottomMargin - timelineNavHeight;
    var textContainerTop = timelineHeight - textContainerHeight - textContainerBottomMargin;
    // Set the slider, date box, and navigation arrow positions
    dates.css('top', dateTop);
    timelineInner.css('height', timelineHeight);
    timelineNav.css('top', timelineNavTop);
    textContainer.css('top', textContainerTop);
    timelineWrapper.css('height', timelineWrapperHeight);
  }

  // Set the selected class to the date-box and set new ID's
  function setClassesAndIds() {
    dateBox.removeClass('selected');
    dateBox.eq(slideIndex).addClass('selected');
    var current = dateBox.eq(slideIndex);
    current.addClass('selected');
    scrollToSelectedDate();
    dateBoxId = current.attr('id');
    nextSlideId = dateBoxId + '-img';
  }

  var speed = function() {
    var windowWidth = $(window).width();
    var slideSpeed = minSpeed + (maxSpeed - minSpeed)*(windowWidth/960 - 0.333333);
    if (slideSpeed < minSpeed) {
      return minSpeed;
    } else if (slideSpeed > maxSpeed) {
      return maxSpeed;
    } else {
      return slideSpeed;
    }
  }

  // Slide to next image
  function slideNext() {
    $('#' + activeSlideId).hide('slide', { direction: 'left' }, speed());
    $('#' + nextSlideId).show('slide', { direction: 'right' }, speed());
  }

  // Slide to previous image
  function slidePrevious() {
    $('#' + activeSlideId).hide('slide', { direction: 'right' }, speed());
    $('#' + nextSlideId).show('slide', { direction: 'left' }, speed());
  }

  // Move the selected slide's corresponding date into the window
  // if it is out of sight 
  function scrollToSelectedDate() {
    var windowWidth = $(window).width();
    var selectedDate = $('.selected');
    var selectedOffset = selectedDate.offset().left;
    var scrollAmount, selectedIndex;
    // The scroll movement for when the dates are shifted to the left
    if (selectedOffset < 0) {
      dateBox.each(function() {
        if ($(this).hasClass('selected')) {
          selectedIndex = $(this).index();
        }
      });
      scrollAmount =  selectedIndex * dateBox.outerWidth();
      dates.animate({scrollLeft: scrollAmount + 'px'});      
    } 
    // The scroll movement for when the dates are shifted to the right
    if (selectedOffset > windowWidth - dateBox.outerWidth()) {
      dateBox.each(function() {
        if ($(this).hasClass('selected')) {
          selectedIndex = $(this).index();
        }
      });
      scrollAmount =  (selectedIndex + 1) * dateBox.outerWidth() - windowWidth;
      dates.animate({scrollLeft: scrollAmount + 'px'});
    }      
  }

  // Put the elements in their places
  positionElements();

  // If the window is resized, get the new window height, then 
  // put everything in the right position again
  $(window).resize(function() {
    positionElements();
  });

  // If orientation changes on mobile, adjust element positions to
  // the new orientation
  $( window ).on('orientationchange', function() {
    positionElements();
  });
    
  // Hide the slides, then show only the active one
  // (first slide is shown on load)
  timelineInner.hide();
  activeSlide.show();

  // Navigate to slide corresponding to the clicked date-box
  dateBox.click(function() {
    var previousIndex = slideIndex;
    dateBox.removeClass('selected');
    $(this).addClass('selected');
    slideIndex = $(this).index();
    dateBoxId = $(this).attr('id');
    nextSlideId = dateBoxId + '-img';
    if (slideIndex > previousIndex) {
      slideNext();
    } else {
      slidePrevious();
    }    
    activeSlideId = nextSlideId;    
  });

  // Navigate to the previous slide upon clicking the previous arrow icon
  previous.on('click', slideRight);

  // Navigate to the previous slide on swiperight event
  $('.timeline-inner, .timeline-nav').on('swiperight', slideRight);
   
  function slideRight(){    
    if (slideIndex === 0) {
      slideIndex = slideTotal -1;
    } else {
      slideIndex -= 1;
    }
    setClassesAndIds();
    slidePrevious();
    activeSlideId = nextSlideId;
  }

  // Navigate to the next slide upon clicking the next arrow icon
  next.on('click', slideLeft);

  // Navigate to the next slide on swipeleft event
  $('.timeline-inner, .timeline-nav').on('swipeleft', slideLeft);

  function slideLeft() {
    if (slideIndex === slideTotal - 1) {
      slideIndex = 0;
    } else {
      slideIndex += 1;
    }
    setClassesAndIds();
    slideNext();
    activeSlideId = nextSlideId;
  }
    
});