$(document).ready(function(){
  
  // On page load: datatable
  var table_customers = $('#table_customers').DataTable({
    processing: true,
    ajax:{url:"api/customer",dataSrc:""},
    "columns": [
      { "data": "accountName" },
      { "data": "address"},
      { "data": "email" },
      { "data": "password"},
      { "data": "dateAdded",    
          "render": function (data) {
            var date = new Date(data);
            var month = date.getMonth() + 1;
            return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
          }
      },
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
  var form_customer = $('#form_customer');
  form_customer.validate();

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
   // login function


  
 
  // Hide iPad keyboard
  function hide_ipad_keyboard(){
    document.activeElement.blur();
    $('input').blur();
  }

  // Add customer button
  $(document).on('click', '#add_customer', function(e){
    e.preventDefault();
    $('.lightbox_content h2').text('Add Customer');
    $('#form_customer button').text('Add Customer');
    $('#form_customer').attr('class', 'form add');
    $('#form_customer').attr('data-id', '');
    $('#form_customer .field_container label.error').hide();
    $('#form_customer .field_container').removeClass('valid').removeClass('error');
    $('#form_customer #acount_name').val('');
    $('#form_customer #address').val('');
    $('#form_customer #email').val('');
    $('#form_customer #password').val('');
    show_lightbox();
  });

  $(document).on('submit', '#form_customer.add', function(e){
    e.preventDefault();
    // Validate form
    if (form_customer.valid() === true){
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var form_data = $('#form_customer').serializeJSON();
      var request   = $.ajax({
        url:          'api/customer/',
        cache:        false,
        processData : false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json',
        type:         'post'
      });
      request.done(function(output){
          $('#table_customers').dataTable().api().ajax.reload(function(){
            hide_loading_message();
            var account_name = $('#account_name').val();
            show_message(account_name + " added successfully.", 'success');
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
    // Get animal information
    //show_loading_message();
    var id      = $(this).data('id');
    var url = 'api/customer/'+id;
    var request = $.ajax({
      url:          url,
      contentType:  'application/json',
      type:         'GET'
    });
    request.done(function(output){
      $('.lightbox_content h2').text('Edit Customer');
      $('#form_customer button').text('Edit Customer');
      $('#form_customer').attr('class', 'form edit');
      $('#form_customer').attr('data-id', id);
      $('#form_customer .field_container label.error').hide();
      $('#form_customer .field_container').removeClass('valid').removeClass('error');
      $('#form_customer #accountName').val(output.accountName);
      $('#form_customer #address').val(output.address);
      $('#form_customer #email').val(output.email);
      $('#form_customer #password').val(output.password);
      hide_loading_message();
      show_lightbox();
    });
    request.fail(function(jqXHR, textStatus){
      hide_loading_message();
      show_message('Request failed: ' + textStatus, 'error');
    });
  });
  
  // Edit customer submit form
  $(document).on('submit', '#form_customer.edit', function(e){
    e.preventDefault();
    // Validate form
    if (form_customer.valid() === true){
      // Post animal information
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var id        = $('#form_customer').attr('data-id');
      var form_data = $('#form_customer').serializeJSON();
      var request   = $.ajax({
        url:          'api/customer/' + id,
        cache:        false,
        processData : false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json',
        type:         'put'
      });
      request.done(function(output){
        // Reload data
        $('#table_customers').dataTable( ).api().ajax.reload(function(){
            hide_loading_message();
            var account_name = $('#name').val();
            show_message("Customer '" + account_name + "' successfully edited.", 'success');
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
    var account_name = $(this).data('name');
    if (confirm("Are you sure you want to delete '" + account_name + "'?")){
      show_loading_message();
      var id      = $(this).data('id');
      var request = $.ajax({
        url:          'api/customer/' + id,
        cache:        false,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'delete'
      });

      request.done(function(output){
        $('#table_customers').dataTable( ).api().ajax.reload(function(){
            hide_loading_message();
            show_message("Customer '" + account_name + "' deleted successfully.", 'success');
        }, true);
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Delete request failed: ' + textStatus, 'error');
      });
    }
  });
});
//added extra}