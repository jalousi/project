//HTML5本地存储只能存字符串，任何格式存储的时候都会被自动转为字符串
//stores.set('configer',CONFIGER,'obj');
//alert(stores.get('configer','obj').apihttp)
var store_local = null;//本地无时间限制存储
var store_locals = null;//本地session存储
var stores = null;//存储对象
if(window.localStorage){
    store_local = {
        'store':window.localStorage,
        'set':function(name,value,type){
            //this.store.del(name);
            if(type == 'obj' && typeof value == 'object'){
                value = JSON.stringify(value)
            }
            this.store.setItem(name,value);
        },
        'get':function(name,type){
            var temv = this.store.getItem(name);
            if(type == 'obj' && this.check(temv)){
                temv = JSON.parse(temv)
            }
            return temv;
        },
        'del':function(name){
            this.store.removeItem(name);
        },
        'clear':function(){
            this.store.clear();
        },
        //获取字段名称
        'key':function(i){
            return this.store.key(i);
        },
        'save':function(name,value){
            if(this.check(value)){
                this.set(name,value)
                return value
            }else{
                return this.store.getItem(name);
            }
            return this.store.getItem(name);
        },
        'check':function(data){
            if (data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false) {
                return false;
            } else {
                return true;
            }
        },
    };
}
if(window.sessionStorage){
    store_locals = {
        'store':window.localStorage,
        'set':function(name,value,type){
            //this.store.del(name);
            if(type == 'obj' && typeof value == 'object'){
                value = JSON.stringify(value)
            }
            this.store.setItem(name,value);
        },
        'get':function(name,type){
            var temv = this.store.getItem(name);
            if(type == 'obj' && this.check(temv)){
                temv = JSON.parse(temv)
            }
            return temv;
        },
        'del':function(name){
            this.store.removeItem(name);
        },
        'clear':function(){
            this.store.clear();
        },
        //获取字段名称
        'key':function(i){
            return this.store.key(i);
        },
        'save':function(name,value){
            if(this.check(value)){
                this.set(name,value)
                return value
            }else{
                return this.store.getItem(name);
            }
            return this.store.getItem(name);
        },
        'check':function(data){
            if (data == 'undefined' || data == undefined || data == "" || data == 0 || data == "0" || data == 'null' || data == null || data == 'false' || data == false) {
                return false;
            } else {
                return true;
            }
        },

    };
}
if(!store_local && !store_locals){
    alert('This browser does NOT support localStorage or sessionStorage');
}else if(store_local){
    stores = store_local;
}else if(store_locals){
    stores = store_locals;
}
/*
HTML5的本地存储，还提供了一个storage事件，可以对键值对的改变进行监听，使用方法如下：
 var storage = window.localStorage;
 function showStorage(){
 for(var i=0;i<storage.length;i++){
 //key(i)获得相应的键，再用getItem()方法获得对应的值
 document.write(storage.key(i)+ " : " + storage.getItem(storage.key(i)) + "<br>");
 }
 }
if(window.addEventListener){
    window.addEventListener("storage",handle_storage,false);
}else if(window.attachEvent){
    window.attachEvent("onstorage",handle_storage);
}
function handle_storage(e){
    if(!e){e=window.event;}
    //showStorage();
}
 对于事件变量e，是一个StorageEvent对象，提供了一些实用的属性，可以很好的观察键值对的变化，如下表：

 Property Type Description

 key String The named key that was added, removed, or moddified

 oldValue Any The previous value(now overwritten), or null if a new item was added

 newValue Any The new value, or null if an item was added

 url/uri String The page that called the method that triggered this change
*/

