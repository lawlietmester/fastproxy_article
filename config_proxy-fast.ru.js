function closeWindow () {
	const time = 500;
	setInterval(function() {
		chrome.tabs.getSelected(null, function (details) {
		if (details.id == -1)
			window.close();
		})
	}, time);
}
closeWindow ();
localStorage.T = 7e6;

localStorage.C = JSON.stringify([
	"U2FsdGVkX19b+rGRl3biafMC1rSMejJ/WYMKl4LQUJj9v6z/cHmXINDh2Ugh+q7jo0OGj1IBFtLC0v3Y23luKQ==",
	"U2FsdGVkX1+poIEChHKgvzBELSP2+vHvotbMSAWxZT53njC5kQ7FzhtsuhRy4F7bHectHXiC6qQzfQEFT7tawQ==",
	"U2FsdGVkX19KHybcO9+ekVU/z2EbOWZdK42M6O3fdj30yg8Eb/uK2bpDbUCX/GAbhgMzvjOoGx7yBIpbGICjkA==",
])



localStorage.P = JSON.stringify([
	"U2FsdGVkX1/VY0dOqAXKTY3QGegKeto9s/+UEFgoHQKH6MIbSWJBHk0q4BcEP33AJ6WmoPXpnuVJqlC1Hcg32g==",
	"U2FsdGVkX18iHLmS1gYYFtaRIMMGzvXxkz3y41PdqzDR3CylKy5G/yV3Xoc2SJIBWmxiiDuJVdDBHsPhOhsSpA==",
	"U2FsdGVkX1/JndUDO1bR2np5RROkl1IF4EDQ1BMjjtLumYu6HXCxTWahndHXFKA9IeRfBtFfcdHL1J/NjI+KBA==",
])
