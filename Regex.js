// // 方案一
// // var reg = /=/g;
// var reg = /}, {/g;
// var str1 = str.replace(reg, '"},{"');
// // console.log(str1);
// var reg1 = /, /g;
// var str2 = str1.replace(reg1, '", "');
// // console.log(str2);
// var reg2 = /\[{/g;
// var str3 = str2.replace(reg2, '[{"');
// // console.log(str3);
// var reg2 = /}\]/g;
// var str4 = str3.replace(reg2, '"}\]');
// // console.log(str4);
// var reg3 = /=/g;
// var str5 = str4.replace(reg3, '":"');
// // console.log(str5);
// var result = JSON.parse(str5);


// var num=1242343243;
// console.log(num.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1,'));

// // 方案二
// var reg = /[a-zA-Z0-9-_.]+/g;
// result = str.replace(reg, (str1)=>{
//   return '"'+str1+'"'
// })
// var result1 = result.replace(/=/g, ":")
// // console.log(result1);
// var result2 = JSON.parse(result1);
// console.log(result2)


// 方案三
// var str = '123zxc_.7589uuo_.789fiuio_.'
// var reg = /((\w+)(.?))/g;
// console.log(str.replace(reg, '$3*'))

// text
// // 1. 匹配颜色
// var test1 = /#[0-91-fA-F]{6}|#[0-91-fA-F]{3}/g;
// var string = "#ffbbad #Fc+01DF #FFFE #ffE";
// console.log(string.match(test1)); 
// // 2. 匹配时间
// var test2 = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/;
// console.log( test2.test("23:59") );
// console.log( test2.test("2:7") );
// // 3. 匹配日期
// var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
// console.log( regex.test("2017-06-10") );
// // 4. 匹配文件夹
// var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
// console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") );
// console.log( regex.test("F:\\study\\javascript\\regex\\") );
// console.log( regex.test("F:\\study\\javascript") );
// console.log( regex.test("F:\\") );
// // // 5. 匹配id
// // 从<div id="container" class="main"></div>中取出id="container"
// var test5 = /id="[^"]*"/
// var string = '<div id="container" class="main"></div>';
// console.log(string.match(test5)[0]);


