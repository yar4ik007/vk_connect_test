import connect from '@vkontakte/vkui-connect';

connect.send("VKWebAppInit", {});

var token = connect.send("VKWebAppGetAuthToken", {"app_id": 6952997, "scope": "friends,status,stories,photos"});
alert(token);