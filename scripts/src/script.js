$(document).ready(function(){
	$("#result_bar").hide();
	$("#searchAgain").hide();
	
	
	//Starts if the "search" button is clicked
	$("#search").click(function(){
		$("#result_bar").fadeIn();
		$("#searchedTerms").fadeIn();
		$("#searchedTerms2").fadeIn();
		$("#search_bar").fadeOut();
		$("#tweets").fadeIn();
		$("#searchAgain").fadeIn();
	main();
	});
	
	
	//Starts if the "enter" key is pressed
	$("#term").keyup(function(e) {
		if(e.keyCode == "13") {
			$("#result_bar").fadeIn();
			$("#searchedTerms").fadeIn();
			$("#searchedTerms2").fadeIn();
			$("#tweets").fadeIn();
			$("#search_bar").fadeOut();
			$("#searchAgain").fadeIn();
			main();
			}
	});
});


function main () {


    //1. Create a spotter and get it to insert tweets into the DOM
	var term = $("#term").val();
	
	
	//Spotter
	var s = new Spotter("twitter.search",
		{q:term, period:120},
		{buffer:true, bufferTimeout:750}
		); 
		
	
	//Searches again
	$("#searchAgain").click(function(){
		$("#search_bar").fadeIn();
		$("#tweets").hide();
		$("#searchedTerms").hide();
		$("#searchedTerms2").hide();
		$("#searchAgain").hide();
		s.stop();
	});
	
	
	//Variables
	var count = 0;
	var tweetNumber = [] ;
	var resultsNumberHate = [];
	var resultsNumberLove = [];
	var term_count_love = 0;
	var term_count_hate = 0;


s.register(function(tweet){ 

	
	
	//2. Add profile images (tweet.profile_image_url)
	var profile_image = "<img src='"+tweet.profile_image_url+"' />";
	var user_name = tweet.from_user_name;
	var created_date = tweet.created_at;
	var dateParse = created_date.split(' ');  //created at format is Sun, 05 Feb 2012 19:40:51 +0000
	var day = dateParse[0];
	var time = dateParse[4];
	var color;
	var t_count = 0;
	count++;
	
	
	
	//5. Alternate the colors or the background of the tweets (create a variable that changes the css class of the tweet based on the order that it's coming in)
			if (count%2 === 0){
				color="backgroundColor";  //backgroundColor is defined in the css file
			} else{
				color="backgroundColor2"; //backgroundColor2 is defined in the css file
			}
	
	
	
	//Parses the tweet information from the Spotter
	var tweetReceived = $("<p class = '"+color+"'>"+profile_image+"&nbsp;"+user_name+"&nbsp;"+day+"&nbsp"+time+"<br />"+tweet.text+"</p>");
	
	    
		
		//6. Show a maximum of 10 tweets at a time (remove old tweets from the dom) (easiest way is to use arrays to create a cycle)
		if (tweetNumber.length >= 10) { //checks number of tweets against array size
			var p = tweetNumber.shift();  //moves to other end of array
			p.fadeOut(500, function() {  //fades out element of 500ms
			p.remove(); //removes it from array
			});
		};
		
	
	
	tweetNumber.push(tweetReceived); //pushes tweet to array
	tweetReceived.hide(); //hides from dom
	
	
	
	//3. Make the tweets occur so the most recent are at the top (check jquery documentation)
	$("#tweets").prepend(tweetReceived); //add it to the DOM, still invisible
		
				
				
				var results = $("<p> " + "Tweets about "+term+" with 'love': "+term_count_love+"</p>") ;
					if (resultsNumberLove.length >= 1) { 
						var q = resultsNumberLove.shift();  
						q.remove(); 
					};
				resultsNumberLove.push(results);
				results.hide();
				$("#searchedTerms2").prepend(results);
				results.show();

		
	
				var results2 = $("<p> " + "Tweets about "+term+" with 'hate': "+term_count_hate+"</p>") ;
					if (resultsNumberHate.length >= 1) { 
						var w = resultsNumberHate.shift();  
						w.remove(); 
					};
				resultsNumberHate.push(results2);
				results2.hide();
				$("#searchedTerms").prepend(results2);
				results2.show();
		
	
	
	//4. Make the tweets slide down (store temporarily in a jquery object, then apply slidedown)
	tweetReceived.slideDown(); 
		
	
	
	//Check to see if tweet has the word love or hate
	
	
		if(tweet.text.match(/love/i)) {
			term_count_love++;
		
		} else if(tweet.text.match(/hate/i)) {
			term_count_hate++;
			}
		});
	

	
	s.start(); //start the spotter   

}

