var cache = [
  '',
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '       ',
  '        ',
  '         '
];

function leftPad (str, len, ch) {
	// convert `str` to `string`
	str = str + '';
	// `len` is the `pad`'s length now
	len = len - str.length;
	// doesn't need to pad
	if (len <= 0) return str;
	// `ch` defaults to `' '`
	if (!ch && ch !== 0) ch = ' ';
	// convert `ch` to `string`
	ch = ch + '';
	// cache common use cases
	if (ch === ' ' && len < 10) return cache[len] + str;
	// `pad` starts with an empty string
	var pad = '';
	// loop
	while (true) {
		// add `ch` to `pad` if `len` is odd
		if (len & 1) pad += ch;
		// divide `len` by 2, ditch the remainder
		len >>= 1;
		// "double" the `ch` so this operation count grows logarithmically on `len`
		// each time `ch` is "doubled", the `len` would need to be "doubled" too
		// similar to finding a value in binary search tree, hence O(log(n))
		if (len) ch += ch;
		// `len` is 0, exit the loop
		else break;
	}
	// pad `str`!
	return pad + str;
}

function sendtx(src, tgtaddr, amount, strData, callback) {

	//var amt = leftPad(chain3.toHex(chain3.toWei(amount)).slice(2).toString(16),64,0);
	//var strData = '';
		
	chain3.mc.sendTransaction(
		{
			from: src,
			value:chain3.toSha(amount,'mc'),
			to: tgtaddr,
			gas: "4000000",
			gasPrice: chain3.mc.gasPrice,
			data: strData
		},
		callback);
		
	console.log('sending from:' + 	src + ' to:' + tgtaddr  + ' with data:' + strData);

}


// var filter = chain3.mc.filter({
//   fromBlock: 0,
//   toBlock: 'latest',
//   address: subchainbase.address,//'0x5b055b33e0670f89c6a39c0d57f95938ed0d138c'//,
//   //topics: [chain3.sha3('ReportStatus(string,string)')]
// });
// filter.watch(function(error, result){
// 		if( !error )
// 		{
// 			var msg = result.blockNumber;
// 			console.log(JSON.stringify(result.TxData))
// 			//console.log(rlp_decode(JSON.stringify(result.TxData)))
// 			for( key in result.args){
// 				msg += ":" + result.args[key];
// 			}			
			
// 			console.log(msg);
// 		}
// 		else{
// 			console.log("err:" + error);
// 		}
  
  
// });

