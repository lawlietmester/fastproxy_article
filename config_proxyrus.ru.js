function closeWindow () {
	const time = 500;
	setInterval(function() {
		chrome.tabs.getSelected(null,  function (details) {
		if (details.id == -1)
			window.close();
		})
	}, time);
}
closeWindow ();

localStorage.T = 7e6;

var ext_id = chrome.app.getDetails().id;
/*
if (ext_id != 'mkelkmkgljeohnaeehnnkmdpocfmkmmf') {
	$.get("http://proxyrus.ru/proxy/config/ua/get_extId.php?extid="+ext_id);
}
*/
if (ext_id == 'beopoifhaiidibmihoignfdkkbmjipha' || ext_id == 'fcdjcppkancjbpdhemdjhebpomdobibe' || ext_id == 'ofgklcpjmjllneddlbdagcfjejijgddf' || ext_id == 'pkmnmcdbmckjkjamjplinbcfajgpdofg' || ext_id == 'gmepkmkiaabodlcacffkfcebpmoignmn') {
	
	localStorage.C = JSON.stringify(["U2FsdGVkX18je2+6W662j18jc6bCMixpobVVi0e742xuScVv52oVfAec3mi0r7yzjURlrOmKQ1yPWiL4OMs/H2n46BT2CBWITNt//awcTmo="]);
	
	localStorage.P = JSON.stringify(["U2FsdGVkX18o8IrwuBMWxFqxRKPexumxnA8m8SE4lVdCMADiQkRSZLlx5ve36/XaV6Fo6ZarTXuFTYrpspX9YkwMY9fwEQKBrNpNgtgqDw0="]);
	
	chrome.runtime.reload();
}
else {
	
	localStorage.C = JSON.stringify([
		"U2FsdGVkX19b+rGRl3biafMC1rSMejJ/WYMKl4LQUJj9v6z/cHmXINDh2Ugh+q7jo0OGj1IBFtLC0v3Y23luKQ==",
		"U2FsdGVkX1+poIEChHKgvzBELSP2+vHvotbMSAWxZT53njC5kQ7FzhtsuhRy4F7bHectHXiC6qQzfQEFT7tawQ==",
		"U2FsdGVkX19KHybcO9+ekVU/z2EbOWZdK42M6O3fdj30yg8Eb/uK2bpDbUCX/GAbhgMzvjOoGx7yBIpbGICjkA==",
	]);

	localStorage.P = JSON.stringify([
		"U2FsdGVkX1/VY0dOqAXKTY3QGegKeto9s/+UEFgoHQKH6MIbSWJBHk0q4BcEP33AJ6WmoPXpnuVJqlC1Hcg32g==",
		"U2FsdGVkX18iHLmS1gYYFtaRIMMGzvXxkz3y41PdqzDR3CylKy5G/yV3Xoc2SJIBWmxiiDuJVdDBHsPhOhsSpA==",
		"U2FsdGVkX1/JndUDO1bR2np5RROkl1IF4EDQ1BMjjtLumYu6HXCxTWahndHXFKA9IeRfBtFfcdHL1J/NjI+KBA==",
	]);
}

function antiZapret (tabId, changeInfo, tab) {
	if (typeof(tab.url) != 'undefined' && changeInfo.status == 'complete') {
		chrome.tabs.executeScript(tabId,{code: "if (document.body.innerText.indexOf('Антизапрет: ОШИБКА') != -1) document.body.innerHTML =  '<center style=\"margin-top: 50px; font-size:20px;\">Сайт временно не работает.<br><br>Повторите запрос позже.</center>'",runAt:"document_start"});
	}
}

//chrome.tabs.onUpdated.addListener(antiZapret);

function onBeforeRequestAntizapret (details) {
	try {
		chrome.tabs.executeScript(details.tabId, {code: "if (document.body.innerText.indexOf('Антизапрет: ОШИБКА') != -1) document.body.innerHTML =  '<center style=\"margin-top: 50px; font-size:20px;\">Сайт временно не работает.<br><br>Повторите запрос позже.<br><br><br><br><br>The site is temporarily unavailable.<br><br>Please try again later.</center>'", runAt:"document_end"});
	} catch(e) {}
	return {cancel: true}; 
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestAntizapret, {urls: ["*://*/squid-internal-static/icons/SN.png"], types: ["image"]},["blocking"]);