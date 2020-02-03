# activity_management 业务开发
### 准备工作
#### 跨域错误
产生跨域问题的罪魁祸首是浏览器同源策略，当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域，不同域之间的网络请求就会触发跨域问题。跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。
```js
ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
ctx.set('Access-Control-Allow-Methods', 'POST, GET');
ctx.set('Access-Control-Allow-Headers', 'x-custom, Content-Type');
// 允许 是否发送 cookie ... 凭证
ctx.set('Access-Control-Allow-Credentials', true);
```
后端设置上述响应消息头即可
#### axios的封装
在使用axios进行异步操作时，可能会遇到以下情况：
* 对一个按钮频繁点击，发送多次请求
* axios的规范写法中：`axios.post(url, data).then(res=>{}).catch(err=>{})`
复制代码这里我们发现我们每一次写的时候，都需要写.catch(err=>{}),会造成代码的冗余
>
所以可以使用拦截器来对axios进行封装，如下：
```js
// 对axios的封装
let fetch = axios.create({
    baseURL: 'http://127.0.0.1:8090', // 这里是后端服务器地址
    credentials: 'include',// 即便是跨域，也携带cookie
    timeout: 5000 // request timeout
})
// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        if (typeof (config.data) !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
            config.data = qs.stringify(config.data)
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
fetch.interceptors.response.use(response => {
    // 对响应数据做点什么
    // 把响应字符串转换成JSON数据格式（后端数据请求造的孽）
    var reg = /([\w-.]+)/g;
    var temp = response.data.replace(reg, '"$1"')
    var result = temp.replace(/=/g, ":")
    response.data = JSON.parse(result);
    return response;
}, error => {
    // 错误响应应该
    if (error.response) {
        if (error.response.status === 500) {
            console.log('服务器错误，请联系管理员处理')
        }
        return Promise.reject(error.response.data)
    } else {
        return Promise.reject(error)
    }
})
```
#### 数据结构不兼容，正则来解决
1. 多方原因导致后端传递过来的数据并不能直接使用，需要对数据进行处理，恰好可以在上述拦截器中使用，即对响应数据的处理。
2. 后端传递来的数据`[{duration=120, start_time=2019-12-19}]`。它并不是规范的JSON，无法使用JSON.parse来解析，需要经过一番处理变成`[{"duration":"120","start_time":"2019-12-19"}]`简单[学习](https://juejin.im/post/5965943ff265da6c30653879)之后，得到如下正则来处理
```js
var reg = /([\w-.]+)/g;
var temp = response.data.replace(reg, '"$1"')
var result = temp.replace(/=/g, ":")
response.data = JSON.parse(result);
```
>对上述正则的简单解释。用//包裹的表达式称为正则字面量，其中是对需要匹配的模式的一种描述。[abc]表示这一个字符可以选择a,b,c之一、\w是表示所有大小写字符数字和下划线、+是量词即形容出现的次数至少一次、最后一个g表示全局范围。$1表示正则中第一个小括号(最外面、最左边的是一)匹配到的内容，以此类推$2、$3,在千分位表示的面试题可以使用恰到好处。说明，replace函数的第二个参数可以是一个函数，参数表示所匹配到的字符串。
#### 使用Ant Design来搭页面,不支持（暂未按需加载）
1. 在返回的html中插入link标签，加载cdn的样式库`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css" >`
2. 安装、引入即可使用
> 并没有实现按需加载，觉得可以使用treeshaking
### 业务开发
#### 登录
1. 使用iconfont适量图标库中的图标
2. 图片、文件资源放在public目录下，资源路径`./`就是public目录
3. 输入框由ref监控，
```js
const userName = React.createRef();
const passWord = React.createRef();
// submit事件触发
onClick={()=>{
    // 接口请求参数对象
    let account = {
     userName:userName.current.state.value,
     passWord:passWord.current.state.value
    };
    verify(account).then(res => {
     if(res.data){
        // redux
        // 登录成功后把用户信息存储在store中去
        this.props.loginSuccess(res);
        console.log(this.props.user);
      }else{
        message.info('账号或者密码出错！')
      }
    })
}}
```
#### 主页
使用antd的tabs切换首页/活动/动态/我的
```js
<div>
  <Tabs defaultActiveKey="1" size="small  " tabPosition="bottom">
    <TabPane tab={<div className={styles.iconContain}><img src="./image/icon/shouye2.png" className={styles.icon} alt=""><span>首页</span></div>} key="1" forceRender >
      <HomePage {...this.props} />
    </TabPane>
    <TabPane  tab={<div className={styles.iconContain}><img src="./image/icon/huodong2.png" className={styles.icon} alt=""><span>活动</span></div>} key="2" forceRender >
      <HomePage {...this.props} />
    </TabPane>
    <TabPane tab={<div className={styles.iconContain}><img src="./image/icon/dongtai2.png" className={styles.icon} alt=""><span>动态</span></div>} key="3" forceRender >
      <HomePage {...this.props} />
    </TabPane>
    <TabPane tab={<div className={styles.iconContain}><img src="./image/icon/wode2.png" className={styles.icon} alt="" /><spa我的</span></div>} key="4" forceRender >
      <HomePage {...this.props} />
    </TabPane>
  </Tabs>
</div>
```
#### 引入的组件的样式并没有实现服务端渲染
原因是在renderToString的时候，传递的context这个钩子变量，并没有传递到引入的组件中，所以，原样传递获知只传staticContext也行
`
<HomePage {...this.props} />
`
## 活动举办前
### 活动申请
### 活动审核
### 活动上线
#### 设置签到员
#### 设置负责人   
## 活动进行中