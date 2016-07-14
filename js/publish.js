$(document).on('click','.card', function () {
		console.log(this)
      var buttons1 = [
        {
          text: '请选择',
          label: true
        },
         {
          text: '编辑',
          bold: true,
          color: 'white',
          onClick: function() {
            $.alert("你选择了“编辑“");
          }
        },
        
        
        {
          text: '关闭授权',
          onClick: function() {
            $.alert("你选择了“关闭授权“");
          }
        },
         {
          text: '申请删除源文件',
          bold: true,
          color: 'danger',
          onClick: function() {
            console.log(this)
          }
        },
        {
          text: '删除',
          bold: true,
          color: 'danger',
          onClick: function() {
            $.alert("你选择了“删除“");
          }
        }
         
         
         
      ];
      var buttons2 = [
        {
          text: '取消',
          bg: 'danger'
        }
      ];
      var groups = [buttons1, buttons2];
      $.actions(groups);
  });