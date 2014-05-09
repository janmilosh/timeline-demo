$(document).ready(function() {

  var box = $('.boxes .box');
  box.hide();
  box.first().show();
  var button = $('button');
  button.click(function() {
    var buttonId = $(this).attr('id');
    var buttonNum = buttonId.slice(-1);
    var visibleBoxId = '#box-' + buttonNum;
    box.hide();
    $(visibleBoxId).show();
  });



  // $(':input').each(function() {
  //   var elem = $(this);
  //   alert($(elem).val('Way Cool'));
  // });
  
  //alert($('div:contains("Maria")').html());
  
  // $('tr:odd').css('background', 'yellow');
  // $('tr:even').css('background', 'orange');
  // var output = $('#output-div');
  // var result = '';
  // output.attr({style: 'color: yellow; font-size:50px'});
  // $('h1, h2').each(function(index) {
  //   result += '<br>' + index + ': ' + $(this).text();
  //   $(this).attr('title', "Another manufactured title!!!")
  // });
  // output.html(result);
  // itemToAppendTo = $('.container');
  // itemToAppendTo.append('<p>This is an appended paragraph.</p>')
  // itemToAppendTo.prepend('<p>This is a prepended paragraph.</p>')
  // $('p').wrap('<div class="wrapper"/>');
  // $('.wrapper').css({'padding': '20px',
  //               'background': 'rgba(0,0,0,0.1)',
  //               'border': '1px solid #555',
  //               'border-radius': '10px'});
  // //$('.container').remove();
  // $('.wrapper').addClass('inner-shadow');
  // $('.wrapper p').css('font-size', '20px');

});