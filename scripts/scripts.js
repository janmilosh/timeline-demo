$(document).ready(function() {

  var timelineOuter = $('.timeline-outer');
  var timelineInner = $('.timeline-inner');
  var dateBox = $('.date-box');
  timelineInner.hide();
  var activeSlide = timelineInner.first();
  var activeSlideId = activeSlide.attr('id');
  activeSlide.show();

  dateBox.click(function() {
    dateBox.removeClass('selected');
    $(this).addClass('selected');
    
    var dateBoxId = $(this).attr('id');
    var nextSlideId = dateBoxId + '-img';
    $('#' + activeSlideId).hide("slide", { direction: "left" }, 2000);
    $('#' + nextSlideId).show("slide", { direction: "right" }, 2000);
    activeSlideId = nextSlideId;    
  });


  
});