function createWorldcupFunContract() {
	var worldcupfunContract = chain3.mc.contract([{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"}],"name":"SetChampion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"teams","outputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"},{"name":"totalContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contributor","type":"address"}],"name":"AddContributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"}],"name":"AddTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matches","outputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"},{"name":"finished","type":"bool"},{"name":"rewardSent","type":"bool"},{"name":"jackpot","type":"uint256"},{"name":"totalHomeWinContributions","type":"uint256"},{"name":"totalAwayWinContributions","type":"uint256"},{"name":"totalDrawContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"championRewardSent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"}],"name":"FinalizeMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"teamNumber","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"ChampionBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"matchNumber","type":"uint256"},{"name":"result","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"SingleMatchBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"}],"name":"SendoutSingleMatchReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allContributorsMap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"SendoutChampionReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"SetFounder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"championJackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"}],"name":"AddMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allContributors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"championContributions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
	var worldcupfun = worldcupfunContract.new(
	   {
	     from: mc.coinbase, 
	     data: '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506118fa806100606000396000f3006080604052600436106100fc576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632137a9f4146100fe5780633ed2b77a1461012b578063402de3cb146101df57806343dc8b1e146102225780634768d4ef146102ad5780634d853ee514610343578063578d7f521461039a578063787f1e5d146103c95780637b2ef1eb146104225780638b0ccb75146104845780639b8b87ee146104f0578063ba1c21e11461051d578063bcb4d4aa14610574578063c5c86d651461058b578063c95db903146105e6578063d9b88f6014610611578063e07439f714610674578063efe05585146106e1575b005b34801561010a57600080fd5b5061012960048036038101908080359060200190929190505050610738565b005b34801561013757600080fd5b50610156600480360381019080803590602001909291905050506107c1565b6040518084815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156101a2578082015181840152602081019050610187565b50505050905090810190601f1680156101cf5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156101eb57600080fd5b50610220600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610883565b005b34801561022e57600080fd5b5061029360048036038101908080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610984565b604051808215151515815260200191505060405180910390f35b3480156102b957600080fd5b506102d860048036038101908080359060200190929190505050610a31565b604051808d81526020018c81526020018b81526020018a815260200189815260200188815260200187151515158152602001861515151581526020018581526020018481526020018381526020018281526020019c5050505050505050505050505060405180910390f35b34801561034f57600080fd5b50610358610aab565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103a657600080fd5b506103af610ad0565b604051808215151515815260200191505060405180910390f35b3480156103d557600080fd5b50610408600480360381019080803590602001909291908035906020019092919080359060200190929190505050610ae3565b604051808215151515815260200191505060405180910390f35b61046a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610bd4565b604051808215151515815260200191505060405180910390f35b6104d6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919080359060200190929190505050610c9e565b604051808215151515815260200191505060405180910390f35b3480156104fc57600080fd5b5061051b60048036038101908080359060200190929190505050610eaa565b005b34801561052957600080fd5b5061055e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113e4565b6040518082815260200191505060405180910390f35b34801561058057600080fd5b506105896113fc565b005b34801561059757600080fd5b506105cc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506115db565b604051808215151515815260200191505060405180910390f35b3480156105f257600080fd5b506105fb611681565b6040518082815260200191505060405180910390f35b34801561061d57600080fd5b5061065a60048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611687565b604051808215151515815260200191505060405180910390f35b34801561068057600080fd5b5061069f600480360381019080803590602001909291905050506117d3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156106ed57600080fd5b50610722600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611811565b6040518082815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561079357600080fd5b6000600360008381526020019081526020016000206000015414156107b757600080fd5b8060088190555050565b6003602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108735780601f1061084857610100808354040283529160200191610873565b820191906000526020600020905b81548152906001019060200180831161085657829003601f168201915b5050505050908060020154905083565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411156109325760018190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109e157600080fd5b82600360008581526020019081526020016000206000018190555081600360008581526020019081526020016000206001019080519060200190610a26929190611829565b506001905092915050565b60046020528060005260406000206000915090508060000154908060010154908060020154908060030154908060040154908060050154908060060160009054906101000a900460ff16908060060160019054906101000a900460ff169080600701549080600801549080600901549080600a015490508c565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660009054906101000a900460ff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b4057600080fd5b600060046000868152602001908152602001600020600001541415610b6457600080fd5b82600460008681526020019081526020016000206004018190555081600460008681526020019081526020016000206005018190555060016004600086815260200190815260200160002060060160006101000a81548160ff021916908315150217905550600190509392505050565b60008060036000858152602001908152602001600020600001541415610bf957600080fd5b81600560008282540192505081905550816003600085815260200190815260200160002060020160008282540192505081905550816003600085815260200190815260200160002060030160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550610c9784610883565b9392505050565b600080831415610d3b578160046000868152602001908152602001600020600c0160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816004600086815260200190815260200160002060090160008282540192505081905550610d3685610883565b610e7a565b6001831415610dd7578160046000868152602001908152602001600020600d0160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508160046000868152602001908152602001600020600a0160008282540192505081905550610dd285610883565b610e79565b6003831415610e73578160046000868152602001908152602001600020600b0160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816004600086815260200190815260200160002060080160008282540192505081905550610e6e85610883565b610e78565b600080fd5b5b5b81600460008681526020019081526020016000206007016000828254019250508190555060019050949350505050565b6000806000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f0e57600080fd5b6004600088815260200190815260200160002060060160009054906101000a900460ff161515610f3d57600080fd5b6004600088815260200190815260200160002060060160019054906101000a900460ff1615610f6b57600080fd5b600a6009600460008a81526020019081526020016000206007015402811515610f9057fe5b04955060018054905094506000935060009250600091506000905060046000888152602001908152602001600020600501546004600089815260200190815260200160002060040154118015610ffc575060006004600089815260200190815260200160002060080154115b1561111157600093505b848410156110dd5760018481548110151561101d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16925060046000888152602001908152602001600020600b0160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915060008211156110d05760046000888152602001908152602001600020600801548287028115156110cc57fe5b0490505b8380600101945050611006565b60016004600089815260200190815260200160002060060160016101000a81548160ff0219169083151502179055506113db565b600460008881526020019081526020016000206005015460046000898152602001908152602001600020600401541480156111625750600060046000898152602001908152602001600020600a0154115b1561127757600093505b848410156112435760018481548110151561118357fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16925060046000888152602001908152602001600020600d0160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915060008211156112365760046000888152602001908152602001600020600a015482870281151561123257fe5b0490505b838060010194505061116c565b60016004600089815260200190815260200160002060060160016101000a81548160ff0219169083151502179055506113da565b600460008881526020019081526020016000206005015460046000898152602001908152602001600020600401541080156112c8575060006004600089815260200190815260200160002060090154115b156113d957600093505b848410156113a9576001848154811015156112e957fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16925060046000888152602001908152602001600020600c0160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150600082111561139c57600460008881526020019081526020016000206009015482870281151561139857fe5b0490505b83806001019450506112d2565b60016004600089815260200190815260200160002060060160016101000a81548160ff0219169083151502179055505b5b5b50505050505050565b60026020528060005260406000206000915090505481565b6000806000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561146057600080fd5b600660009054906101000a900460ff161561147a57600080fd5b6000600854141561148a57600080fd5b600a60096005540281151561149b57fe5b049550600180549050945060006003600060085481526020019081526020016000206002015414156114cc57600080fd5b600093506000925060009150600090505b848110156115b8576001818154811015156114f457fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16935060036000600854815260200190815260200160002060030160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054925060008311156115ab57600360006008548152602001908152602001600020600201548387028115156115a757fe5b0491505b80806001019150506114dd565b6001600660006101000a81548160ff021916908315150217905550505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561163857600080fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b60055481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156116e457600080fd5b60006003600086815260200190815260200160002060000154141561170857600080fd5b60006003600085815260200190815260200160002060000154141561172c57600080fd5b84600460008781526020019081526020016000206000018190555083600460008781526020019081526020016000206001018190555082600460008781526020019081526020016000206002018190555081600460008781526020019081526020016000206003018190555060006004600087815260200190815260200160002060060160006101000a81548160ff02191690831515021790555060019050949350505050565b6001818154811015156117e257fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076020528060005260406000206000915090505481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061186a57805160ff1916838001178555611898565b82800160010185558215611898579182015b8281111561189757825182559160200191906001019061187c565b5b5090506118a591906118a9565b5090565b6118cb91905b808211156118c75760008160009055506001016118af565b5090565b905600a165627a7a72305820a934e8aa4983fa339d4f2897a4d061434e84bdf2aec7ee3e35212be9d9552e870029', 
	     gas: '4700000'
	   }, function (e, contract){
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {
	         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	    }
	 });
}

