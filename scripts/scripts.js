$(document).ready(function() {

  // Variables that we might want to adjust
  var timelineNavBottomMargin = 20;
  var textContainerBottomMargin = 100;
  var speed = 1000;

  // Get objects from DOM
  var timelineOuter = $('.timeline-outer');
  var timelineInner = $('.timeline-inner');
  var dateBox = $('.date-box');
  var timelineNav = $('.timeline-nav');
  var previous = $('.previous');
  var next = $('.next');
  var dates = $('.dates');
  var dateInner = $('.date-inner')
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
  var windowHeight = $(window).height();
  var dateHeight = dates.height();
  var timelineNavHeight = timelineNav.outerHeight();
  var headerHeight = headerWrapper.height();
  var textContainerHeight = textContainer.outerHeight();
  
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
    var textContainerTop = timelineHeight - textContainerHeight - textContainerBottomMargin;
    // Set the slider, date box, and navigation arrow positions
    dates.css('top', dateTop);
    timelineInner.css({'height': timelineHeight,'top': timelineTop});
    timelineNav.css('top', timelineNavTop);
    textContainer.css('top', textContainerTop);
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

  // Slide to next image
  function slideNext() {
    $('#' + activeSlideId).hide("slide", { direction: "left" }, speed);
    $('#' + nextSlideId).show("slide", { direction: "right" }, speed);
  }

  // Slide to previous image
  function slidePrevious() {
    $('#' + activeSlideId).hide("slide", { direction: "right" }, speed);
    $('#' + nextSlideId).show("slide", { direction: "left" }, speed);
  }

  // Move the selected slide's corresponding date into the window
  // if it is out of sight 
  function scrollToSelectedDate() {
    var selectedDate = $('.selected');
    var selectedOffset = selectedDate.offset().left;
    if (selectedOffset < 0) {
      dateBox.each(function() {
        if ($(this).hasClass('selected')) {
          selectedIndex = $(this).index();
          console.log('selected index: ', selectedIndex);
        }
      })
      var scrollAmount =  selectedIndex * dateBox.outerWidth();
      dates.animate({scrollLeft: scrollAmount + 'px'});      
    }    
  }
  // $('.dates').mousemove(function() {
  //   var windowWidth = $(window).width();
  //   console.log('window width: ', windowWidth);
  //   var left = $('.selected').offset().left;
  //   console.log('selected position: ', left);
  //   var scrollPosition = dates.scrollLeft();
  //   console.log('scroll position', scrollPosition);
  // });

  // Put the elements in their places
  positionElements();

  // If the window is resized, get the new window height, then 
  // put everything in the right position again
  $(window).resize(function() {
    var windowHeight = $(window).height();
    positionElements();
  });
    
  // Activate the slider with click events
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
  previous.click(function() {
    var previousIndex = slideIndex;
    if (slideIndex === 0) {
      slideIndex = slideTotal -1;
    } else {
      slideIndex -= 1;
    }
    setClassesAndIds();
    slidePrevious();
    activeSlideId = nextSlideId;
  });

  // Navigate to the next slide upon clicking the next arrow icon
  next.click(function() {
    if (slideIndex === slideTotal - 1) {
      slideIndex = 0;
    } else {
      slideIndex += 1;
    }
    setClassesAndIds();
    slideNext();
    activeSlideId = nextSlideId;
  });
    
});