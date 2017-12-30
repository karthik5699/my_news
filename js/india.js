

var india_articles = [];




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
	var xhr = createCORSRequest('GET',"https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=05a33d3d62c74c5884c50c024a3480cf");
	xhr.onload = function(){
		var data = xhr.responseText;
		json_data = JSON.parse(data);
		india_articles = json_data.articles;

		for(var i=0;i<india_articles.length;i++){
			var article = india_articles[i];


			$('#text-holder').append("<div class='article_title col-md-12'>"+'<a href="'+article.url+'" class="article-link">'+ article.title+"</a>"+"<div>");
			$('#text-holder').append('<img src="'+article.urlToImage+'" class="img-fluid col-md-6 article-img">');
			$('#text-holder').append('<p class="col-md-12 article-description">'+article.description+'</p>');
			$('#text-holder').append('<hr>');
		};

	}
	xhr.onerror = function(){
		console.log("error");
	}
	xhr.send();
}

makeCorsRequest();