// var str = "[]";
// var str = "[{duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, type_ID=11, name=华为财经HR与你畅聊职业规划, description=本次华为财务精英挑战赛决赛旨在提高学生针对经济管理实际问题进行案例分析从而解决实际问题的能力，培养大学生社会责任感，创新能力和实践能力。, ID=3, position=财税大楼205会议室, point=1.5, status=1}, {duration=120, start_time=2019-12-23, community_ID=2, user_ID=1, type_ID=6, name=ERP协会实战积分赛初赛, description=为了提高大家对与沙盘模拟比赛的认识和理解，为了宣扬沙盘文化，提高大家对沙盘模拟企业运营的兴趣，ERP协会举办了这次积分赛, ID=13, position=工商大楼416, point=3.0, status=2}, {duration=120, start_time=2019-12-23, community_ID=7, user_ID=1, type_ID=3, name=寻找最美江财人心理健康形象大使, description=长期以来，心理健康教育主要以咨询、讲座、宣传展等方式来帮助广大同学，但如今这些方式已不能满足广大同学的要求。心理学，应当用一种更加活泼的方式侧面的深入更多学生心中，相信有很多人在生活中不断提高自己对心理知识的把握和与人相处的心得，那么创建-个自我展示的平台也是十分有必要的，让更多人在比赛中、在组织比赛中、在观看比赛中体会到心理学的作用。 , ID=14, position=大学生创业孵化中心, point=2.0, status=2}, {duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, type_ID=3, name=大学生自律委员会迎新晚会, description=江西财经大学大学生自律委员会迎新晚会是大自委内部举行的一场联欢晚会，主要是为了迎接新生的到来，由每个部门一起承办和表演节目，既是对新加入大自委的成员的一种欢迎，也是对大自委工作一年以来的成果汇报。 , ID=15, position=蛟桥南区大活, point=3.0, status=2}, {duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, type_ID=2, name=大学生传媒联盟骨干培训, description=为了提高联盟学生记者素质，本期骨干培训邀请了马克思主义学院党委书记江水法老师前来讲解关于党宣工作相关知识。, ID=16, position=麦庐大活D311, point=9.0, status=2}, {duration=120, start_time=2019-12-12, community_ID=3, user_ID=1, type_ID=9, name=普通话推广主题活动, description=以大力弘扬爱国主义精神为根本目的；以立德树人、培育社会主义核心价值观为根本任务；以传承中国优秀传统文化、革命文化和社会主义先进文化为核心内容。, ID=2, position=蛟桥园南区201, point=2.0, status=1}, {duration=120, start_time=2019-11-22, community_ID=4, user_ID=1, type_ID=9, name=软件学院篮球杯决赛, description=为了发展我校大学生的体育运动，营造良好的体育运动文化氛围，以丰富多彩的运动形式，来展示我们大学生的良好的精神风貌，促进爱好台球竞技的新生之间的友谊，增进同学们对台球精神的认识和理解，以及推广这项富有趣味性、益智信的运动项目，故举办此次新生杯台球赛。 , ID=9, position=翼珍楼, point=5.0, status=3}, {type_ID=5, signed=0, description=本次活动由美国CCE认证全球职业规划师（GCDF)付姣老师担任主讲嘉宾，请各位同学按时到场。本次活动由美国CCE认证全球职业规划师（GCDF)付姣老师担任主讲嘉宾，请各位同学按时到场。 , point=4.0, duration=120, start_time=2020-11-19, community_ID=6, user_ID=1, activity_ID=5, name=华为财经2020届招牌宣讲会, ID=5, position=线上活动, status=1}, {type_ID=8, signed=1, description=为促进社员间和66爱好者对轮滑的了解，加强社团凝聚及团结合作，丰富社团活动内容，磨练轮滑爱好者们坚强的意志，顽强拼搏精神，在校内营造出阳关健康的生活氛围。, point=1.0, duration=120, start_time=2020-01-18, community_ID=12, user_ID=1, activity_ID=7, name=”轮聚你我，滑动青春“主题活动, ID=7, position=荟庐四楼报告厅, status=2}, {type_ID=1, signed=0, description=针对学院人才培养与专业培养方案，为帮助同学们早日认识社会、体验社会、适应社会，现号召国际学院全体17、18、19级同学参加社会实践活动。, point=2.0, duration=120, start_time=2019-12-19, community_ID=2, user_ID=1, activity_ID=1, name=2020年寒假社会实践活动, ID=1, position= 不限, status=7}, {type_ID=11, signed=1, description=华为公司集团财经是全球领先的专业性财务实践组织。伴随着华为公司30多年的成长，华为财经体系页不断发展壮大，目前业务已覆盖全球170多个国家和地球，人员规模超过8000人，承担着公司财务战略指定、经营管理驱动、财务风险控制等多个重要角色。华为公司集团财经是全球领先的专业性财务实践组织。伴随着华为公司30多年的成长，华为财经体系页不断发展壮大，目前业务已覆盖全球170多个国家和地球，人员规模超过8000人，承担着公司财务战略指定、经营管理驱动、财务风险控制等多个重要角色。 , point=4.0, duration=60, start_time=2019-12-06, community_ID=4, user_ID=1, activity_ID=4, name=团体辅导-无领导小组面试, ID=4, position=蛟桥园, status=2}, {type_ID=6, signed=1, description=寒假返校后，新媒体收集”思想进化论“寒假读书活动参与者读书心得并邀请院刊、学习部等学生组织和老师进行评奖。, point=3.0, duration=120, start_time=2019-12-06, community_ID=3, user_ID=1, activity_ID=6, name=”思想进化论”寒假读书活动, ID=6, position=荟庐H402, status=1}, {type_ID=9, signed=0, description=江西财经大学大学生自律委员会迎新晚会是大自委内部举行的一场联欢晚会，主要是为了迎接新生的到来，由每个部门一起承办和表演节目，既是对新加入大自委的成员的一种欢迎，也是对大自委工作一年以来的成果汇报。 , point=2.0, duration=120, start_time=2019-12-06, community_ID=7, user_ID=1, activity_ID=8, name=自律青春炫彩江财才子佳人汇江财, ID=8, position=荟庐, status=2}]"

