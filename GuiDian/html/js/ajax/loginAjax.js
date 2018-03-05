//2017-07-25
mui.init({
	swipeBack: false
});
function loginwx(e) {
	mui.post(commonUrl + 'apigd/login3', {
		m_openid: e.openid,
		source_type: 'wx'
	}, function(data) {
		if(data.code === 1) {
			//获取首页webview
			var wvs = plus.webview.getLaunchWebview();
			//触发首页webview上自定义的刷新个人信息和购物车事件
			mui.fire(wvs, 'refueshpage');
			plus.webview.show(wvs);
		} else {
			mui.post(Url + 'apigd/reg3', {
				m_openid: e.openid,
				m_nickname: e.nickname,
				datajson_pic: e.headimgurl,
				source_type: 'wx'
			}, function(data) {
				if(data.code == 1) {
					//获取首页webview
					var wvs = plus.webview.getLaunchWebview();
					//触发首页webview上自定义的刷新个人信息和购物车事件
					mui.fire(wvs, 'refueshpage');
					plus.webview.show(wvs);
				}
			}, 'json');
		};
	}, 'json');
}
//登录Ajax
document.querySelector("#login").addEventListener('tap', function() {
	if(checkPhone($("#Phone").val())) {
		if($('#password').val()) {
			loginAjax();
		} else {
			mui.toast('密码不能为空');
		}
	}
});

function loginAjax() {
	mui.ajax(commonUrl + 'apigd/memberalogin', {
		data: {
			account: $("#Phone").val(),
			password: $("#password").val()
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 6000, //超时时间设置为6秒；
		success: function(data) {
			if(data.code == 1) {
				mui.toast("登录成功")
				localStorage.setItem('m_openid', data.data.m_openid);
				localStorage.setItem('ifchangepwd', "");
				//获取首页webview
				var wvs = plus.webview.getLaunchWebview();
				//触发首页webview上自定义的刷新个人信息和购物车事件
				mui.fire(wvs, 'refueshpage');
				plus.webview.show(wvs);
			} else {
				mui.toast("账户或密码错误")
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.toast(RequestErrorMsg(type));
		}
	});
}

var _ifchangepwd = localStorage.getItem('ifchangepwd');
if(_ifchangepwd == 'istrue') {
	mui.plusReady(function() {
		var first = null;
		mui.back = function() {
			//首次按键，提示‘再按一次退出应用’
			if(!first) {
				first = new Date().getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if(new Date().getTime() - first < 1000) {
					localStorage.setItem('ifchangepwd', "");
					plus.runtime.quit();
				}
			}

		};
	})
}

$("#Phone").blur(function() {
	checkPhone($("#Phone").val());
});

/*
 * 以下是微信登陆
 */
//function loginwx(e) {
//	mui.post(Url + 'apigd/reg3', {
//		m_openid: e.openid,
//		source_type: 'wx'
//	}, function(data) {
//		if(data.code === 1) {
//			updata();
//		} else {
//			plus.nativeUI.toast("登录失败")
//		};
//	}, 'json');
//
//	function updata() {
//		mui.post(Url + 'apigd/membersave', {
//			m_openid: e.openid,
//			m_nickname: e.nickname,
//			sex: e.sex,
//			datajson_pic: e.headimgurl,
//			source_type: 'wx'
//		}, function(data) {
//			if(data.code === 1) {
//				//获取首页webview
//				var wvs = plus.webview.getLaunchWebview();
//				//触发首页webview上自定义的刷新个人信息和购物车事件
//				mui.fire(wvs, 'refueshpage');
//				plus.webview.show(wvs);
//			} else {
//				plus.nativeUI.toast("登录失败")
//			};
//		}, 'json');
//	}
//}

// 获取用户头像标
//// 监听plusready事件  
//document.addEventListener( "plusready", function(){
//	// 扩展API加载完毕，现在可以正常调用扩展API
//	plus.oauth.getServices( function(services){
//		auths = services;
//	}, function(e){
//		mui.toast( "获取分享服务列表失败："+e.message+" - "+e.code );
//	} );
//}, false );
//function authLogin(){
//	var s = auths[0];
//	if ( !s.authResult ) {
//		s.login( function(e){
//			mui.toast( "登录认证成功！" );
//				authUserInfo();
//		}, function(e){
//			mui.toast( "登录认证失败！" );
//		} );
//	}else{
//		mui.toast( "已经登录认证！" );
//	}
//}
//
//function authLogout(){
//	for ( var i in auths ) {
//		var s = auths[i];
//		if ( s.authResult ) {
//			s.logout(function(e){
////				alert( "注销登录认证成功！" );
//			}, function(e){
//				mui.toast( "注销登录认证失败！" );
//			});
//		}
//	}
//}

//// 获取登录用户信息操作
//function authUserInfo(){
//	var s = auths[0];
//	if ( !s.authResult ) {
//		mui.toast("未登录授权！");
//	} else {
//		s.getUserInfo( function(e){
//			var jsonObj = s.userInfo;
//           showData(s,jsonObj);
//			authLogout();
//		}, function(e){
//			mui.toast( "获取用户信息失败："+e.message+" - "+e.code );
//		} );
//	}
//}
// mui.init({
//          swipeBack:true //启用右滑关闭功能
//      });
//     var auths=null;
//      mui.plusReady(function() {  
//          plus.oauth.getServices(function(services) {
//              auths = services;
//          }, function(e) {
//              alert("获取登录服务列表失败：" + e.message + " - " + e.code);
//          });
//      });
//      
//      document.getElementById('weixin').addEventListener('tap',function() {
//             authLogin('weixin');
//      });
////         登录操作
//      function authLogin(type) {
//          var s;
//          for (var i = 0; i < auths.length; i++) {
//              if (auths[i].id == type) {
//                  s = auths[i];
//                  break;
//              }
//          }
//          if (!s.authResult) {
//              s.login(function(e) {
//                  mui.toast("登录认证成功！");
//                  authUserInfo(type);
//              }, function(e) {
//                  mui.toast("登录认证失败！");
//              });   
//          } else {
//              mui.toast("已经登录认证！");
//          }
//      }
////        注销
//      function authLogout() {
//          for (var i in auths) {
//              var s = auths[i];
//              if (s.authResult) {
//                  s.logout(function(e) {
//                      console.log("注销登录认证成功！");
//                  }, function(e) {
//                      console.log("注销登录认证失败！");
//                  });
//              }
//          }
//      }
//      // 微信登录认证信息
//      function authUserInfo(type) {
//          var s;
//          for (var i = 0; i < auths.length; i++) {
//              if (auths[i].id == type) {
//                  s = auths[i];
//                  break;
//              }
//          }
//          if (!s.authResult) {
//          } else {
//              s.getUserInfo(function(e) {
//                  var josnStr = JSON.stringify(s.userInfo);
//                  var jsonObj = s.userInfo;
//                  showData(type,jsonObj);
//                  authLogout();
//              }, function(e) {
//                  alert("获取用户信息失败：" + e.message + " - " + e.code);
//              });
//          }
//      }
//      function authUser(s){
//      	s.getUserInfo(function(e) {
//                  var josnStr = JSON.stringify(s.userInfo);
//                  var jsonObj = s.userInfo;
//                  showData(jsonObj);
//                  authLogout();
//              }, function(e) {
//                  alert("获取用户信息失败：" + e.message + " - " + e.code);
//              });
//      }
// 显示用户头像信息
//      function showData(type,data) {
//                 localStorage.setItem('m_openid',data.openid);
//                loginwx(data);
//        }