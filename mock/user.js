import mockjs from 'mockjs';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { delay } from 'roadhog-api-doc';


// npm run start:no-mock  联调--当本地开发完毕之后，如果服务器的接口满足之前的约定，那么只需要关闭 mock 数据或者代理到服务端的真实接口地址即可。
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // eslint-disable-next-line consistent-return
  'POST /api/login': (req, res) => {
    const { password, loginId, type } = req.body;
    if (loginId === '7533524' && password === '123456') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
        authentication: 'lqf',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'admin' });
  },

  'GET /api/500': (req, res) => {
    res.status(500).send({
      status: 500,
      timestamp: Date.now(),
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: '李庆峰',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: '7533524@qq.com',
    signature: '海纳百川，有容乃大',
    title: '工程师',
    group: '洲博通－荣晶科技－产品技术部－高级前端工程师',
    tags: [
      {
        key: '0',
        label: '长得帅',
      },
      {
        key: '1',
        label: '身材好',
      },
      {
        key: '2',
        label: '专注设计',
      },
      {
        key: '3',
        label: '专注设计',
      },
      {
        key: '4',
        label: '大长腿',
      },
      {
        key: '5',
        label: '喜欢湖南妹子',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '广东省',
        key: '330000',
      },
      city: {
        label: '梅州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],

  // 'GET /api/kim': '你在干嘛',
  // 'GET /api/kim1': `1${[1, 2, 3]}${{ name: 'zhangsan' }}ok`,
  'GET /api/kim2': { name: 'zhangsan1' },
  'GET /api/kim3': (req, res) => {
    res.end('ok');
  },
  'GET /api/kim4': (req, res) => res.send({ name: 'zhangsan2' }),
  'GET /api/kim5': mockjs.mock({
    'list|1000': [{ name: '@city', 'value|1-1000': 0, 'type|0-2': 1, 'age|1-19': 20 }],
  }),
  'POST /api/users/create': (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  },
};


// export default delay(proxy, 1000); // 调用 delay 函数，统一处理
