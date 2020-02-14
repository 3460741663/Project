var Koa = require('koa');
var Router = require('koa-router');
 
var app = new Koa();
var router = new Router({
  prefix: '/mapi'
});
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "X-custom, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  // ctx.set("Access-Control-Max-Age", 1000 * 60 * 60);
  await next();
})
router.get('/islogin', (ctx, next) => {
  const login = ctx.cookies.get('login');
  if (login) {
    ctx.body = {
      islogin: true
    }
  } else {
    ctx.body = {
      islogin: false
    }
  }
});
router.get('/login', (ctx, next) => {
  ctx.cookies.set('login', true, {
    maxAge: 1000 * 60 * 60 * 24
  })
  ctx.body = {
    data: true
  }
});
router.get('/logout', (ctx, next) => {
  ctx.cookies.set('login', '')
  ctx.body = {
    data: true
  }
});
router.get('/comment', (ctx, next) => {
  ctx.body = '{"result":[{"title":"教育部:疫情期间暂停高校现场招聘","content":"其次,大力开拓就业渠道。实施特岗教师计划、<em>大学</em>生村官、三支一扶、<em>大学</em>生志愿服务西部计划等基层项目。鼓励<em>大学</em>生参军入伍,落实基层就业学费资助等优惠政策,鼓励毕业生到基层就业、创业。建立校企合作对接平台,在重点区域、重大工程、重大项目、重要领域加强人才供需对...","img_width":"","full_title":"教育部:疫情期间暂停高校现场招聘","pdate":"27分钟前","src":"长城网","img_length":"","img":"","url":null,"pdate_src":"2020-02-13 10:56:20"},{"title":"北京高校确定停课不停学时间:最早2月17日开课","content":"中国青年报客户端北京2月13日电(中青报·中青网记者 樊未晨)记者今天从北京市教委获悉,为落实教育部的相关要求,做好<em>高校</em>疫情防控工作,做好线上授课和线上学习等在线教学活动准备,努力在疫情防控期间实现 停课不停教、停课不停学 。截至目前,北京66所本科<em>高校</em>已制定较为完善...","img_width":"","full_title":"北京高校确定停课不停学时间:最早2月17日开课","pdate":"41分钟前","src":"中国青年网","img_length":"","img":"","url":null,"pdate_src":"2020-02-13 10:42:02"},{"title":"停课不停学 华东理工大学发布上海高校首个本科生在线教学实施细则","content":"新民晚报讯(记者 张炯强)停课不停学,昨天,华东理工<em>大学</em>发布了本科生在线教学实施细则,根据课程性质进行分类指导,并围绕课程平台、教学要求以及教学准备与安排等制定实施细则,以保障教师在疫情防控期间在线教学顺利开展。这是上海首个发布学生在线教育细则的<em>高校</em>。","img_width":"334","full_title":"停课不停学 华东理工大学发布上海高校首个本科生在线教学实施细则","pdate":"3小时前","src":"新浪","img_length":"600","img":"http://p4.qhimg.com/t01de2e0594c5a897c8.jpg","url":null,"pdate_src":"2020-02-13 08:35:00"},{"title":"我省高校附属医院7集体14个人在抗击新冠肺炎疫情表现突出被通报表扬","content":"2月10日,省卫健委和省新型冠状病毒感染肺炎疫情防控应急综合指挥部办公室印发《关于给予全省卫生健康系统抗击新冠肺炎疫情表现突出集体和个人表扬的通报》,通报表扬 31个单位和76名同志。其中,我省<em>高校</em>附属医院7个集体和14个个人榜上有名。 通报指出,自我省发生新冠肺炎...","img_width":"","full_title":"我省高校附属医院7集体14个人在抗击新冠肺炎疫情表现突出被通报表扬","pdate":"28分钟前","src":"安青网","img_length":"","img":"","url":null,"pdate_src":"2020-02-13 10:55:50"}],"error_code":0,"reason":"Succes"}'
})
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3003, () => {
  console.log('run port 3003')
})
