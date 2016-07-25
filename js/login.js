$(function() {
	$("#display").click(function() {
		//	$(".sign-up").hide();
		$.popup('#sign');
	})
	$(".button").click(function() {
			$.closeModal('#sign');
		})
		//表单验证
	var reg1 = /^[a-zA-Z0-9\u4e00-\u9fa5]{0,8}$/;
	var phone = /^((13|18)(\d{9}))$|^(14[57]\d{8})$|^(17[07]\d{8})$|^(15[0-35-9]\d{8})$/;
	var flag1, flag2;
	var openid = $("#openid").html();
	var exist = $("#isexist").html();
	if (exist == 2) {
		window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8663a265c1ddd949&redirect_uri=http%3A%2F%2Fwww.qingnianjuhe.com%2Fchuanyintong%2Findex.php%2FHome%2FWxFB%2Findex%3Fid%3D1&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect"
	}
	console.log(openid, 'exist=' + exist)
	$("#user-name").keyup(function() {
		userName = $("#user-name").val();
		console.log(userName);
		if (userName == "") {
			$("#register_name").html('昵称不能为空');
			$("#register_name").css('color', 'red');
			return;
		}
		if (reg1.test(userName) && userName !== "") {
			$.ajax({
					url: "http://www.qingnianjuhe.com/chuanyintong/index.php/Home/WxFB/IsName/nickname/",
					type: 'post',
					data: {
						nickname: userName
					},
					success: function(obj) {
						console.log(obj);
						if (obj == 1) {
							$("#register_name").html('昵称不能为空');
							$("#register_name").css('color', 'red')
							console.log("error:你输入名字为空或者未接收到nickname")
						} else if (obj == 2) {
							$("#register_name").html('该昵称已经被使用');
							$("#register_name").css('color', 'red')
							flag1 = false;
						} else if (obj == 3) {
							$("#register_name").html('可以使用此昵称注册');
							$("#register_name").css('color', '#3d4145');

							flag1 = true;
						}
					}
				}

			)
		} else {
			$("#register_name").html('用户名只能由字母、数字、汉字组成，限长8个字符');
			$("#register_name").css('color', 'red')
			flag1 = false;
		}

	})
	$("#phone-num").keyup(function() {
		phoneNum = $("#phone-num").val();
		if (phone.test(phoneNum)) {
			$("#register_num").html('可以使用此手机号码注册');
			$("#register_num").css('color', '#3d4145')
			flag2 = true;
		} else {
			$("#register_num").html('请填写正确手机号码');
			$("#register_num").css('color', 'red');
			flag2 = false;
		}
	})
	$("#sbumit_sel").on('click', function() {
		if ($("#user-name-check").is(':checked')) {
			$("#submit").addClass('disabled')
			return;
		} else {
			$("#submit").removeClass('disabled')
		}
	})
	$('#submit').on('click', function() {
		userName = $("#user-name").val();
		phoneNum = $("#phone-num").val();
		if ($("#user-name-check").is(':checked')) {} else {
			$.toast('请勾选用户协议');
			return;
		}
		if (flag1 == true) {
			$("#writer").val(userName)
		} else {
			$.toast('请填写昵称');
			return;
		}
		if (flag2 == true) {} else {
			$.toast("请填写正确手机号码");
			return;
		}
		console.log(openid)
		$.ajax({
			url: "http://www.qingnianjuhe.com/chuanyintong/index.php/Home/WxFB/Exist",
			type: 'post',
			data: {
				openid: openid,
				phone_num: phoneNum,
				NickName: userName
			},
			beforeSend: function() {
				$.showPreloader('提交中');
			},
			success: function(obj) {
				$.hidePreloader();
				if (obj == 1) {
					console.log('Openid为空');
					alert("注册失败，请重试");
				} else if (obj == 2) {
					console.log('phone_num为空');
					alert("注册失败，请重试");
				} else if (obj == 3) {
					console.log('pNickName为空');
					alert("注册失败，请重试");
				} else {
					alert('注册成功！');
					window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8663a265c1ddd949&redirect_uri=http%3A%2F%2Fwww.qingnianjuhe.com%2Fchuanyintong%2Findex.php%2FHome%2FWxFB%2Findex%3Fid%3D1&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect"
				}
			},
			complete: function() {
				$.hideIndicator();
			},
			error: function() {
				$.hideIndicator();
			}
		})

	});
})