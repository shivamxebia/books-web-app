var arr1 = [1,2,3,4,5,6];
// var res = arr1.map((e)=>e*2);
Array.prototype.myFilter = function(callBackFunc){
    var arr = [];
    for(var i =0;i<this.length;i++){
        if(callBackFunc(this[i],i,this)){
            arr.push(this[i])
        }
    }
    return arr;
}

Array.prototype.myMap = function(callBackFunc){
    var arr = [];
    for(var i =0;i<this.length;i++){
        if(this[i]%2==0){
            arr.push(callBackFunc(this[i],i,this))
        }
    }
    return arr;
}

var result = arr1.myMap((e)=>e*2);
var filteredResult = arr1.myFilter((e)=>e%2==0);
console.log(result);
console.log(filteredResult);