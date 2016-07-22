$('#show').click(function(){
	$.ajax({
		type:'GET',
		url: "http://localhost:8080/data/",
		success: function(result){
		  table_header = table_content='';
	  	table_header +='<tr><th>ID</th>'+'<th>Name</th>'+'<th>Age</th>'+'<th>Gender</th>'+'<th>E-mail</th>'+'<th>Phone</th>'+'<th>Action</th></tr>';
		  $(result).each(function(i, item) {
       	table_content +='<tr><td>'+result[i].id+'</td>'+'<td>'+result[i].name+'</td>'+'<td>'+result[i].age+'</td>'+'<td>'+result[i].gender+'</td>'+'<td>'+result[i].email+'</td>'+'<td>'+result[i].phone+'</td><td><button class="btn btn-info">Modify</button> <button class="btn btn-danger" id="del">Delete</button></td></tr>';	
      });

	    $('thead').append(table_header);
      $('tbody').append(table_content);
    }

	});

	 $(this).attr("disabled","disabled");
});

//for add new entry operation
  $('#add').click(function(){
    var Name =$('#name').val(),
        Age =$('#age').val(),
        Sex =$('#sex').val(),
        Email =$('#mail').val(),
        Phone =$('#no').val();

    $.ajax({
        type:"Post",
        url: ' http://localhost:8080/data',
        headers:{'Content-Type':'application/json'},
              
        data: JSON.stringify({
          name : Name,                 
          age : Age,
          gender : Sex,
          email : Email,
          phone: Phone
        })
      });
  });

//for delete operation
// $('#del').click(function(e){

// 	var row =$(this).closest('tr'),
//    id = row.attr('id');
 // $.ajax({
 //            url: "http://localhost:8080/data/" + id,
 //            success: function() {
 //                alert("successfully deleted");
 //                row.remove();
 //            }
 //      });
// });