
$(function() {

$("#gooey-round").gooeymenu({
	style: "vertical",
	size: 70,
	margin: "small",
	bgColor: "rgb(104, 208, 153)",
	contentColor: "white",
	transitionStep: 100,
	bounce: false,
	bounceLength: "small",
	hover: "rgb(104, 208, 153)",
	circle: {
		radius: 80
	},
	horizontal: {
		menuItemPosition: "glue"
	},
	vertical: {
		menuItemPosition: "spaced",
		direction: "up"
	}
});

$("#delet").click(function() {
  $.toast("删除成功",3000);
  setTimeout(function(){
  	$("#content").html('请输入正文')
  	editor.$txt.html('<p></br></p>');
	$("#title").val('');
	$('#uploadPreview').attr('src', 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E');
  	$(".draft").hide();
  	$("#page1").show();
  },3000)
});

$("#edit_back").click(function(){
	 $.toast("正在返回编辑页面",1000);
setTimeout(function(){
	$(".draft").hide();
  	$(".edit_container").show();
},3000)
})



});


