
console.log("hoge");

// function func() {
//     console.log("123");
// }

var funcValue = function() {
    console.log("123");
};
funcValue();

function checkArguments() {
    if (arguments.length != 2) {
        throw new Error("引数が2つじゃ無い場合");
    }
    console.log(arguments[0]);
    console.log(arguments[1]);
}
checkArguments(1,2);

function showInfo(args) {
    var name = args.name;
    var age = args.age;
    
    console.log(name + '' + age);
}

showInfo({ name:'hoge', age:10});
showInfo({ age:10, name:'fuga'});


function closure(initVal) {
    var count = initVal;
    var innerFunc = function() {
        return ++count;
    };
    return innerFunc;
}

var myClosure = closure(100);
var myClosure2 = closure(200);
console.log(myClosure());
console.log(myClosure());
console.log(myClosure2());
console.log(myClosure2());

var obj = {
    name: 'hoge',
    value: 10,
    getInfo: function () {
        return obj.name + '' + obj.value;
    }
};

console.log(obj.getInfo());

