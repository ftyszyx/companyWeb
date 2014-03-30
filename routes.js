//成
var pageindex=require('./routes/index.js');

module.exports=function(app){
	app.get('/',pageindex.index);//首页
	
	app.get('/news',pageindex.news);//新闻
	app.get('/shownews',pageindex.shownews);//新闻

	app.get('/knowledges',pageindex.knowledges);//知识讲座
	app.get('/shownknowledges',pageindex.showknowledges);//知识讲座

	app.get('/about',pageindex.about);//关于
	
	app.get('/response',pageindex.response);//评论

	app.get('/cases',pageindex.cases);//关于
	app.get('/cases/:typeid',pageindex.cases);//关于
	app.get('/showcase',pageindex.showcase);//关于
	app.get('/product',pageindex.product);//产品
	app.get('/product/:typeid',pageindex.product);//产品
	app.get('/showproduct',pageindex.showproduct);//产品
}