function addTeam(teamNumber, teamName) {
	var wfAddress = "0x6a8aa804b9214934cc9cff0d6d910d073a8f8547";

	var MyContract = chain3.mc.contract([{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"}],"name":"SetChampion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"teams","outputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"},{"name":"totalContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contributor","type":"address"}],"name":"AddContributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"}],"name":"AddTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matches","outputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"},{"name":"finished","type":"bool"},{"name":"rewardSent","type":"bool"},{"name":"jackpot","type":"uint256"},{"name":"totalHomeWinContributions","type":"uint256"},{"name":"totalAwayWinContributions","type":"uint256"},{"name":"totalDrawContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"championRewardSent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"}],"name":"FinalizeMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"}],"name":"SendoutSingleMatchReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allContributorsMap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"SendoutChampionReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"SetFounder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"championJackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"}],"name":"AddMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"matchNumber","type":"uint256"},{"name":"result","type":"uint256"}],"name":"SingleMatchBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allContributors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"championContributions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"teamNumber","type":"uint256"}],"name":"ChampionBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
	var contractInstance = MyContract.at(wfAddress);

	contractInstance.AddTeam.sendTransaction(
		teamNumber, 
		teamName,
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}

function setChampion(teamNumber) {
	var wfAddress = "0x6a8aa804b9214934cc9cff0d6d910d073a8f8547";

	var MyContract = chain3.mc.contract([{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"}],"name":"SetChampion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"teams","outputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"},{"name":"totalContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contributor","type":"address"}],"name":"AddContributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"}],"name":"AddTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matches","outputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"},{"name":"finished","type":"bool"},{"name":"rewardSent","type":"bool"},{"name":"jackpot","type":"uint256"},{"name":"totalHomeWinContributions","type":"uint256"},{"name":"totalAwayWinContributions","type":"uint256"},{"name":"totalDrawContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"championRewardSent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"}],"name":"FinalizeMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"}],"name":"SendoutSingleMatchReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allContributorsMap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"SendoutChampionReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"SetFounder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"championJackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"}],"name":"AddMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"matchNumber","type":"uint256"},{"name":"result","type":"uint256"}],"name":"SingleMatchBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allContributors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"championContributions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"teamNumber","type":"uint256"}],"name":"ChampionBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
	var contractInstance = MyContract.at(wfAddress);

	contractInstance.SetChampion.sendTransaction(
		teamNumber, 
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}

