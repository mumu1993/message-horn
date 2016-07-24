$(function() {
	$.noConflict();
	$('#gooeySVG0').remove();
	//切换选项卡
	//获取全部文章

	function article() {
		var openid = $("#openid").html();
		$.ajax({
			type: "post",
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/ArticleList",
			data: {
				sid:0,
				openid: openid
			},
			dataType: "json",
			beforeSend: function() {
				$.showPreloader();
			},
			complete: function() {
				$.hidePreloader();
			},
			error: function() {
				$.hidePreloader();
				$.alert("获取文章下拉列表失败，请重试");
			},
			success: function(obj) {
				if(obj.length == 0){
					var card = $('<div class="card" id="text_tag"><div class="card-content"><div class="card-content-inner">还没有发布文章哦~</div></div></div>')
					card.appendTo($("#page2"));
				}
				//加载文章卡片
				console.log(obj);
				for(var i = 0; i < obj.length; i++) {
					var item = obj[i];
					var time_ = item['fbtime'];
					var _time = new Date(parseInt(time_) * 1000);
					var year = _time.getFullYear();
					var month = _time.getMonth() + 1;
					var day = _time.getDate();
					var hour = _time.getHours();
					var minute = ((_time.getMinutes() + "").length == 1 ? "0" + _time.getMinutes() : _time.getMinutes());
					var __time = "发表于：" + year + "/" + month + "/" + day + " " + hour + ":" + minute;
					var id = item['id'];
					var title = item['title'];
					var title_img = item['title_img'];
					var writer = item['writer'];
					//创建文章卡片
					var card = $(
						'<div class="card"><div class="tid">' + id + '</div><div class="writer">' + writer + '</div><div class="card-content"><div class="list-block media-list"><ul><li class="item-content"><div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="70"></div><div class="item-inner"><div class="card-header"><div class="article' + id + '">' + title +
						'</div></div></div></li></ul></div></div><div class="card-footer"><span>' + __time + '</span></div></div>'
					)
					card.appendTo($("#page2"));
				}

			}
		});

	}
	//加载首页文章
	article();
	function draft() {
		var openid = $("#openid").html();
		$.ajax({
			type: "post",
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/ArticleDList",
			data: {
				sid:0,
				openid: openid
			},
			dataType: "json",
			beforeSend: function() {
				$.showPreloader();
			},
			complete: function() {
				$.hidePreloader();
			},
			error: function() {
				$.hidePreloader();
				$.alert("获取草稿下拉列表失败，请重试");
			},
			success: function(obj) {
				if(obj.length == 0){
					var card = $('<div class="card" id="text_tag"><div class="card-content"><div class="card-content-inner">还没有发布文章哦~</div></div></div>')
					card.appendTo($("#page2"));
				}
				//加载文章卡片
				console.log(obj);
				for(var i = 0; i < obj.length; i++) {
					var item = obj[i];
					var time_ = item['fbtime'];
					var _time = new Date(parseInt(time_) * 1000);
					var year = _time.getFullYear();
					var month = _time.getMonth() + 1;
					var day = _time.getDate();
					var hour = _time.getHours();
					var minute = ((_time.getMinutes() + "").length == 1 ? "0" + _time.getMinutes() : _time.getMinutes());
					var __time = "发表于：" + year + "/" + month + "/" + day + " " + hour + ":" + minute;
					var id = item['id'];
					var title = item['title'];
					var title_img = item['title_img'];
					var writer = item['writer'];
					//创建文章卡片
					var card = $(
						'<div class="card"><div class="tid">' + id + '</div><div class="writer">' + writer + '</div><div class="card-content"><div class="list-block media-list"><ul><li class="item-content"><div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="70"></div><div class="item-inner"><div class="card-header"><div class="article' + id + '">' + title +
						'</div></div></div></li></ul></div></div><div class="card-footer"><span>' + __time + '</span></div></div>'
					)
					card.appendTo($("#page3"));
				}

			}
		});

	}
	//加载 草稿
	draft();
	
	$(".tab-item").on('click', function() {
			$(".page-index").hide();
			$(".tab-item").removeClass('active');
			$(".tab-item").eq($(this).index()).addClass('active')
			$(".page-index").eq($(this).index()).show();
		})
		//绑定点击事件,已发表绑定查看
	$(document).on('click', '#page2>.card', function() {
		var _this = this;
		console.log(this)
		var buttons1 = [{
				text: '请选择',
				label: true
			}, {
				text: '查看',
				bold: true,
				color: 'white',
				onClick: function() {
					$.showPreloader();
					var tid = $(_this).children(".tid").html();
					var title = $(".article" + tid).html();
					var time = ($(_this).children(".card-footer").children("span").html()).substring(4);

					$.ajax({
						type: "post",
						url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/GetDataTxt",
						data: {
							tid: tid
						},
						complete: function() {
							$.hidePreloader();
						},
						success: function(obj) {
							var container = $("#see");
							var _title = "<h3>" + title + "</h3>";
							var _writer = "<p>" + $("#writer").val() + "</p>";
							var _time = "<p>" + time + "</p>";
							console.log(_title, _writer, _time)
							container.html(_title + _writer + _time + obj);
							$(".see").show();
						}
					});
				}
			}, {
				text: '编辑',
				bold: true,
				color: 'white',
				onClick: function() {
					$.showPreloader();
					tid = $(_this).children(".tid").html();
					var title = $(".article" + tid).html();
					console.log(title)
					$.ajax({
						type: "post",
						url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/GetDataTxt",
						data: {
							tid: tid
						},
						complete: function() {
							$.hidePreloader();
						},
						success: function(obj) {
							$("#title").val(title);
							// 初始化编辑器的内容
							$("#content").html('obj');
							editor.$txt.html('obj');
							$(".edit_container").show();

						}
					});
				}
			}, {
				text: '删除',
				bold: true,
				color: 'danger',
				onClick: function() {
					$.confirm('确定要删除文章吗？', function() {
						$.showPreloader();
						var tid = $(_this).children(".tid").html();
						console.log(tid);
						$.ajax({
							type: "post",
							url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/DTitle",
							data: {
								tid: tid
							},
							complete:function(){
								$.hidePreloader();
							},
							success: function() {
								$(_this).remove();
								$.alert("删除成功！")
							},
							error: function() {
								$.alert("删除失败！请重试")
							}
						})
					});
				}
			}

		];
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	$(document).on('click', '#page3>.card', function() {
		var _this = this;
		console.log(this)
		var buttons1 = [{
				text: '请选择',
				label: true
			},{
				text: '编辑',
				bold: true,
				color: 'white',
				onClick: function() {
					$.showPreloader();
					tid = $(_this).children(".tid").html();
					var title = $(".article" + tid).html();
					console.log(title)
					$.ajax({
						type: "post",
						url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/GetDataTxt",
						data: {
							tid: tid
						},
						complete: function() {
							$.hidePreloader();
						},
						success: function(obj) {
							$("#title").val(title);
							// 初始化编辑器的内容
							$("#content").html('obj');
							editor.$txt.html('obj');
							$(".edit_container").show();

						}
					});
				}
			}, {
				text: '删除',
				bold: true,
				color: 'danger',
				onClick: function() {
					$.confirm('确定要删除文章吗？', function() {
						$.showPreloader();
						var tid = $(_this).children(".tid").html();
						console.log(tid);
						$.ajax({
							type: "post",
							url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/DTitle",
							data: {
								tid: tid
							},
							complete:function(){
								$.hidePreloader();
							},
							success: function() {
								$(_this).remove();
								$.alert("删除成功！")
							},
							error: function() {
								$.alert("删除失败！请重试")
							}
						})
					});
				}
			}

		];
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	
	//点击开启编辑器
	$("#to_edit").on('click', function() {
		//		$("#page1").hide();
		$(".edit_container").show();
	});
	//后退隐藏编辑器
	$("#back").on('click', function() {
		$(".content").show();
		$(".edit_container").hide();
	});

	//每分钟保存草稿
	var timer1;

	function timer() {
		timer1 = setInterval(function() {
			html = editor.$txt.html();
			title = $("#title").val();
			writer = $("#writer").val();
			console.log(html, title, writer);
			$.toast('草稿已保存');
		}, 120000)
	}

	$("#content").click(function() {
		timer();
	});
	$("#submit_draf").click(function() {
		clearInterval(timer1);
	});
	$("#submit_back").click(function() {
		clearInterval(timer1);
	});
	//预览
	$('#confirm').on('click', function() {
		// 获取编辑器区域完整html代码
		html = editor.$txt.html();
		title = $("#title").val();
		writer = $("#writer").val();
		cover = $('#uploadPreview').attr('src');
		if(title == '') {
			$.toast('请填写标题');
			return;
		}
		if(writer == '') {
			$.toast('请填写作者');
			return;
		}
		if(html == '<p><br></p>') {
			$.toast('请填写内容');
			return;
		}
		if(cover == "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E") {
			$.toast('还没有上传封面哦~');
			return;
		}
		$("#draft").html('');
		var mydate = new Date();
		var str = "" + mydate.getFullYear() + "年";
		str += (mydate.getMonth() + 1) + "月";
		str += mydate.getDate() + "日";
		str += mydate.getHours() + ':';
		str += mydate.getMinutes().toString().length == 1 ? '0' + mydate.getMinutes() : mydate.getMinutes();
		console.log(str)
		$("#draft").append('<h2>' + title + '</h2>');
		$("#draft").append('<p>' + str + '</p>');
		$("#draft").append(writer);
		$("#draft").append(html);
		//	console.log(titleIn)
		$(".edit_container").hide();
		$(".draft").show();
		$("#draft").show();
		$("#draft_container").show();
	})

	//发布新文章
	$("#publish,#save").click(function() {
		$("#page1").hide();
		var sendData = $.ajax({
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/SetDataTxt",
			type: "post",
			data: {
				DataTxt: html,
				Tid: pageIndex
			},
			success: function(obj) {
				console.log(obj)
			}
		})
		var sendTitle = $.ajax({
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/SetTitleName",
			type: "post",
			data: {
				title: title,
				Tid: pageIndex
			},
			success: function(obj) {
				console.log(obj)
			}
		})
		if(sendData && sendTitle) {
			switch($(this).attr("id")) {
				case "publish":
					{
						creatPage();
						break;
					}
				case "save":
					{
						creatDraft();
						break;
					}
				default:
					break;
			}
		} else {
			$.toast("网络错误，请稍后重试");
		}

	})

	//发布草稿

	function creatDraft() {
		$.showPreloader("正在保存草稿");
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		var day = time.getDate();
		var hour = time.getHours();
		var minute = ((time.getMinutes() + "").length == 1 ? "0" + time.getMinutes() : time.getMinutes());
		_time = year + "/" + month + "/" + day + " " + hour + ":" + minute;
		var setName = $.ajax({
			type: "post",
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/SetTxtUser",
			data: {
				Tid: pageIndex,
				Name: writer
			},
			success: function(obj) {
				console.log(obj);

			}
		});
		var setInn = $.ajax({
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/SetDraft",
			type: "post",
			data: {
				Tid: pageIndex
			},
			complete: function() {
				$.hidePreloader();
				$(".draft").hide();
				$(".tab-item").removeClass('active');
				$(".tab-item").eq(2).addClass('active');
				$("#page3").show();
			},
			success: function(obj) {
				$.hidePreloader();
				//先清空编辑器
				editor.clear();
				$("#content").html("请输入正文");
				$("#title").val("");
				$('#uploadPreview').attr('src', 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E');
				console.log("保存草稿成功");
				//清空草稿
				$("#draft").html("")
					//创建文章卡片
				var card = $(
					'<div class="card"><div class="tid">' + pageIndex + '</div><div class="writer">' + writer + '</div><div class="card-content"><div class="list-block media-list"><ul><li class="item-content"><div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="70"></div><div class="item-inner"><div class="card-header"><div class="article' + pageIndex + '">' + title +
					'</div></div></div></li></ul></div></div><div class="card-footer"><span>' + _time + '</span></div></div>'
				)
				card.appendTo($("#page3"));
			}
		})
	}

	//发布文章
	function creatPage() {
		$.showPreloader("正在发表文章");
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		var day = time.getDate();
		var hour = time.getHours();
		var minute = ((time.getMinutes() + "").length == 1 ? "0" + time.getMinutes() : time.getMinutes());
		_time = year + "/" + month + "/" + day + " " + hour + ":" + minute;
		//设置作者
		var setName = $.ajax({
			type: "post",
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/SetTxtUser",
			data: {
				Tid: pageIndex,
				Name: writer
			},
			success: function(obj) {
				console.log(obj);

			}
		});
		var setInn = $.ajax({
			url: "http://54.222.166.50/chuanyintong/index.php/Home/WxFB/SetFb",
			type: "post",
			data: {
				Tid: pageIndex
			},
			complete: function() {
				$.hidePreloader();
				$(".draft").hide();
				$(".tab-item").removeClass('active');
				$(".tab-item").eq(1).addClass('active');
				$("#page2").show();
			},
			success: function(obj) {
				//先清空编辑器
				editor.clear();
				$("#content").html("请输入正文");
				$("#title").val("");
				$('#uploadPreview').attr('src', 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E');
				console.log("文章发布成功");
				//清空草稿
				$("#draft").html("")
					//创建文章卡片
				var card = $(
					'<div class="card"><div class="tid">' + pageIndex + '</div><div class="writer">' + writer + '</div><div class="card-content"><div class="list-block media-list"><ul><li class="item-content"><div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="70"></div><div class="item-inner"><div class="card-header"><div class="article' + pageIndex + '">' + title +
					'</div></div></div></li></ul></div></div><div class="card-footer"><span>' + _time + '</span></div></div>'
				)
				card.appendTo($("#page2"));
			}
		})
	}

})