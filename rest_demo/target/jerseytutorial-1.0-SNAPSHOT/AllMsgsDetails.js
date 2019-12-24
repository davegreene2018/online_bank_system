 
 $(document).ready(function() {
   $.ajax({
        url: "http://localhost:49001/messages"
    }).then(function(data) {
                    console.log(data);
                                        
                    var html = '';
                    var i;
                    for (i = 0; i < data.length; i++) {
                      html+='<span> <b>'+"Message "+(i+1)+ " details "+'</b></span><p> </p>';
                      
                      html+='<span>'+"The message is: "+data[i].message+". "+" "+'</span>';
                      html+='<span>'+"The author of the message is: "+data[i].author+". "+'</span>'; 
                      html+='<span>'+"The message was created on: "+data[i].created+". "+'</span>';
                       
                       var listc= [];
                       listc.push("The comments received for this message are: ")
                       $.each(data[i].comments, function (index, value) {
                            listc.push(value.comment+" "); 
                        });
                        html+='<span>'+listc+'</span>';
                        html+='<p>'+" "+'</p>';
                    }
                    console.log(html);
                    $('.msgs').append(html);
                    
                }); 
            });
