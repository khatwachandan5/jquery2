$('#show').click(function(){
	$.ajax({
		type:'GET',
		url: "http://localhost:8080/data/",
		success: function(result){
			console.log(result);
			// var result = JSON.stringify(result),
			 table_header = table_content='';
			// console.log(result);
		table_header +='<tr><th>ID</th>'+'<th>Name</th>'+'<th>Age</th>'+'<th>Gender</th>'+'<th>E-mail</th>'+'<th>Phone</th>'+'<th>Action</th></tr>';
			 $(result).each(function(i, item) {
     	table_content +='<tr><td>'+result[i].id+'</td>'+'<td>'+result[i].name+'</td>'+'<td>'+result[i].age+'</td>'+'<td>'+result[i].gender+'</td>'+'<td>'+result[i].email+'</td>'+'<td>'+result[i].phone+'</td><td><button class="btn btn-info">Modify</button> <button class="btn btn-danger">Delete</button></td></tr>';	
     });
	 $('thead').append(table_header);
     $('tbody').append(table_content);
    }
	});
	$(this).attr("disabled","disabled");
 });

$('#add').click(function(){
//console.log("Inside");
var age = $("#age").val();
//console.log(age);
var name = $("#name").val();
//console.log(name);
var sex = $("#sex").val();
//console.log(sex);
var mail = $("#mail").val();
//console.log(mail);
var no = $("#no").val();
//console.log(no);
$.ajax({
		type:'POST',
		url: "http://localhost:8080/data/",
		success: function(result){
			id='';
			 $(result).each(function(i, item) {
 
     	 id +='<tr><td>'+result[i].id+'</td></tr>';	
     	 console.log(id);
     });
			// console.log(result);
			// table_content='';
			// table_content +='<tr><td>'+result[name]+'</td>'+'<td>'+result[age]+'</td>'+'<td>'+result[sex]+'</td>'+'<td>'+result[mail]+'</td>'+'<td>'+result[no]+'</td><td><button class="btn btn-info">Modify</button> <button class="btn btn-danger">Delete</button></td></tr>';	
   //  		$('tbody').append(table_content);
    }
	});
});


