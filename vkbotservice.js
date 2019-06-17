import connect from '@vkontakte/vkui-connect';
const DATA = {upload_url: null, token: null, user_id: null};

connect.send("VKWebAppInit", {});
connect.send('VKWebAppGetUserInfo', {});
connect.send("VKWebAppGetAuthToken", {"app_id": 6952997, "scope": "stories"})
connect.subscribe((e) => {
    switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
                DATA.user_id = e.detail.data.id;
                break;

        case 'VKWebAppAccessTokenReceived':
                var accessToken = e.detail.data.access_token;
                DATA.token = accessToken;
                connect.send("VKWebAppCallAPIMethod", {
                    "method": "stories.getPhotoUploadServer",
                    "params": {
                        "add_to_news": 1,
                        "link_text": "write me",
                        "link_url": "https://vk.com/free_teach",
                        "access_token": accessToken
                    }
                });
                break;

        case 'VKWebAppCallAPIMethodResult':
            if (e.detail.data.response.upload_url !== undefined) {
                var uploadUrl = e.detail.data.response.upload_url;
                fetch('http://185.178.44.176:3000?user_id=' + DATA.user_id + '?upload_url='+ uploadUrl)
                .then(function(response) {
                    return JSON.stringify(response);
                })
                .catch( alert );
            }
            break;

        default:
            console.log(e.detail);
    }
});