/*
 * @Author: MonsterDOG
 * @Date: 2021-02-26 09:44:01
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 22:49:34
 * @FilePath: /vue-cli4-demo/mock/user.js
 * @Description: 【描述】
 */

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
};

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://tva4.sinaimg.cn/crop.0.1.1242.1242.180/005JF6Ddjw8fcbxca1nr7j30yi0ykgom.jpg?KID=imgbed,tva&Expires=1616086274&ssig=zDEqFlffOo',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://tva4.sinaimg.cn/crop.0.1.1242.1242.180/005JF6Ddjw8fcbxca1nr7j30yi0ykgom.jpg?KID=imgbed,tva&Expires=1616086274&ssig=zDEqFlffOo',
    name: 'Normal Editor'
  }
};

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body;
      const token = tokens[username];
      console.log(token);

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '帐号和密码不正确。'
        };
      }

      return {
        code: 20000,
        data: token
      };
    }
  },

  // get user info
  {
    // eslint-disable-next-line no-useless-escape
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息。'
        };
      }

      return {
        code: 20000,
        data: info
      };
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  }
];
