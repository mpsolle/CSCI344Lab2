function main() {

    //1. Create a spotter and get it to insert tweets into the DOM
	var s = new Spotter("twitter.search",
		{q:"npr", period:120},
		{buffer:true, bufferTimeout:750}
		); 


	var count = 0;
	var tweetNumber = [] ;

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
		color="textColor";  //textColor is defined in the css file
	} else{
		color="textColor2"; //textColor2 is defined in the css file
	}

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

//4. Make the tweets slide down (store temporarily in a jquery object, then apply slidedown)

tweetReceived.slideDown(); //make it appear by sliding it down


});

s.start(); //start the spotter   
}

main();
