//成
var pageindex=require('./routes/index.js');
var config=require("./config/config.js")
var subpath=config.subpath;
module.exports=function(app){
	app.get('/',pageindex.index);//首页
	app.get(subpath+'/',pageindex.index);//首页
	
	app.get(subpath+'/news',pageindex.news);//新闻
	app.get(subpath+'/shownews',pageindex.shownews);//新闻

	app.get(subpath+'/knowledges',pageindex.knowledges);//知识讲座
	app.get(subpath+'/shownknowledges',pageindex.showknowledges);//知识讲座

	app.get(subpath+'/about',pageindex.about);//关于
	
	app.get(subpath+'/response',pageindex.response);//评论

	app.get(subpath+'/cases',pageindex.cases);//关于
	app.get(subpath+'/cases/:typeid',pageindex.cases);//关于
	app.get(subpath+'/showcase',pageindex.showcase);//关于
	app.get(subpath+'/product',pageindex.product);//产品
	app.get(subpath+'/product/:typeid',pageindex.product);//产品
	app.get(subpath+'/showproduct',pageindex.showproduct);//产品
}