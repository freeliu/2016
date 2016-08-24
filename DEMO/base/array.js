// JavaScript source code
//数组出入栈
function Print(num, arr)
{
    if (!num) { return }
    console.log(num)
    Print(arr.shift(), arr);
}
Print(arr.shift(), arr);

//数组包含
  var arr = ["a", "b", "c"];
        Array.prototype.in_array = function (e) {
            for (i = 0; i < this.length; i++) {
                if (this[i] == e)
                    return true;
            }
            return false;
        }
        alert(arr.in_array(""))
