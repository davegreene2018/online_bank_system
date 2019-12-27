$(document).ready(function(){
  
  // On page load: datatable
  var table_transactions = $('#table_transactions').DataTable({
    processing: true,
    ajax:{url:"api/transaction",dataSrc:""},
    "columns": [
      { "data": "transId" },
      { "data": "transType"},
     
      { "data": "date",    
          "render": function (data) {
            var date = new Date(data);
            var month = date.getMonth() + 1;
            return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
          }
      },
       { "data": "desc" },
      { "data": "postBalance"},
      { "data": "functions","sClass": "functions" }
    ],
    "aoColumnDefs": [
      { "bSortable": false, "aTargets": [-1] }
    ],
    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    "oLanguage": {
      "oPaginate": {
        "sFirst":       " ",
        "sPrevious":    " ",
        "sNext":        " ",
        "sLast":        " "
      },
      "sLengthMenu":    "Records per page: _MENU_",
      "sInfo":          "Total of _TOTAL_ records (showing _START_ to _END_)",
      "sInfoFiltered":  "(filtered from _MAX_ total records)"
    }
  });
  
  // On page load: form validation
  jQuery.validator.setDefaults({
    success: 'valid',
    errorPlacement: function(error, element){
      error.insertBefore(element);
    },
    highlight: function(element){
      $(element).parent('.field_container').removeClass('valid').addClass('error');
    },
    unhighlight: function(element){
      $(element).parent('.field_container').addClass('valid').removeClass('error');
    }
  });
  var form_transaction = $('#form_transaction');
  form_transaction.validate();
  //login
 

  // Show message
  function show_message(message_text, message_type){
    $('#message').html('<p>' + message_text + '</p>').attr('class', message_type);
    $('#message_container').show();
    if (typeof timeout_message !== 'undefined'){
      window.clearTimeout(timeout_message);
    }
    timeout_message = setTimeout(function(){
      hide_message();
    }, 8000);
  }
  // Hide message
  function hide_message(){
    $('#message').html('').attr('class', '');
    $('#message_container').hide();
  }

  // Show loading message
  function show_loading_message(){
    $('#loading_container').show();
  }
  // Hide loading message
  function hide_loading_message(){
    $('#loading_container').hide();
  }

  // Show lightbox
  function show_lightbox(){
    $('.lightbox_bg').show();
    $('.lightbox_container').show();
  }
  // Hide lightbox
  function hide_lightbox(){
    $('.lightbox_bg').hide();
    $('.lightbox_container').hide();
  }
  // Lightbox background
  $(document).on('click', '.lightbox_bg', function(){
    hide_lightbox();
  });
  // Lightbox close button
  $(document).on('click', '.lightbox_close', function(){
    hide_lightbox();
  });
  // Escape keyboard key
  $(document).keyup(function(e){
    if (e.keyCode == 27){
      hide_lightbox();
    }
  });
  
  
 
  // Hide iPad keyboard
  function hide_ipad_keyboard(){
    document.activeElement.blur();
    $('input').blur();
  }

  // Add transaction button
  $(document).on('click', '#add_transaction', function(e){
    e.preventDefault();
    $('.lightbox_content h2').text('Add Transaction');
    $('#form_transaction button').text('Add Transaction');
    $('#form_transaction').attr('class', 'form add');
    $('#form_transaction').attr('data-id', '');
    $('#form_transaction .field_container label.error').hide();
    $('#form_transaction .field_container').removeClass('valid').removeClass('error');
    $('#form_transaction #transId').val('');
    $('#form_transaction #transType').val('');
    $('#form_transaction #desc').val('');
    $('#form_transaction #postBalance').val('');
    show_lightbox();
  });

  $(document).on('submit', '#form_transaction.add', function(e){
    e.preventDefault();
    // Validate form
    if (form_transaction.valid() === true){
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var form_data = $('#form_transaction').serializeJSON();
      var request   = $.ajax({
        url:          'api/transaction/',
        cache:        false,
        processData : false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json',
        type:         'post'
      });
      request.done(function(output){
          $('#table_transactions').dataTable().api().ajax.reload(function(){
            hide_loading_message();
            var trans_id = $('#transId').val();
            show_message(trans_id + " added successfully.", 'success');
          }, true);
      });
 
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Add request failed: ' + textStatus, 'error');
      });
    }
  });

  // Edit customer button
  $(document).on('click', '.function_edit a', function(e){
    e.preventDefault();
    // Get customer information
    //show_loading_message();
    var id      = $(this).data('id');
    var url = 'api/transaction/'+id;
    var request = $.ajax({
      url:          url,
      contentType:  'application/json',
      type:         'GET'
    });
    request.done(function(output){
      $('.lightbox_content h2').text('Edit Transaction');
      $('#form_transaction button').text('Edit Transaction');
      $('#form_transaction').attr('class', 'form edit');
      $('#form_transaction').attr('data-id', id);
      $('#form_transaction .field_container label.error').hide();
      $('#form_transaction .field_container').removeClass('valid').removeClass('error');
      $('#form_transaction #transId').val(output.transId);
      $('#form_transaction #transType').val(output.transType);
      $('#form_transaction #desc').val(output.desc);
      $('#form_transaction #postBalance').val(output.postBalance);
      hide_loading_message();
      show_lightbox();
    });
    request.fail(function(jqXHR, textStatus){
      hide_loading_message();
      show_message('Request failed: ' + textStatus, 'error');
    });
  });
  
  // Edit customer submit form
  $(document).on('submit', '#form_transaction.edit', function(e){
    e.preventDefault();
    // Validate form
    if (form_transaction.valid() === true){
      // Post animal information
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var id        = $('#form_transaction').attr('data-id');
      var form_data = $('#form_transaction').serializeJSON();
      var request   = $.ajax({
        url:          'api/transaction/' + id,
        cache:        false,
        processData : false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json',
        type:         'put'
      });
      request.done(function(output){
        // Reload data
        $('#table_transactions').dataTable( ).api().ajax.reload(function(){
            hide_loading_message();
            var trans_id = $('#name').val();
            show_message("Transaction '" + trans_id + "' successfully edited.", 'success');
        }, true);
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Edit request failed: ' + textStatus, 'error');
      });
    }
  });
  
  // Delete customer
  $(document).on('click', '.function_delete a', function(e){
    e.preventDefault();
    var id = $(this).data('id');
    if (confirm("Are you sure you want to delete '" + transId + "'?")){
      show_loading_message();
      var trans_id      = $(this).data('name');
      var request = $.ajax({
        url:          'api/transaction/' + id,
        cache:        false,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'delete'
      });

      request.done(function(output){
        $('#table_transactions').dataTable( ).api().ajax.reload(function(){
            hide_loading_message();
            show_message("Transaction '" + trans_id + "' deleted successfully.", 'success');
        }, true);
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Delete request failed: ' + textStatus, 'error');
      });
    }
  });
});
