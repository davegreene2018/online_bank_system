$(document).ready(function(){
  
  // On page load: datatable
  var table_accounts = $('#table_accounts').DataTable({
    processing: true,
    ajax:{url:"api/account",dataSrc:""},
    "columns": [
      { "data": "accId" },
      { "data": "sortCode"},
      { "data": "accNum" },
      { "data": "curBal"},
     // { "data": "transactions"},
     
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
  var form_account = $('#form_account');
  form_account.validate();
  
  

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

  // Add customer button
  $(document).on('click', '#add_account', function(e){
    e.preventDefault();
    $('.lightbox_content h2').text('Add Account');
    $('#form_account button').text('Add Account');
    $('#form_account').attr('class', 'form add');
    $('#form_account').attr('data-id', '');
    $('#form_account .field_container label.error').hide();
    $('#form_account .field_container').removeClass('valid').removeClass('error');
    $('#form_account #id').val('');
    $('#form_account #sortCode').val('');
    $('#form_account #accNum').val('');
    $('#form_account #curBal').val('');
     //$('#form_account #transactions').val('');
      //$('#form_account #accounts').val('');
    show_lightbox();
  });

  $(document).on('submit', '#form_account.add', function(e){
    e.preventDefault();
    // Validate form
    if (form_account.valid() === true){
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var form_data = $('#form_account').serializeJSON();
      var request   = $.ajax({
        url:          'api/account/',
        cache:        false,
        processData : false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json',
        type:         'post'
      });
      request.done(function(output){
          $('#table_accounts').dataTable().api().ajax.reload(function(){
            hide_loading_message();
            var acc_Num = $('#accNum').val();
            show_message(acc_Num + " added successfully.", 'success');
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
    var accId      = $(this).data('accId');
    var url = 'api/account/'+accId;
    var request = $.ajax({
      url:          url,
      contentType:  'application/json',
      type:         'GET'
    });
    request.done(function(output){
      $('.lightbox_content h2').text('Edit Account');
      $('#form_account button').text('Edit Account');
      $('#form_account').attr('class', 'form edit');
      $('#form_account').attr('data-id', accId);
      $('#form_account .field_container label.error').hide();
      $('#form_account .field_container').removeClass('valid').removeClass('error');
      $('#form_account #accountId').val(output.accountId);
      $('#form_account #sortCode').val(output.sortCode);
      $('#form_account #accNum').val(output.accNum);
      $('#form_account #curBal').val(output.curBal);
      //$('#form_account #transactions').val(output.transactions);
      //$('#form_account #accounts').val(output.accounts);
      hide_loading_message();
      show_lightbox();
    });
    request.fail(function(jqXHR, textStatus){
      hide_loading_message();
      show_message('Request failed: ' + textStatus, 'error');
    });
  });
  
  // Edit customer submit form
  $(document).on('submit', '#form_account.edit', function(e){
    e.preventDefault();
    // Validate form
    if (form_account.valid() === true){
      // Post account information
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var accId        = $('#form_account').attr('data-id');
      var form_data = $('#form_account').serializeJSON();
      var request   = $.ajax({
        url:          'api/account/' + accId,
        cache:        false,
        processData : false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json',
        type:         'put'
      });
      request.done(function(output){
        // Reload data
        $('#table_accounts').dataTable( ).api().ajax.reload(function(){
            hide_loading_message();
             var acc_Num = $('#name').val();
            show_message("Account '" + acc_Num + "' successfully edited.", 'success');
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
    var accId = $(this).data('accId');
    if (confirm("Are you sure you want to delete '" + accId + "'?")){
      show_loading_message();
      var acc_Num      = $(this).data('name');
      var request = $.ajax({
        url:          'api/account/' + accId,
        cache:        false,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'delete'
      });

      request.done(function(output){
        $('#table_accounts').dataTable( ).api().ajax.reload(function(){
            hide_loading_message();
            show_message("Account '" + acc_Num + "' deleted successfully.", 'success');
        }, true);
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Delete request failed: ' + textStatus, 'error');
      });
    }
  });
});
