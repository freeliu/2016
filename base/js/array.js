/**
 * Created by Administrator on 2016/10/9.
 */

//Mutation Methods 突变方法，数组自身会改变
var arr = ['a', 'c'];
//尾部插入数据
arr.push('d');
//尾部删除数据
arr.pop();
//头部删除数据
arr.shift();
// 头部插入数据
arr.unshift(1);
//删除数据，下标起点和个数。
arr.splice(0,1);
//升序
arr.sort();
//逆序
arr.sort(function (a,b) {
    return b-a;
})
//反转顺序
arr.reverse();

//非图标方法，不改变元素数组
// filter(), concat() and slice()
var people = [{name: 'liu', age: 15}, {name: 'li', age: 15}, {name: 'zhang', age: 15}]
var fil = people.filter(function (item) {
    return item.name.match(/l/)
})
var newPeople=[{name:'zhang',age:12},{name:'zhang1',age:13}];
var allpeople=people.concat(newPeople)
//获取数组片段，下标起点和终点
var subarr= allpeople.slice(0,1);