$('#chat-form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
        url : '/post/',
        type : 'POST',
        data : { msgbox : $('#chat-msg').val() },

        success : function(json){
            $('#chat-msg').val('');
            //$('#msg-list').append('<li class="text-left query list-group-item">' + json.query + '</li>');

            //$('#msg-list').append('<li class="text-left response list-group-item">' + json.response + '</li>');
            $('#msg-list').append('<div class="row msg_container base_sent">'
                                    +'<div class="col-md-10 col-xs-10">'
                                        +'<div class="messages msg_sent" style="text-align: right;">'
                                           +'<p class="query">' + json.query + '</p>'
                                        +'</div></div></div>');

            $('#msg-list').append('<div class="row msg_container base_receive">'
                                    +'<div class="col-md-2 col-xs-2 avatar">'
                                        +' <img src="http://myresumebot.webdabba.com/static/img/profile-pic.png" class=" img-responsive ">'
                                    +'</div>'
                                    +'<div class="col-md-10 col-xs-10">'
                                        +'<div class="messages msg_receive">'
                                           +'<p class="response">' + json.response + '</p>'
                                        +'</div></div></div>');

            var chatlist = document.getElementById('msg-list-div');
            chatlist.scrollTop = chatlist.scrollHeight;
        }
    });
});



var scrolling = false;
$(function(){
    $('#msg-list-div').on('scroll', function(){
        scrolling = true;
    });
    refreshTimer = setInterval(getMessages, 500);
});

$(document).ready(function() {
     $('#send').attr('disabled','disabled');
     $('#chat-msg').keyup(function() {
        if($(this).val() != '') {
           $('#send').removeAttr('disabled');
        }
        else {
        $('#send').attr('disabled','disabled');
        }
     });
 });

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});