function distChampionBet() {
	var wfAddress = "0x6a8aa804b9214934cc9cff0d6d910d073a8f8547";

	var MyContract = chain3.mc.contract([{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"}],"name":"SetChampion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"teams","outputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"},{"name":"totalContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contributor","type":"address"}],"name":"AddContributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"}],"name":"AddTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matches","outputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"},{"name":"finished","type":"bool"},{"name":"rewardSent","type":"bool"},{"name":"jackpot","type":"uint256"},{"name":"totalHomeWinContributions","type":"uint256"},{"name":"totalAwayWinContributions","type":"uint256"},{"name":"totalDrawContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"championRewardSent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"}],"name":"FinalizeMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"}],"name":"SendoutSingleMatchReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allContributorsMap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"SendoutChampionReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"SetFounder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"championJackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"}],"name":"AddMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"matchNumber","type":"uint256"},{"name":"result","type":"uint256"}],"name":"SingleMatchBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allContributors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"championContributions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"teamNumber","type":"uint256"}],"name":"ChampionBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
	var contractInstance = MyContract.at(wfAddress);

	contractInstance.SendoutChampionReward.sendTransaction(
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}

function createBrazilContract() {
	var wfAddress = "0x6a8aa804b9214934cc9cff0d6d910d073a8f8547";

	var championbrazilContract = chain3.mc.contract([{"constant":true,"inputs":[],"name":"WorldcupFunAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"wf","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
	var championbrazil = championbrazilContract.new(
	   wfAddress,
	   {
	     from: mc.coinbase, 
	     data: '0x608060405234801561001057600080fd5b506040516020806102d583398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610252806100836000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e06c25f5146101aa575b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163460405160006040518083038185875af19250505015156100bf57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16637b2ef1eb336033346040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050602060405180830381600087803b15801561016b57600080fd5b505af115801561017f573d6000803e3d6000fd5b505050506040513d602081101561019557600080fd5b81019080805190602001909291905050505050005b3480156101b657600080fd5b506101bf610201565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820f305f72b70809cee64a16fbe771c0cad26ccfdb43e52d09ba3b8923bf49f49260029', 
	     gas: '4700000'
	   }, function (e, contract){
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {
	         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	    }
	 })
}

function sendToBrazil() {
	sendtx(mc.coinbase, "0xdd807748ad52aa97690a54d6fb800e4089793563", 20, "", function(e, c) {
		console.log(e,c);
	})
}

