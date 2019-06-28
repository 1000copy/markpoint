function contentChange(html){
	localStorage.data = html
	// console.log(localStorage.data)
	var GuideList = document.getElementById("GuideList")
	var v = html
	GuideList.innerHTML = ''
	var a = getTitles(v)
	GuideList.innerHTML = guideList(a)
	onmarkdownchange(html)
}
function guideList(titles){
	var r = ''
	for (var i = 0; i < titles.length; i++) {
		var title = titles[i]
		var t = `<li><a href="#" onclick='clicktitle("${title}");return false;'>${title}</a></li>`
		r += t
	}
	return r
}
function getTitles(v){
	var pages = v.split("#")
	var results = []
	for (var i = 1; i < pages.length; i++) {
		var page = pages[i]
		results.push(page.split("\n")[0])
	}
	return results
}
function clicktitle(title){
	
	var markdown = document.getElementById("markdown")
	var start = markdown.value.indexOf(title)
	var end =  start + title.length
	markdown.focus()// 必须先设置焦点
	// markdown.selectionStart = start
	// markdown.selectionEnd = end
	markdown.setSelectionRange(start,end)
}
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
	if (e.data == 'message1'){
	// console.log('iframe loaded')
	}
},false);
function onmarkdownchange(html){
	
	
	// var markdown = document.getElementById('markdown')
	// var v = markdown.value // not same as previos line
	var v = html
	var frame = document.getElementById('myframe'); 
	frame.contentWindow.postMessage(v, '*');
}

function doClip(){
	var markdown = document.getElementById("markdown")
	copyStringToClipboard(markdown.value)
	alert('copied into clipboard')
}
function copyStringToClipboard (str) {
	// Create new element
	var el = document.createElement('textarea');
	// Set value (string to be copied)
	el.value = str;
	// Set non-editable to avoid focus and move outside of view
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	// Select text inside element
	el.select();
	// Copy text to clipboard
	document.execCommand('copy');
	// Remove temporary element
	document.body.removeChild(el);
}
var t = {}
t.cm = document.getElementById("markdown")
function dobold(){
	insertText(t.cm,"****")
	back(t.cm,2)
}
function doitalic(){
	insertText(t.cm,"**")
	back(t.cm,1)
}
function dounderline(){
	insertText(t.cm,"____")
	back(t.cm,2)
}
function dostrikethrough(){
	insertText(t.cm,"~~~~")
	back(t.cm,2)
}
function dolink(){
	insertText(t.cm,"[]()")
	back(t.cm,1)
}
function doimage(){
	insertText(t.cm,"![]()")
	back(t.cm,1)
}
function doul(){
	insertText(t.cm,"\n* ")
	back(t.cm,0)
}
function dool(){
	insertText(t.cm,"\n1. ")
	back(t.cm,0)
}
function doquote(){
	insertText(t.cm,"\n> ")
	back(t.cm,0)
}
function insertText(cm,data) {
	typeInTextarea(cm,data)
}
function typeInTextarea(el, newText) {
	var start = el.selectionStart
	var end = el.selectionEnd
	var text = el.value
	var before = text.substring(0, start)
	var after  = text.substring(end, text.length)
	el.value = (before + newText + after)
	el.selectionStart = el.selectionEnd = start + newText.length
	el.focus()
}
function back(cm,i){
	cm.selectionStart -= i
	cm.selectionEnd = cm.selectionStart
}
function dopdf(){
	// var markdown = document.getElementById('markdown')
	// var v = markdown.value // not same as previos line
	// var data = {age: 10};
	// localStorage.data = JSON.stringify(data);
	// https://stackoverflow.com/questions/31315327/how-to-make-sure-that-a-popup-window-is-fully-loaded-when-using-postmessage-api
	localStorage.data = t.cm.value
	// localStorage.setItem('pdf',t.cm.getValue())
	// console.log('pdf',t.cm.getValue())
	var url = 'markpoint.html?print-pdf'
	var w = window.open(url)
}
function doplay(){
	// var markdown = document.getElementById('markdown')
	// var v = markdown.value // not same as previos line
	// var data = {age: 10};
	// localStorage.data = JSON.stringify(data);
	// https://stackoverflow.com/questions/31315327/how-to-make-sure-that-a-popup-window-is-fully-loaded-when-using-postmessage-api
	localStorage.data = t.cm.value
	// localStorage.setItem('pdf',t.cm.getValue())
	var url = 'markpoint.html'
	var w = window.open(url)
}
function doAbout(){
	alert('By ChenCat')
}
// t.cm.on('change', function () {
t.cm.onkeypress = function(){
	html = t.cm.value
	// console.log(html)
	contentChange(html)
}
if (localStorage.data){
	// console.log('localStorage')
	html = localStorage.data
	// t.cm.setValue(html)
	t.cm.value = html
}
else{
	html = t.cm.getValue();
}
// html = t.cm.value
// contentChange(html)
t.cm.onkeypress()
if (!t.cm.value){
	// return
	t.cm.value =`# This is an H1
	# This is an url
	
	[google](http://google.com)
	![](https://via.placeholder.com/150)
	
	
	# This is an img
	
	![](https://via.placeholder.com/150)
	
	
	# This is an font
	**bold**
	~~bold~~
	
	# This is an bullet
	
	- 1
	- 2
	- 3
	
	
	# This is an bullet 2
	
	* 1
	* 2
	* 3
	
	# that is all folks`
}