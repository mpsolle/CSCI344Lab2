$(document).ready(function(){
	$("#search").click(function(){
		$("#search_bar").fadeOut();
		$("#tweets").fadeIn();
	main();
	});
});

function main () {


    //1. Create a spotter and get it to insert tweets into the DOM
	var term = $("#term").val();
	var s = new Spotter("twitter.search",
		{q:term, period:120},
		{buffer:true, bufferTimeout:750}
		); 
		
	$("#searchAgain").click(function(){
		$("#search_bar").fadeIn();
		$("#tweets").remove();
		s.stop();
	});
	var term_count = 0;
	var t_count = 0;
	var count = 0;
	var tweetNumber = [] ;
	var statCount = [] ;

s.register(function(tweet){ 

	//2. Add profile images (tweet.profile_image_url)
	var profile_image = "<img src='"+tweet.profile_image_url+"' />";
	var user_name = tweet.from_user_name;
	var created_date = tweet.created_at;
	var dateParse = created_date.split(' ');  //created at format is Sun, 05 Feb 2012 19:40:51 +0000
	var day = dateParse[0];
	var time = dateParse[4];
	var color;
	count++;

	//5. Alternate the colors or the background of the tweets (create a variable that changes the css class of the tweet based on the order that it's coming in)
	if (count%2 === 0){
		color="backgroundColor";  //backgroundColor is defined in the css file
	} else{
		color="backgroundColor2"; //backgroundColor2 is defined in the css file
	}

	var tweetReceived = $("<p class = '"+color+"'>"+profile_image+"&nbsp;"+user_name+"&nbsp;"+day+"&nbsp"+time+"<br />"+tweet.text+"</p>");
	var tweetStats = $("<p> love =" +term_count+ " </p>");

	    //6. Show a maximum of 10 tweets at a time (remove old tweets from the dom) (easiest way is to use arrays to create a cycle)
		if (tweetNumber.length >= 10) { //checks number of tweets against array size
			var p = tweetNumber.shift();  //moves to other end of array
			p.fadeOut(500, function() {  //fades out element of 500ms
			p.remove(); //removes it from array
			});
		};
		
		if (statCount.length >= 1) { //checks number of tweets against array size
			var d = statCount.shift();  //moves to other end of array
			d.fadeOut(500, function() {  //fades out element of 500ms
			d.remove(); //removes it from array
			});
		};


	tweetNumber.push(tweetReceived); //pushes tweet to array
	tweetReceived.hide(); //hides from dom
 
 //3. Make the tweets occur so the most recent are at the top (check jquery documentation)
	$("#tweets").prepend(tweetReceived); //add it to the DOM, still invisible



//4. Make the tweets slide down (store temporarily in a jquery object, then apply slidedown)

	tweetReceived.slideDown(); //make it appear by sliding it down

//Check to see if tweet has the word love
if(tweet.text.match(/(^|\s)term($|\s)/)) {
//if(tweet.text.match(/love/i) || (tweet.text.match(/hate/i))) {	
//	alert("sup") ;
	term_count = term_count++;
	statCount = statCount++;
	}
	
	statCount.push(tweetStats);
	tweetStats.hide();
	$("#searchedTerms").prepend(tweetStats);
	tweetStats.slideDown() ;
});

s.start(); //start the spotter   
}