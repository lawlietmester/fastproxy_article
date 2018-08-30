const PROXY_STRING = "HTTPS proxy.antizapret.prostovpn.org:3143; PROXY proxy.antizapret.prostovpn.org:3128; HTTPS uk22.postls.com:443; HTTPS nl15.postls.com:443; DIRECT";
const PROXY_MASK = "PROXY ccahiha.antizapret.prostovpn.org:3128; HTTPS uk19.postls.com:443; HTTPS nl10.postls.com:443; DIRECT";
const PROXY_GLOBAL = "HTTPS nl12.postls.com:443; HTTPS nl20.postls.com:443; HTTPS nl15.postls.com:443; HTTPS nl37.postls.com:443; DIRECT";
const ARRAY_PROXY_NL = ["HTTPS nl1.postls.com:443;", "HTTPS nl2.postls.com:443;", "HTTPS nl3.postls.com:443;", "HTTPS nl4.postls.com:443;", "HTTPS nl5.postls.com:443;", "HTTPS nl6.postls.com:443;", "HTTPS nl7.postls.com:443;", "HTTPS nl8.postls.com:443;", "HTTPS nl9.postls.com:443;", "HTTPS nl10.postls.com:443;", "HTTPS nl11.postls.com:443;"];
const PROXY_UK = "HTTPS uk3.postls.com:443; HTTPS uk22.postls.com:443; HTTPS uk11.postls.com:443; HTTPS uk17.postls.com:443; DIRECT";
const PROXY_NL = ARRAY_PROXY_NL[Math.floor(Math.random() * ARRAY_PROXY_NL.length)] + PROXY_GLOBAL;
const PROXY_FR = "PROXY 137.74.150.79:443; HTTPS uk11.postls.com:443; HTTPS uk17.postls.com:443; DIRECT";
const PROXY_SG = "HTTPS sg11.postls.com:443; HTTPS sg12.postls.com:443; HTTPS sg13.postls.com:443; DIRECT";
const PROXY_US = "HTTPS us18.postls.com:443; HTTPS us20.postls.com:443; HTTPS us15.postls.com:443; DIRECT";


const maskedAddrMaskAddrPairs = [[1744226304,-1024],[864550912,-131072],[-1337743104,-256],[1844415488,-256],[226295808,-65536],[233177088,-131072],[221773824,-262144],[310509568,-65536],[311427072,-65536],[315359232,-262144],[316276736,-65536],[317456384,-131072],[586153984,-524288],[586678272,-524288],[598736896,-131072],[598867968,-131072],[598999040,-65536],[874512384,-65536],[876085248,-65536],[876150784,-65536],[919863296,-131072],[920911872,-131072],[-1304494080,-65536],[-2134441984,-65536],[-1614086144,-65536],[-1623130112,-65536],[-1621557248,-65536],[-1511849984,-65536],[-1486684160,-65536],[-1366687744,-32768],[-1129971712,-32768],[-826474496,-65536],[778403840,-32768],[759976448,-512],[-1785028608,-4096],[-1785027584,-1024],[-1785026560,-1024],[-1785025536,-1024],[-1013317632,-32768],[-1619361792,-16384],[1588715520,-2048],[-1292937216,-2048],[-1180249088,-512],[-1176116480,-256],[-882343936,-4096],[-882339840,-2048],[-882337792,-1024],[1654566912,-4096],[1082720256,-32768],[1152114688,-8192],[1246904320,-8192],[1533807616,-1024],[1533808640,-1024],[1533809664,-1024],[1533810688,-512],[1533812992,-256],[1533813760,-512],[1533814272,-512],[1533805568,-1024],[1533818880,-1024],[1533806592,-1024]];


function ifFoundByBinaryInString(sortedArrayJoined, target) {

    var targetLen = target.length;
    var istart = 0;
    var iend = (sortedArrayJoined.length / targetLen) - 1;

    var imid, offset, newWord;
    while (istart < iend) {
      imid = (istart + iend) >>> 1;
      offset = imid * targetLen;
      newWord = sortedArrayJoined.substring( offset, offset + targetLen );
      if (target > newWord) {
        istart = imid + 1;
      } else {
        iend = imid;
      }
    }

    offset = iend * targetLen;
    return sortedArrayJoined.substring( offset, offset + targetLen ) === target;

  };
function areSubsCensored(host) {

    var x = host.lastIndexOf('.');
    do {
      x = host.lastIndexOf('.', x - 1);

      var sub = host.substring(x + 1);
      if(ifFoundByBinaryInString(hosts[sub.length] || '', sub)) {
        return true;
      }
    } while(x > -1);
    return false;

  };
