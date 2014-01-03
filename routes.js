//成
var pageindex=require('./routes/index.js');

module.exports=function(app){
	app.get('/',pageindex.index);//首页
	app.get('/about',pageindex.about);//关于
	app.get('/response',pageindex.response);//关于
	app.post('/response',pageindex.response);//关于
	app.get('/cases',pageindex.cases);//关于
	app.get('/cases/:typeid',pageindex.cases);//关于
	app.get('/showcase',pageindex.showcase);//关于
	app.get('/product',pageindex.product);//产品
	app.get('/product/:typeid',pageindex.product);//产品
	app.get('/showproduct',pageindex.showproduct);//产品
}