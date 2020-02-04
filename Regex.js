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


var str = "[{duration=120, start_time=2020-11-19, community_ID=3, user_ID=23, type_ID=1, name=华为财经2020届招牌宣讲会, ID=5, point=4.0, status=1}]";
var reg = /[^\s^{^}^,^=^\[^\]]+/g;
console.log(str.match(reg));