function isCensoredByMaskedIp(ip) {

    const ipAddr = convert_addr(ip);

    for (const pair of maskedAddrMaskAddrPairs) {
      const maskedAddr  = pair[0];
      const maskAddr = pair[1];
      if((ipAddr & maskAddr) === maskedAddr) {
        return true;
      }
    }
    return false;

  };


function FindProxyForURL(url, host) {
	// NL Domains
	const LIST_NL = [
		"*fbvkcdn.com",
		"*fnac.pt",
		"*hdgo.cx",
		"*hentaihaven.org",
		"*uploadboy.com",
		"*upornia.com",
		"*vjav.com",
		"*iqoption.com",
		"*hdserials.tv",
		"*kinomoove.com",
		"*moonwalk.center",
		"*auautv.wordpress.com",
		"*crimeaua1.wordpress.com",
		"*nik.bot.nu",
		"*.itdc.ge",
		"*edu.admoblkaluga.ru",
		"*collectivehub.com",
		"*kaztorka.org",
		"*nuuvem.com",
		"*apex-base.com",
		"*kinokraft.net",
		"*bobcasino.com",
		"*viks.tv",
		"*cdn.mywed.com",
	];
	for(i = 0; i < LIST_NL.length; i++) {
		if (shExpMatch(host, LIST_NL[i])) 
			return /* */ PROXY_NL /* */;
	}
	
	// UK Domains
	const LIST_UK = [
		"*1xbet.com",
		"*betcityrus.com",
		"*betfair.com",
		"*betsbc.com",
		"*allking.ru",
		"*allking.club",
		"*sbobet.com",
		"*cloudstorm.online",
		"*streamguard.cc",
		"*kinogo.by",
		"*lostfilm-online.ru",
		"*theync.com",
		"*xn--80aacbuczbw9a6a.xn--p1ai",
		"*myzuka.club",
		"*moonwalk.cc",
		"*anilibria.tv",
		"*playeurolotto.com",
		"*aniland.org",
		"*tkmaxx.com",
	];
	for(i = 0; i < LIST_UK.length; i++) {
		if (shExpMatch(host, LIST_UK[i])) 
			return /* */ PROXY_UK /* */;
	}
	
	
	// FR Domains
	const LIST_FR = [
		"*datalock.ru",
		"*rustorka.com",
		"*absurdopedia.net",
		"*absurdopedia.org",
		"*anistar.me",
		"*kinogo.cc",
	]
	for(i = 0; i < LIST_FR.length; i++) {
		if (shExpMatch(host, LIST_FR[i])) 
			return /* */ PROXY_FR /* */;
	}
	
	// Other Domains
	if (shExpMatch(host, "*seasonvar.ru")) 
		return /* */ PROXY_SG /* */;
	if (shExpMatch(host, "*pandora.com")) 
		return /* */ PROXY_US /* */;


	// NL IPs
	if (isInNet(host, "185.38.12.0", "255.255.255.0") || 
		isInNet(host, "50.7.127.0", "255.255.255.0")  || 
		isInNet(host, "50.7.128.0", "255.255.255.0")  || 
		isInNet(host, "50.7.161.0", "255.255.255.0")  ||
		isInNet(host, "198.16.100.0", "255.255.255.0") ||
		isInNet(host, "37.220.36.0", "255.255.255.0") ||
		isInNet(host, "50.7.180.0", "255.255.255.0") 
		) 
		return /* */ PROXY_NL /* */;

		
	var ifByMaskedIp = false;
	var ifByBlockedIp = false;
	
	// Remove last dot.
	if (host[host.length - 1] === '.') {
		host = host.substring(0, host.length - 1);
	}
	return (function isCensored(){
		if (areSubsCensored(host)) {
			return true;
		}
		const ip = dnsResolve(host);
		if (ip) {
			ifByBlockedIp = ifFoundByBinaryInString(ips[ip.length] || '', ip);
			if (ifByBlockedIp) {
				return true;
			}
			ifByMaskedIp = isCensoredByMaskedIp(ip);
			if (ifByMaskedIp) {
				return true;
			};
	}
	return false;
	})() ? (ifByMaskedIp ? /* */ PROXY_MASK /* */ : ifByBlockedIp ? /* */ PROXY_NL /* */ : /* */ PROXY_STRING /* */) : 'DIRECT';
}