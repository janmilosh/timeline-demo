$(document).ready(function() {

  var timelineOuter = $('.timeline-outer');
  var timelineInner = $('.timeline-inner');
  var dateBox = $('.date-box');  
  var activeSlide = timelineInner.first();
  var activeSlideId = activeSlide.attr('id');
  var nextSlideId;
  var dateBoxId;
  var slideIndex = 0;
  var slideTotal = timelineInner.length;
  var previous = $('.previous');
  var next = $('.next');
  var speed = 2000;

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