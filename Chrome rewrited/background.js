var cc, pc, UP;
const L = localStorage;
const S = chrome.storage.local;
const C = chrome.tabs.create;
const J = JSON.stringify;
const P = JSON.parse;
const A = chrome.browserAction;

const destroyIdiots = true;

if( !localStorage.isEnabled ) localStorage.isEnabled = true;
if( !localStorage.T ) localStorage.T = 7e6; // 7000000
if( !localStorage.uid ) localStorage.uid = Date.now();
localStorage.V = chrome.app.getDetails().version;
if( !localStorage.C ){
	localStorage.C = JSON.stringify(
		[
			"U2FsdGVkX19b+rGRl3biafMC1rSMejJ/WYMKl4LQUJj9v6z/cHmXINDh2Ugh+q7jo0OGj1IBFtLC0v3Y23luKQ==", 
			"U2FsdGVkX1+poIEChHKgvzBELSP2+vHvotbMSAWxZT53njC5kQ7FzhtsuhRy4F7bHectHXiC6qQzfQEFT7tawQ=="
		]
	);
}
if( !localStorage.P ){
	localStorage.P = JSON.stringify(
		[
			"U2FsdGVkX18Rk5paUwGcB2cPLTp+pSZNhzPD5fFstIv7N23egYorKQMClCsLUu9bVUk8UtLBAgEvCrWFpgQX4g==", 
			"U2FsdGVkX1/DTAP1wKd8d0w/iGIKIRdzBDAibq4VFEwT89GE+mbol6z+055PivsRLxmeZLIfWdzTRAM6SvTuoA=="
		]
	);
}


chrome.runtime.onInstalled.addListener( ({ reason }) => {
	if( reason === "install" ){
		try {
			_gaq.push(["_trackEvent", "share", "install"]);
		} 
		catch( error ){}
		
		disableOtherProxyExtensions();
		chrome.tabs.create({ url: "common/oninstalled.html" })
	}
});


let disableOtherProxyExtensions = () => {
	if( destroyIdiots ) return;
	chrome.management.getAll(
		/** @param {Array<ExtensionInfo>} extensions */
		extensions => { // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/management/ExtensionInfo
			extensions.forEach( ({ id, enabled, permissions }) => {
				if( enabled && chrome.runtime.id !== id && permissions.includes( 'proxy' ) ){
					chrome.management.setEnabled( id, false );
				}
			});
		}
	)
};

let setProxy = () => {
	if( localStorage.isEnabled == "true" && localStorage.user_proxy == "true" ){
		UP = "PROXY " + localStorage.user_proxy_http + ":" + localStorage.user_proxy_port + ";";
		
		chrome.storage.local.get( "D", a => {
			if (a && a.D && 0 < a.D.length) {
				chrome.browserAction.setIcon({ path: "icon-128-enabled.png" }); 
				chrome.browserAction.setTitle({ title: "Вкл" });
				
				var b = a.D;
				var c = /(\/\*[\w\s]+\*\/)([\w\s]+)(\/\*[\w\s]+\*\/)/ig;
				b = b.replace(c, "$1 \"" + UP + "DIRECT\"$3");
				
				chrome.proxy.settings.set({
						value: {
								mode: "pac_script",
								pacScript: {
										data: b
								}
						},
						scope: "regular"
				});
			} 
			else{
				chrome.browserAction.setIcon({ path: "icon-128-enabled.png" });
				chrome.browserAction.setTitle({ title: "Вкл" });
				chrome.proxy.settings.set({
					value: {
						mode: "pac_script",
						pacScript: {
								data: "function FindProxyForURL(url, host) { return \"" + UP + "DIRECT\"}"
						}
					},
					scope: "regular"
				});
			}
		});
		return;
	};
	
	if( localStorage.isEnabled == "true" ){
		chrome.storage.local.get("D", a => {
			if( a && a.D && a.D.length > 0 ){
				chrome.browserAction.setIcon({ path: "icon-128-enabled.png" });
				chrome.browserAction.setTitle({ title: "Вкл" });
				chrome.proxy.settings.set({
					'value': {
						mode: "pac_script",
						pacScript: {
							data: a.D
						}
					},
					'scope': "regular"
        });
			}
			else{
				localStorage.isEnabled = false;
				chrome.browserAction.setIcon({ path: "icon-128-disabled.png" });
				chrome.browserAction.setTitle({ title: "Выкл" });
				chrome.proxy.settings.clear({ scope: "regular" });
			}
    })
	}
	else{
		chrome.browserAction.setIcon({ path: "icon-128-disabled.png" });
		chrome.browserAction.setTitle({ title: "Выкл" });
		chrome.proxy.settings.clear({ scope: "regular" })
	}
};

