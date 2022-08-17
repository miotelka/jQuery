const $formModalShow = $('#formModalShow');
const $closeForm = $('#formModalShow .close');

$('#formModalShowBtn').click(function() {
  $formModalShow.show(300);
  $('body').addClass('active');
});
$closeForm.click(function() {
  $formModalShow.hide(300);
  $('body').removeClass('active');
});

function closeKey() {
  $('.metaInfo a').on('click', function() {
    $(this).parent().parent().remove(); 
  });
}

$('#keywords').on('keyup', function(e) {
  if (e.keyCode === 32) {
    const value = $(this).val();
    if (value) {
      $(this).val('').parent().parent().siblings('.halon').append('<li><span>' + value + '<a href="javascript:void(0);">X</a></span></li>');
      closeKey();
    }
  }
});

$(function() {
  var availableTags = [
    "Nowość",
    "Hit dnia",
    "Promocja",
    "Ostatnie sztuki",
    "Uszkodzony"
  ];
  function split( val ) {
    return val.split( /,\s*/ );
  }
  function extractLast( term ) {
    return split( term ).pop();
  }

  $( "#tags" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
          availableTags, extractLast( request.term ) ) );
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        return false;
      }
    });
});