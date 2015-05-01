"use strict"

window.onload = init;

// Constants
var SEARCH_RIGHT = true;
var SEARCH_LEFT = true;
var SEARCH_UP = true;
var SEARCH_DOWN = true;
var SEARCH_UP_RIGHT = true;
var SEARCH_UP_LEFT = true;
var SEARCH_DOWN_RIGHT = true;
var SEARCH_DOWN_LEFT = true;

// Globals
var rows = [
	'O B M K A T A M A R I O C C S F T P H S',
	'S M G S W G B O J K O N U U R I I A J D',
	'T K H V O O N V X H O D L Z B E L S D O',
	'E D I E P O N A Z R E U D L N X E D B C',
	'V V Y E S M T I M N C I V E L A B P C B',
	'E O C X S B K A S O W B S O R E T S E W',
	'S U M I N A N X C T F R I E K P H B K R',
	'M S B S T D X S T G K B A R N V U A M I',
	'O V G U Y I G K H N B O O P D B V L D R',
	'M U P N E K T U P I H K P Y T M E S G M',
	'H M Z O G J T A F F N R Q L R U A R U A',
	'G L A R O F B R N F C R Z K S K R N G R',
	'L G W T J W I U C U A L A Y R N M E A K',
	'U Q J A B T A M B L X V A T L Y X V S H',
	'R O L P H R R L Y B K J E P T F X L J A',
	'E M M Y J O O Z K N F R V N T A E O E M',
	'A P Q I D E Z L N E V C A H G R R R L S',
	'V M Z R T G Z M I B R N U T A E A D I R',
	'E E O N Z I C G L A K S L E S K R P I F',
	'R M F A T P Z C B I Z D T A J O F S W S'
];

var wordSearch = [];

var words = ['BLINKY', 'SHINRA', 'RAPTURE', 'ANIMUS', 'FIREFLY', 'WALKERS', 'TARDIS', 'EPONA', 'CREEPER', 'AVENGER', 'PATRONUS', 'WESTEROS', 'IFRIT', 'ARKHAM', 'VAULT', 'CLAPTRAP', 'NORMANDY', 'REAVER', 'HEISENBERG', 'STARK', 'MORDOR', 'BIRDMAN', 'TITAN', 'OCULUS', 'GOOMBA', 'KATAMARI'];

function init() {
	
	// Setup Wordsearch
	for (var r = 0; r < rows.length; r++) {
		var row = rows[r].split(' ');
		wordSearch.push(row);
	}
	
	for (var r = 0; r < wordSearch.length; r++) {
		var row = wordSearch[r];
		$("#word-search").append($('<span></span>').attr("id", "word-search-row-"+r).addClass("word-search-row"));
		for (var c = 0; c < row.length; c++) {
			$("#word-search-row-"+r).append($('<span>'+wordSearch[r][c]+'</span>').addClass("word-search-col-"+c).addClass("word-search-text"));
		}
		$("#word-search-row-"+r).append("<br/>");
	}
	
	for (var w = 0; w < words.length; w++) {
		$("#words").append($("<span>"+words[w]+"</span>").addClass("word-search-word").addClass("no-select"));
	}
	
	// Setup Words
	$(".word-search-word").on("click", function(e){
		if ($(e.target).hasClass("word-search-word-disabled")) return;
		
		console.log("Finding \""+e.target.innerText+"\"...");
		
		if (findWord(e.target.innerText)) {
			console.log("Word found.");
			$(e.target).addClass("word-search-word-disabled").fadeTo('fast',0.5);
		}
		else {
			console.log("Word not in word search.");
		}
	});
}

// Return the letter at the given coordinates as a jQuery Object
function letterAt(row, col) {
	return $("#word-search-row-"+row+" > .word-search-col-"+col);
}

// Search through the word search in any approved direction for the word passed in
// Highlights word upon finding it
function findWord(word) {
	for (var r = 0; r < wordSearch.length; r++) { // For Each Row
		for (var c = 0; c < wordSearch[r].length; c++) { // For Each Column
			
			if (SEARCH_RIGHT) { // If we're searching in the right direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r];
					if (row) {
						var letter = row[c+index];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r, c+index).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_LEFT) { // If we're searching in the left direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r];
					if (row) {
						var letter = row[c-index];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r, c-index).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_UP) { // If we're searching in the up direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r-index];
					if (row) {
						var letter = row[c];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r-index, c).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_DOWN) { // If we're searching in the down direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r+index];
					if (row) {
						var letter = row[c];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r+index, c).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_UP_RIGHT) { // If we're searching in the up-right direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r-index];
					if (row) {
						var letter = row[c+index];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r-index, c+index).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_UP_LEFT) { // If we're searching in the up-left direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r-index];
					if (row) {
						var letter = row[c-index];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r-index, c-index).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_DOWN_RIGHT) { // If we're searching in the down-right direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r+index];
					if (row) {
						var letter = row[c+index];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r+index, c+index).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
			if (SEARCH_DOWN_LEFT) { // If we're searching in the down-left direction
				var bool = true;
				for (var index = 0; index < word.length && bool; index++) {
					var row = wordSearch[r+index];
					if (row) {
						var letter = row[c-index];
						if (!letter || letter != word[index]) bool = false;
					}
					else bool = false;
				}
				if (bool) {
					for (var index = 0; index < word.length; index++) {
						letterAt(r+index, c-index).addClass("word-search-highlight");
					}
					return true;
				}
			}
			
		}
	}
	return false;
}