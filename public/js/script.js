$('#show')
.click(
     function ()
     {
         $(this).hide();
     }
);//for hiding show completed data button once clicked
$('#show').click(function(){

  $('#finding, #search').removeClass('sr-only');
  $('#entry').removeClass('sr-only');
  $.ajax({

    type:'GET',
    url: "http://localhost:8080/data/",
    success: function(result){
      table_header = table_content='';
      table_header +='<tr><th>Name</th>'+'<th>Age</th>'+'<th>Gender</th>'+'<th>E-mail</th>'+'<th>Phone</th>'+'<th>Action</th></tr>';
      $(result).each(function(i, item) {
        table_content +='<tr id='+result[i].id+'><td>'+result[i].name+'</td>'+'<td>'+result[i].age+'</td>'+'<td>'+result[i].gender+'</td>'+'<td>'+result[i].email+'</td>'+'<td>'+result[i].phone+'</td><td><button class="btn btn-warning update" style="margin-left: 10px;"><span class="glyphicon glyphicon-pencil"></span> Update</button><button class="btn btn-danger danger" style="margin-left: 10px;"><span class="glyphicon glyphicon-trash"></span> Delete</button><button class="btn btn btn-success sr-only change" style="margin-left: 10px;"><span class="glyphicon glyphicon-ok"></span> Save</button><button class="btn btn-danger sr-only cancel" style="margin-left: 10px;"><span class="glyphicon glyphicon-remove"></span> Cancel</button></td></tr>';
    
      });
    
      $('thead').append(table_header);
      $('tbody').append(table_content); 
    }
}); //for getting data from db into tables

  $(this).attr("disabled","disabled");//making button disable once selected
});
//for add new entry operation
$('#add').click(function(){
  
  var  Name =$('#name').val(),
  Age =$('#age').val(),
  Sex =$('#sex').val(),
  Email =$('#mail').val(),
  Phone =$('#no').val();
  $.ajax({

    type:"Post",
    url: ' http://localhost:8080/data',
    'Content-Type':'application/json',
    data:({
      name : Name,                 
      age : Age,
      gender : Sex,
      email : Email,
      phone: Phone
    })
  });
});
//for delete operation
$('#contented').delegate('.danger', 'click', function(e) {

  var row = $(this).parent().parent();
  var id = $(this).parent().parent().attr('id');
  $.ajax({

    url: "http://localhost:8080/data/" +id,
    type: 'Delete',
    success: function() {

      row.remove();
      alert("Deleted successfully");
    },

    error:function(){
    
      alert("Unable to delete row");
    }
  });
});

//for edit and delete button toggle
$('#contented').delegate('.update', 'click', function() {

  $('.update, .danger').attr("disabled","disabled");
  $(this).siblings('button').toggleClass('sr-only');
  $(this).toggleClass('sr-only');
  $(this).parent().siblings().attr('contenteditable',true);
});

//for cancel button toggle
$('#contented').delegate('.cancel', 'click', function() {

  $(this).siblings('button').toggleClass('sr-only');
  $(this).toggleClass('sr-only');
  $(this).parent().siblings().attr('contenteditable',false);
  $('.update, .danger').removeAttr('disabled');;
});

//for updation operation
$('#contented').delegate('.change', 'click', function(d) {

  var row = $(this).parent().parent().attr('id'),
  Name =$(this).parent().siblings()[0].innerHTML,
  Age =$(this).parent().siblings()[1].innerHTML,
  Sex =$(this).parent().siblings()[2].innerHTML,
  Email =$(this).parent().siblings()[3].innerHTML,
  Phone =$(this).parent().siblings()[4].innerHTML,
  $this=$(this),
  obj={
    "name" : Name,                 
    "age" : Age,
    "gender" : Sex,
    "email" : Email,
    "phone": Phone
  };
  $.ajax({

    type:"Patch",
    url: ' http://localhost:8080/data/' +row,
    'Content-Type':'application/json',
    data:obj,
    success:function(){

      alert("Updated Successfully");
      $this.toggleClass('sr-only');
      $this.siblings().toggleClass('sr-only');
      $('.update, .danger').removeAttr('disabled');
      $this.parent().siblings().attr("contenteditable",false); 

    },
    error:function(){
      
      alert("Unable to update the row");
      $this.toggleClass('sr-only');
      $this.siblings().toggleClass('sr-only');
      $('.update, .danger').removeAttr('disabled');
      $this.parent().siblings().attr("contenteditable",false);
    }
  });
});