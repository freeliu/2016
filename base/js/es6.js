/**
 * Created by Administrator on 2016/10/11.
 */
//1 let vs var
if(true)
{
    let a=1;
    var b=1;
}
console.log(a)//error
console.log(b);
// let限制变量作用域在当前块

let firstName='liu';
let lastName='rc';
// let firstName='li'; error let只能定义一次


//const 定义常量,不能改
const API_KEY='dsafdsafds'
// API_KEY=2//error