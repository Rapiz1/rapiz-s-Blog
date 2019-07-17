function change(foo) {
	var val = foo.firstChild.nodeValue;
	var title = foo.getAttribute('title');
	var dest=document.getElementById('pic');
	dest.setAttribute('src', val+'.jpg');
	dest.setAttribute('title', title);
	dest.setAttribute('alt', title);
	dest = document.getElementById('description');
	dest.innerHTML = title;
}
window.onload = function() {
	var lie = document.getElementsByTagName('li');
	for(var i = 0; i < lie.length; i++)
		lie[i].onclick = function () {change(this);}
}