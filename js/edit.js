//封面预览
oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
oFReader.onload = function(oFREvent) {
	document.getElementById("uploadPreview").src = oFREvent.target.result;
};

function loadImageFile() {
	if (document.getElementById("uploadImage").files.length === 0) {
		return;
	}
	var oFile = document.getElementById("uploadImage").files[0];
	if (!rFilter.test(oFile.type)) {
		alert("You must select a valid image file!");
		return;
	}
	oFReader.readAsDataURL(oFile);
}


$(function() {
    var openid = $("#openid").html();
    $.ajax({
		url:"http://www.qingnianjuhe.com/chuanyintong/index.php/Home/WxFB/UserNickName",
		type:"post",
		data:{
			openid:openid
		},
		success:function(obj){
			console.log(obj);
            userName = obj;
            $("#writer").val(userName);
		}
	})
    $.ajax({
		url:"http://www.qingnianjuhe.com/chuanyintong/index.php/Home/WxFB/WXNickName",
		type:"post",
		data:{
			openid:openid
		},
		success:function(obj){
			console.log(obj);
            wxName = obj;
		}
	})
    //创建文章
	$("#to_edit").click(function(){
		$.ajax({
			url:"http://www.qingnianjuhe.com/chuanyintong/index.php/Home/WxFB/selfdom",
			type:"post",
			data:{
				openid: openid
			},
			success:function(obj){
				pageIndex = obj;
                console.log(pageIndex);
			}
		})
	})
	//获取微信id或自定义昵称
	$("#display_box").on('click', function() {
		if ($("#wecheat_checkbox").is(':checked')) {
			$("#display_wecheatName").html('使用自定义昵称');
			$("#wecheat_checkbox").attr("checked","")
			$("#writer").val("");
			$("#writer").removeAttr("disabled");
		} else {
			$("#display_wecheatName").html('使用注册昵称');
			$("#wecheat_checkbox").attr('checked',"checked");
			$("#writer").val(userName);
			$("#writer").attr("disabled","disabled");
		}
	});

	//创建editor
	var creat = function() {
		editor = new wangEditor('textarea1');
		// 上传图片（举例）
		editor.config.uploadImgUrl = 'http://www.qingnianjuhe.com/chuanyintong/index.php/Home/WxFB/uploadphoto';

		// 自定义菜单
		editor.config.menus = [ // '|' 是菜单组的分割线

			'forecolor',
			'bgcolor',
			//'img',
			'uploadimg',
			'head',
			'undo',
			'redo',
			'bold',
			'hrapp',
			'underline',
			'italic',
			'eraser',
			'quote',
			'unorderlist',
			'orderlist',
			'alignleft',
			'aligncenter',
			'alignright',

		];
		editor.config.fontsizes = {
			// 格式：'value': 'title'
			5: '大标题',
			4: '小标题',
			3: '正文',
		};
		editor.config.colors = {
			'#ff0000': '红色'
		};

		editor.create();
	}
	creat();
	$('.wangEditor-container').hide()
	$(".wangEditor-container").css({
		'border': '0',
		'height': '100%'
	});
	//设置editor属性
	var wangEditor_height = $(window).height() - $('#popup_nav').height() - $('.wangEditor-menu-container').height();
	$('.wangEditor-txt').css({
			'height': '',
			'top': '34px',
			'position': 'absolute'
		})
		//设置滑动功能
	var menu = $('.menu-group');
	var startX = 0,
		endX = 0,
		left = 0;
	menu.bind('touchstart', function(e) {
		var ev = e || window.event;
		startX = ev.originalEvent.targetTouches[0].pageX;
		left = menu.position().left;
	})
	menu.bind('touchmove', function(e) {
			var ev = e || window.event;
			endX = ev.originalEvent.targetTouches[0].pageX;
			if (endX - startX + left > 0) {
				menu.css('left', '0');
			} else {
				menu.css('left', endX - startX + left);
			}
			if (-menu.offset().left >= menu.width() - $(document).width()) {
				menu.css('left', -(menu.width() - $(document).width()));
			}

		})
		//提示用户点击输入
	$('#text_tag').click(function() {
			$('#text_tag').hide();
			$('.wangEditor-container').show();
			$('.wangEditor-txt').focus();
		})
		//输入框获取代码并预览
	$('#content').text('请输入正文');
	//编辑页面预览
	$('#submit_draf').on('click', function() {

		// 获取编辑器区域完整html代码
		html = editor.$txt.html();
		$('#content').html(html);
	})

})