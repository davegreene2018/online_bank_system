$(document).ready(function() {
    $.ajax({
        url: "http://localhost:49001/messages/1"
    }).then(function(data) {
        var listc= [];
       $.each(data.comments, function (index, value) {
               listc.push(value.comment+", "); 
       })
       $('.msg-author').append(data.author);
       $('.msg-content').append(data.message);
       $('.msg-date').append(data.created);
       $('.msg-comments').append(listc);    
    });
});