// var str = "[{duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, type_ID=11, name=华为财经HR与你畅聊职业规划, description=本次华为财务精英挑战赛决赛旨在提高学生针对经济管理实际问题进行案例分析从而解决实际问题的能力，培养大学生社会责任感，创新能力和实践能力。, ID=3, position=财税大楼205会议室, point=1.5, status=1}, {duration=120, start_time=2019-12-23, community_ID=2, user_ID=1, type_ID=6, name=ERP协会实战积分赛初赛, description=为了提高大家对与沙盘模拟比赛的认识和理解，为了宣扬沙盘文化，提高大家对沙盘模拟企业运营的兴趣，ERP协会举办了这次积分赛, ID=13, position=工商大楼416, point=3.0, status=2}, {duration=120, start_time=2019-12-23, community_ID=7, user_ID=1, type_ID=3, name=寻找最美江财人心理健康形象大使, description=长期以来，心理健康教育主要以咨询、讲座、宣传展等方式来帮助广大同学，但如今这些方式已不能满足广大同学的要求。心理学，应当用一种更加活泼的方式侧面的深入更多学生心中，相信有很多人在生活中不断提高自己对心理知识的把握和与人相处的心得，那么创建-个自我展示的平台也是十分有必要的，让更多人在比赛中、在组织比赛中、在观看比赛中体会到心理学的作用。 , ID=14, position=大学生创业孵化中心, point=2.0, status=2}, {duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, type_ID=3, name=大学生自律委员会迎新晚会, description=江西财经大学大学生自律委员会迎新晚会是大自委内部举行的一场联欢晚会，主要是为了迎接新生的到来，由每个部门一起承办和表演节目，既是对新加入大自委的成员的一种欢迎，也是对大自委工作一年以来的成果汇报。 , ID=15, position=蛟桥南区大活, point=3.0, status=2}, {duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, type_ID=2, name=大学生传媒联盟骨干培训, description=为了提高联盟学生记者素质，本期骨干培训邀请了马克思主义学院党委书记江水法老师前来讲解关于党宣工作相关知识。, ID=16, position=麦庐大活D311, point=9.0, status=2}, {duration=120, start_time=2019-12-12, community_ID=3, user_ID=1, type_ID=9, name=普通话推广主题活动, description=以大力弘扬爱国主义精神为根本目的；以立德树人、培育社会主义核心价值观为根本任务；以传承中国优秀传统文化、革命文化和社会主义先进文化为核心内容。, ID=2, position=蛟桥园南区201, point=2.0, status=1}, {duration=120, start_time=2019-11-22, community_ID=4, user_ID=1, type_ID=9, name=软件学院篮球杯决赛, description=为了发展我校大学生的体育运动，营造良好的体育运动文化氛围，以丰富多彩的运动形式，来展示我们大学生的良好的精神风貌，促进爱好台球竞技的新生之间的友谊，增进同学们对台球精神的认识和理解，以及推广这项富有趣味性、益智信的运动项目，故举办此次新生杯台球赛。 , ID=9, position=翼珍楼, point=5.0, status=3}, {type_ID=5, signed=0, description=本次活动由美国CCE认证全球职业规划师（GCDF)付姣老师担任主讲嘉宾，请各位同学按时到场。, point=4.0, duration=120, start_time=2020-11-19, community_ID=6, user_ID=1, activity_ID=5, name=华为财经2020届招牌宣讲会, ID=5, position=线上活动, status=1}, {type_ID=8, signed=1, description=为促进社员间和66爱好者对轮滑的了解，加强社团凝聚及团结合作，丰富社团活动内容，磨练轮滑爱好者们坚强的意志，顽强拼搏精神，在校内营造出阳关健康的生活氛围。, point=1.0, duration=120, start_time=2020-01-18, community_ID=12, user_ID=1, activity_ID=7, name=”轮聚你我，滑动青春“主题活动, ID=7, position=荟庐四楼报告厅, status=2}, {type_ID=1, signed=0, description=针对学院人才培养与专业培养方案，为帮助同学们早日认识社会、体验社会、适应社会，现号召国际学院全体17、18、19级同学参加社会实践活动。, point=2.0, duration=120, start_time=2019-12-19, community_ID=2, user_ID=1, activity_ID=1, name=2020年寒假社会实践活动, ID=1, position= 不限, status=7}, {type_ID=4, signed=1, description=麦庐一食堂门口，经开区计生委员会，校医院与大学生红十字会进行校园防艾滋病宣传活动, point=1.5, duration=120, start_time=2019-12-19, community_ID=5, user_ID=1, activity_ID=11, name=红十字应急救护培养志愿者, ID=11, position=体法楼, status=2}, {type_ID=6, signed=1, description=寒假返校后，新媒体收集”思想进化论“寒假读书活动参与者读书心得并邀请院刊、学习部等学生组织和老师进行评奖。, point=3.0, duration=120, start_time=2019-12-06, community_ID=3, user_ID=1, activity_ID=6, name=”思想进化论”寒假读书活动, ID=6, position=荟庐H402, status=1}, {type_ID=9, signed=0, description=江西财经大学大学生自律委员会迎新晚会是大自委内部举行的一场联欢晚会，主要是为了迎接新生的到来，由每个部门一起承办和表演节目，既是对新加入大自委的成员的一种欢迎，也是对大自委工作一年以来的成果汇报。 , point=2.0, duration=120, start_time=2019-12-06, community_ID=7, user_ID=1, activity_ID=8, name=自律青春炫彩江财才子佳人汇江财, ID=8, position=荟庐, status=2}]"
var str = "[{type_name=社会实践, img=1, type_ID=1, community_name=羽毛球社, description=针对学院人才培养与专业培养方案，为帮助同学们早日认识社会、体验社会、适应社会，现号召国际学院全体17、18、19级同学参加社会实践活动。, point=2.0, duration=120, start_time=2019-12-19, community_ID=2, user_ID=3, name=2020年寒假社会实践活动, ID=1, position= 不限, status=7}, {type_name=文化熏陶, img=9, type_ID=9, community_name=乒乓球社, description=以大力弘扬爱国主义精神为根本目的；以立德树人、培育社会主义核心价值观为根本任务；以传承中国优秀传统文化、革命文化和社会主义先进文化为核心内容。, point=2.0, duration=120, start_time=2019-12-12, community_ID=3, user_ID=1, name=普通话推广主题活动, ID=2, position=蛟桥园南区201, status=1}, {type_name=职业规划, img=11, type_ID=11, community_name=学生会, description=本次华为财务精英挑战赛决赛旨在提高学生针对经济管理实际问题进行案例分析从而解决实际问题的能力，培养大学生社会责任感，创新能力和实践能力。, point=1.5, duration=120, start_time=2019-12-23, community_ID=6, user_ID=1, name=华为财经HR与你畅聊职业规划, ID=3, position=财税大楼205会议室, status=1}, {type_name=职业规划, img=11, type_ID=11, community_name=篮球社, description=华为公司集团财经是全球领先的专业性财务实践组织。伴随着华为公司30多年的成长，华为财经体系页不断发展壮大，目前业务已覆盖全球170多个国家和地球，人员规模超过8000人，承担着公司财务战略指定等重要角色。, point=4.0, duration=60, start_time=2019-12-06, community_ID=4, user_ID=24, name=团体辅导-无领导小组面试, ID=4, position=蛟桥园, status=2}, {type_name=学术讲座, img=5, type_ID=5, community_name=学生会, description=本次活动由美国CCE认证全球职业规划师（GCDF)付姣老师担任主讲嘉宾，请各位同学按时到场。, point=4.0, duration=120, start_time=2020-11-19, community_ID=6, user_ID=23, name=华为财经2020届招牌宣讲会, ID=5, position=线上活动, status=1}, {type_name=学科竞赛, img=6, type_ID=6, community_name=乒乓球社, description=寒假返校后，新媒体收集”思想进化论寒假读书活动参与者读书心得并邀请院刊、学习部等学生组织和老师进行评奖。, point=3.0, duration=120, start_time=2019-12-06, community_ID=3, user_ID=21, name=”思想进化论”寒假读书活动, ID=6, position=荟庐H402, status=1}, {type_name=体育健身, img=8, type_ID=8, community_name=轮滑社, description=为促进社员间和66爱好者对轮滑的了解，加强社团凝聚及团结合作，丰富社团活动内容，磨练轮滑爱好者们坚强的意志，顽强拼搏精神，在校内营造出阳关健康的生活氛围。, point=1.0, duration=120, start_time=2020-01-18, community_ID=12, user_ID=4, name=”轮聚你我，滑动青春“主题活动, ID=7, position=荟庐四楼报告厅, status=2}, {type_name=文化熏陶, img=9, type_ID=9, community_name=文艺社, description=江西财经大学大学生自律委员会迎新晚会是大自委内部举行的一场联欢晚会，主要是为了迎接新生的到来，由每个部门一起承办和表演节目，既是对新加入大自委的成员的一种欢迎，也是对大自委工作一年以来的成果汇报。, point=2.0, duration=120, start_time=2019-12-06, community_ID=7, user_ID=4, name=自律青春炫彩江财才子佳人汇江财, ID=8, position=荟庐, status=2}, {type_name=文化熏陶, img=9, type_ID=9, community_name=篮球社, description=为了发展我校大学生的体育运动，促进爱好台球竞技的新生之间的友谊，增进同学们对台球精神的认识和理解，以及推广这项富有趣味性、益智信的运动项目，故举办此次新生杯台球赛。, point=5.0, duration=120, start_time=2019-11-22, community_ID=4, user_ID=1, name=软件学院篮球杯决赛, ID=9, position=翼珍楼, status=3}, {type_name=志愿服务, img=4, type_ID=4, community_name=青协, description=在蛟桥网络信息管理中心门口面向全体师生进行志愿服务，主要提供技术质询、电脑维修等服务。, point=2.5, duration=120, start_time=2019-12-27, community_ID=5, user_ID=4, name=网络信息管理中心卡务志愿者, ID=10, position=麦庐大活, status=3}]";
var reg = /([^\s^{^}^, ^=^\[^\]]+)/g;
var temp = str.replace(reg, '"$1"')
var result = temp.replace(/=/g, ":")
console.log(JSON.parse(result))