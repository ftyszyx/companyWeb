
/*
 * GET home page.
 */
var config=require("../config.js").config;
var fs=require('fs');
var marked=require('marked');
var nodemailer=require('nodemailer')
var casevalue=require("../case.js").cases;
var productvalue=require("../product.js").products;

//首页
exports.index = function(req, res){
  var textrow=config.content.length/3;
	if(config.content.length%3>0){
		textrow++;
	}
  res.render('index', 
  { 
  	companyname:config.info.companyName,
  	companyweb:config.info.website,
  	textarr: config.content ,
  	textrow:textrow,
  	tag:'index'
  });
};

//关于页面
exports.about=function(req,res){
	fs.readFile('./public/post/post3.mk','utf8',function(err,filedata){
		if (err) throw err;
		var marktext=marked(filedata);
		res.render('about',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'about',filedata:marktext});	
	});
	
};

//反馈页面
exports.response=function(req,res){

	if (req.method=='GET') {
		console.log('get req');
		res.render('response',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'response'});
	}else if(req.method=='POST'){
		console.log('getpost');
		//检查格式 
		var name=req.body.name.trim();
		var companyname=req.body.companyname.trim();
		var telepone=req.body.telepone.trim();
		var email=req.body.e_mail.trim();
		var text=req.body.text.trim();

		if (name==''||companyname==''||text==''||telepone==''||email=='') {
			res.render('response',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'response',warning:'信息不完整.请重新输入'});
			return;
		};
		//验证格式 
		var regstring=/^(.+)@(.+)$/;
		if (email.match(regstring)==null) {
			res.render('response',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'response',warning:'邮箱地址格式错误.请重新输入'});
			return;
		};
		regstring=/^\d{11}$/;
		if (telepone.match(regstring)==null) {
			res.render('response',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'response',warning:'手机号码格式错误.请重新输入'});
			return;
		};

		//发送邮件
		var smtpTransport=nodemailer.createTransport("SMTP",{
			service:"QQ",
			auth:{
				user:config.info.mailfrom,
				pass:config.info.mailfrompassword
			}
		});
		var mailoptions={
			from:config.info.mailfrom,
			to:config.info.mailto,
			subject:"用户回馈",
			text:"",
			html:"\r\nname:"+name+",telephone:"+telepone+",companyname:"+companyname+",email:"+email+",text:"+text
		}
		smtpTransport.sendMail(mailoptions,function(err,response){
			if(err){
				console.log(err);
				res.render('response',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'response',sucess:'提交失败，请重试！'});
			}else{
				//console.log("message sent:"+response.message);
				res.render('response',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'response',sucess:'提交成功，我们会尽快回复！'});
			}
		});
		return;
	}
}

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
		res.render('cases',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'cases',casetypes:casevalue.type,casepost:postarr,casetypeid:typeid});
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
			if (err) throw err;
			var marktext=marked(filedata);
			res.render('showcase',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'cases',casetypes:casevalue.type,filedata:marktext,casetypeid:typeid});	
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
		res.render('cases',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'product',casetypes:productvalue.type,casepost:postarr,casetypeid:typeid});
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
			if (err) throw err;
			var marktext=marked(filedata);
			res.render('showcase',{companyname:config.info.companyName,
  	companyweb:config.info.website,tag:'product',casetypes:productvalue.type,filedata:marktext,casetypeid:typeid});	
			});
		}
	};
}