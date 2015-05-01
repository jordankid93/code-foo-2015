"use strict"

window.onload = init;

var URL = "http://ign-apis.herokuapp.com";

function init() {
	console.log("Hello");
	$.ajax({
		url: URL+"/videos",
		success: function(data){
			console.log(data);
		}
	});
}