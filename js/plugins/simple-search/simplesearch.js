/**
 * jQuery simple-type-search
 * 
 * @desc search for a given criteria into a selected set of elements hidding/showing
 *       the elements that matches with the criteria entered by the user
 *       
 * @example http://davidsilveira.me/scripts/simplesearch.html
 * 
 * @see https://github.com/aboyon/jQuery-plugins
 * 
 * @author David Silveira contact@davidsilveira.me
 * @package Javascript
 * @subpackage jQueryPlugin
 */

(function( $ ) {
  
  /**
   * extending jQuery selector
   * New selector type: icontains
   * work as contains('criteria') but with the difference that is case insensitive
   * @see http://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
   * I'm not the author :)
   */
  $.extend($.expr[":"], {
    "icontains": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });
  
  
  $.fn.simplesearch = function(options) {
  
    var settings = $.extend( {
      'selector' : 'div.simplesearch',
      'emptyMsg' : 'No matches found.',
      'emptyMsgHolder': ''
    }, options);
  
    this.keyup(function(e){
        if (e.which == '13') {
            e.preventDefault();
        }
        if ($(this).val().length > 0) {
            $(settings.selector).hide();
            var criteria = $(this).val();
            var element = "div:icontains('"+criteria+"')";
            $(element).show();
            if (parseInt($(element).size()) == 0) {
                if (settings.emptyMsgHolder != '') {
                    $(settings.emptyMsgHolder).html(settings.emptyMsg);
                } else {
                    $('#simplesearch_not_found_text').remove();
                    $(settings.selector).parent().append('<p id="simplesearch_not_found_text" align="center">'+settings.emptyMsg+'</p>');
                }
            } else {
                $('#simplesearch_not_found_text').remove();
            }
        } else {
            $(settings.selector).show();
        }
    });
  
 }; 
})( jQuery );