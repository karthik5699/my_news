var json_data;
var marticles = [];
var search;
var searched_news_url;
var marticles2 = [];

function createCORSRequest(method,url){
	var xhr = new XMLHttpRequest();
	if("withCredentials" in xhr){
		xhr.open(method,url,true);
	}
	else if(typeof XDomainRequest!="undefined"){
		xhr = new XDomainRequest();
		xhr.open(method,url);
	}
	else{
		xhr = null;
	}
	return xhr;
}
function makeCorsRequest(){
	var xhr = createCORSRequest('GET',"https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=05a33d3d62c74c5884c50c024a3480cf");
	xhr.onload = function(){
		var data = xhr.responseText;
		json_data = JSON.parse(data);
		marticles = json_data.articles;

		
		for(var i=0;i<marticles.length;i++){
			var article = marticles[i];


			$('#text-holder').append("<div class='article_title col-md-12'>"+'<a href="'+article.url+'" class="article-link">'+ article.title+"</a>"+"<div>");
			$('#text-holder').append('<img src="'+article.urlToImage+'" class="img-fluid col-md-6 article-img">');
			$('#text-holder').append('<p class="col-md-12 article-description">'+article.description+'</p>');
		};
	}
	xhr.onerror = function(){
		console.log("error");
	}
	xhr.send();
}

makeCorsRequest();



	


function call_search(){
	
	$('.article_title').remove();
	$('.article-img').remove();
	$('.article-description').remove();
	$('.no-result').remove();
	search = $('#news-input').val();
	searched_news_url ="https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=05a33d3d62c74c5884c50c024a3480cf"+"&q="+search;
	var searched_articles;
	console.log(searched_news_url);
	var xhr2 = createCORSRequest('GET',searched_news_url);
	xhr2.onload = function(){
		var data = xhr2.responseText;
		json_data = JSON.parse(data);
		marticles2 = json_data.articles;
		if(marticles2.length>0){
		for(var i=0;i<marticles2.length;i++){
			var article = marticles2[i];

			$('#text-holder2').append("<div class='article_title col-md-12'>"+'<a href="'+article.url+'" class="article-link">'+ article.title+"</a>"+"<div>");
			$('#text-holder2').append('<img src="'+article.urlToImage+'" class="img-fluid col-md-6 article-img">');
			$('#text-holder2').append('<p class="col-md-12 article-description">'+article.description+'</p>');
			};
		}
		else{
			$('#text-holder2').append("<h4 class='no-result'> No Results Found </h4>");
		}
		
	}
	xhr2.onerror = function(){
		console.log("error");
	}
	xhr2.send();
	return false;
}

$('#news-search-form').submit(call_search);

 $('#nav-home').click(function(e){
 	e.preventDefault();
 	$('.article_title').remove();
 	$('.article-img').remove();
 	$('.article-description').remove();
 	$('.no-result').remove();
 	makeCorsRequest();



 })



