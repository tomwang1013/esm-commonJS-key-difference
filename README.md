ES module和commonJS关键机制差异及其在处理循环引用时的差异

## commonJS

> node main.js
```
first time: undefined
count:  5
second time: undefined
```

### 解释

commonJS中require是exports的copy，且文件的解释执行是同步的：即require是一个同步动作，只有等被required的文件执行完之后才返回
require语句的下一条语句。`main.js` require `counter.js`，然后同步执行`counter.js`中的语句，这时候`main.js`中的`message`
是`undefined`。由于require是exports的copy，这个`message`变量始终是`undefined`，即使后来main中它的值变了

## ES module

> open index.html

```
Cannot access 'message' before initialization
```

### 解释

ES module中模块的解析分成三个步骤：

1. 模块引用图构造(construction)
   
   加载module file并构造module map
2. export和import初始化(initialization)
   
   将export和import的变量连接起来，即import和export指向相同的内存，这个使得export和import
   是**live link**，和commonJS不一样。注意：这个时候变量的值并没有初始化，这个是在下一阶段来做
3. 模块执行(evaluation)

   执行各个module的顶层代码，初始化所有export的变量(exported function的初始化在第二阶段就完成了)
   
这样，当我们在counter.js中引用main.js的message时就报错了，因为message还没有initialization。
但是在timeout之后就能取到值(得益于**live link**)

参考：

https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/