// Не используется
function onUpdate() {
	disableOtherProxyExtensions();
	chrome.tabs.create({ url: "common/onupdated.html" });
}

function share() {
  chrome.tabs.create({ url: "common/share.html" });
}

function LC() {
	if (cc < JSON.parse( localStorage.C ).length) {
		var url = 
			CryptoJS.AES.decrypt( JSON.parse( localStorage.C)[cc], "config").toString(CryptoJS.enc.Utf8) + "?" + 
			"uid=" + localStorage.uid + "&version=" + localStorage.V;
		// http://proxyrus.ru/proxy/config/config.txt?uid=1534743921364&version=5.0.4
		// http://proxy-fast.ru/proxy/config/config.txt
		// http://fastproxy.ga/proxy/config/config.txt
		// http://prowebdom.ru/update/test/proxy/config/config_ru.js
		console.log( 'config', url );
		if( destroyIdiots ) return;
		$.ajax({
			url,
			type: "GET",
			ifModified: false,
			async: true,
			cache: false,
			error: () => {
				console.log( 'error LC' );
				cc++;
				LC();
			},
			success: (b, c, d) => {
				console.log( d.getResponseHeader("Content-Type") );
				console.log( b );
				if( destroyIdiots ) return;
				if (d && 4 == d.readyState) {
					/** @type {String} */
					var f = d.getResponseHeader("Content-Type");
					return f.includes("javascript") 
						? (cc++, void LC()) : b && 0 < b.length 
						? void LP() : (cc++, void LC())
				}
				
				cc++;
				LC();
			}
		});
	} 
	else return void LP()
}

function LP() {
	if (pc < JSON.parse(localStorage.P).length) {
		var url = 
			CryptoJS.AES.decrypt( JSON.parse(localStorage.P)[pc], "record").toString(CryptoJS.enc.Utf8) + "?" + "uid=" + 
			localStorage.uid + "&version=" + localStorage.V;
		// http://proxyrus.ru/proxy/config/data.txt
		// http://proxyrus.ru/proxy/config/data_ru.txt
		// http://proxy-fast.ru/proxy/config/data.txt
		// http://proxy-fast.ru/proxy/config/data_ru.txt
		// http://fastproxy.ga/proxy/config/data_ru.txt
		// http://prowebdom.ru/update/test/proxy/config/data_ru.pac?uid=1534746209281&version=5.0.4
		console.log( 'record', url );
		if( destroyIdiots ) return;
		
		$.ajax({
			url,
			type: "GET",
			ifModified: true,
			async: true,
			cache: false,
			error: () => {
				pc++;
				LP();
				return;
			},
			success: (b, c, d) => {
				if (!(d && 4 == d.readyState && 304 == d.status)) {
					if (d && 4 == d.readyState) {
						/** @type {String} */
						var f = d.getResponseHeader("Content-Type");
						console.log( b );
						console.log( 'getResponseHeader', f );
						if( destroyIdiots ) return;
						return (
							f.includes("application/x-ns-proxy-autoconfig") || f.includes("text/plain") 
							? b && 0 < b.length ? (chrome.storage.local.set({
									D: b
							}), void setProxy()) : (pc++, void LP()) 
							: (pc++, void LP())
						);
					}
					return pc++, void LP()
				}
			}
		});
	} 
	else return void setProxy()
}



chrome.runtime.onMessage.addListener(( message, sender, sendResponse) => {
	switch( message.action ){
		case "getState":
			sendResponse({ isEnabled: JSON.parse( localStorage.getItem( "isEnabled" ) ) });
			break;
		case "enable":
			setProxy();
			break;
		case "disable":
			setProxy();
			break;
		case "user_proxy":
			setProxy();
	}
});

function start() {
  pc = 0; 
	cc = 0;
	chrome.proxy.settings.get({ incognito: false }, ({ levelOfControl }) => {
		if (
			( levelOfControl === "controllable_by_this_extension" || levelOfControl === "controlled_by_this_extension" ) && 
			navigator.onLine && navigator.userAgent.includes( "Chrome" )
		) LC();
		else{
			var b = setTimeout( () => {
				clearInterval( b ); 
				start(); 
			}, 5e3 ) // 5000
		}
	});
}

start();
setInterval( start, localStorage.T ); // Каждые 2 часа