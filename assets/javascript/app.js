 var config = {
    apiKey: "AIzaSyCV3O_2YyzDKNKx5_JJ9dkPqCVtaFfLMCE",
    authDomain: "traintracker-8ac5e.firebaseapp.com",
    databaseURL: "https://traintracker-8ac5e.firebaseio.com",
    storageBucket: "traintracker-8ac5e.appspot.com",
    messagingSenderId: "293114073979"
  };
  firebase.initializeApp(config);

  	var database = firebase.database();

  	var trainName = "";
	var destination = "";
	var firstTrain = "";
	var convertedFirstTrain = 0;
	var frequency = "";
	var sinceFirst = 0;
	var sinceLast = 0;
	var minutesAway = 0;
	var nextArrival = "";
	var nextTrain = "";



$("#submit").on("click", function(event){

	event.preventDefault();

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	convertedFirstTrain = moment(firstTrain, "hh:mm").subtract(1, "years");
	frequency = $("#frequency").val().trim();
	sinceFirst = moment().diff(convertedFirstTrain, "minutes");
	sinceLast = sinceFirst % frequency;
	minutesAway = frequency - sinceLast;
	nextArrival = moment().add(minutesAway, "minutes");
	nextTrain = moment(nextArrival).format("hh:mm a");

	console.log(trainName);
	console.log(destination);
	console.log(convertedFirstTrain);
	console.log(frequency);
	
	console.log(sinceFirst);
	console.log(sinceLast);
	console.log(minutesAway);
	console.log(nextArrival);


	database.ref().push({
		trainName: trainName,
		destination: destination,
		// firstTrain: convertedFirstTrain,
		frequency: frequency,
		minutesAway: minutesAway,
		nextArrival: nextTrain,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");
});

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
	$(".table").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway +"</td></tr>");
})