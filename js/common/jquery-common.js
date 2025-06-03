(function($) {
 
        $.ajaxSetup({
               beforeSend: function(xhr) {
                xhr.setRequestHeader("AJAX", true);
            },
            error: function(xhr, status, err) {
            	alert("예외가 발생했습니다. 관리자에게 문의하세요.");
            }
        });
 
})(jQuery);