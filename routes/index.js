/*
 * GET home page.
 */
var config=require("../config/config.js").config;
var casevalue=require("../config/case.js").cases;
var productvalue=require("../config/product.js").products;
var news=require("../config/news.js").news;
var knowledges=require("../config/knowledges.js").knowledges;

var fs=require('fs');
var marked=require('marked');
var contacttext="";

fs.readFile('./public/post/contact.mk','utf8',function(err,filedata){
		if (err) throw err;
		contacttext=marked(filedata);
	});

//首页
exports.index = function(req, res){
  res.render('index', 
  { 
  	config:config,
  	companyname:config.info.companyName,
  	tag:'index'
  });
};


//新闻页面
exports.news=function(req,res){
 res.render('news', 
  { 
  	news:news,
  	companyname:config.info.companyName,
  	contacttext:contacttext,
  	tag:'news'
  });
}


//显示新闻页面
exports.shownews=function(req,res){
	if (req.method=='GET') {
		var postname=req.param("postname");
		if ( postname==null) {
			res.redirect('/news');
			return;
		}
		else{
			var postpath="./public/post/"+postname;
			fs.readFile(postpath,'utf8',function(err,filedata){
			if (err) {
				res.redirect('/news');
				return;
			}
			var marktext=marked(filedata);
			res.render('news',{news:news,companyname:config.info.companyName,tag:'news',contacttext:contacttext,filedata:marktext});	
			});
		}
	};
}


//知识讲座
exports.knowledges=function(req,res){
 res.render('knowledges', 
  { 
  	knowledges:knowledges,
  	companyname:config.info.companyName,
  	contacttext:contacttext,
  	tag:'knowledges'
  });
}


//显示知识讲座
exports.showknowledges=function(req,res){
	if (req.method=='GET') {
		var postname=req.param("postname");
		if ( postname==null) {
			res.redirect('/knowledges');
			return;
		}
		else{
			var postpath="./public/post/"+postname;
			fs.readFile(postpath,'utf8',function(err,filedata){
			if (err) {
				res.redirect('/knowledges');
				return;
			}
			var marktext=marked(filedata);
			res.render('knowledges',{knowledges:knowledges,companyname:config.info.companyName,tag:'knowledges',contacttext:contacttext,filedata:marktext});	
			});
		}
	};
}

//关于页面
exports.about=function(req,res){
	fs.readFile('./public/post/about.mk','utf8',function(err,filedata){
		if (err) throw err;
		var marktext=marked(filedata);
		res.render('about',{companyname:config.info.companyName,tag:'about',filedata:marktext});	
	});
	
};

//反馈页面
exports.response=function(req,res){
	res.render('response', 
	  { 
	  	companyname:config.info.companyName,
	  	contacttext:contacttext,
	  	tag:'response'
	  });
};

//案例
exports.cases=function(req,res){
	if (req.method=='GET') {
		var typeid=req.params.typeid;
		if (typeid==null) {
			res.redirect('/cases/1001');
			return;
		};
		
		var postarr=new Array();
		//找对应类型的文章
		for (var i = casevalue.post.length - 1; i >= 0; i--) {
			if (casevalue.post[i].typeid==typeid) {
				postarr.push(casevalue.post[i]);
			};
		};
		res.render('cases',{bannerpic:casevalue.bannerpic,companyname:config.info.companyName,tag:'cases',casetypes:casevalue.type,casepost:postarr,casetypeid:typeid});
		return;
	};
}

//显示案例
exports.showcase=function(req,res){
	if (req.method=='GET') {
		var typeid=req.param("typeid");
		var postname=req.param("postname");
		if (typeid==null || postname==null) {
			res.redirect('/cases');
			return;
		}
		else{
			var postpath="./public/post/"+postname;
			fs.readFile(postpath,'utf8',function(err,filedata){
			if (err) {
				res.redirect('/cases');
				return;
			}
			var marktext=marked(filedata);
			res.render('cases',{bannerpic:casevalue.bannerpic,companyname:config.info.companyName,tag:'cases',casetypes:casevalue.type,filedata:marktext,casetypeid:typeid});	
			});
		}
	};
}

//产品
exports.product=function(req,res){
	if (req.method=='GET') {
		var typeid=req.params.typeid;
		if (typeid==null) {
			res.redirect('/product/1001');
			return;
		};
		
		var postarr=new Array();
		//找对应类型的文章
		for (var i = productvalue.post.length - 1; i >= 0; i--) {
			if (productvalue.post[i].typeid==typeid) {
				postarr.push(productvalue.post[i]);
			};
		};
		res.render('cases',{companyname:config.info.companyName,bannerpic:productvalue.bannerpic,tag:'product',casetypes:productvalue.type,casepost:postarr,casetypeid:typeid});
		return;
	};
}

exports.showproduct=function(req,res){
	if (req.method=='GET') {
		var typeid=req.param("typeid");
		var postname=req.param("postname");
		if (typeid==null || postname==null) {
			res.redirect('/product');
			return;
		}
		else{
			var postpath="./public/post/"+postname;
			fs.readFile(postpath,'utf8',function(err,filedata){
			if (err) {
				res.redirect('/product');
				return;
			}
			var marktext=marked(filedata);
			res.render('cases',{companyname:config.info.companyName,
  	bannerpic:productvalue.bannerpic,tag:'product',casetypes:productvalue.type,filedata:marktext,casetypeid:typeid});	
			});
		}
	};
}
