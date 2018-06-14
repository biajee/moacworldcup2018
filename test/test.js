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

var toShaRatio = 1000000000000000000;

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

// var wcAbi = [{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"SafetySendout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"}],"name":"SetChampion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"teams","outputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"},{"name":"totalContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contributor","type":"address"}],"name":"AddContributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teamNumber","type":"uint256"},{"name":"teamName","type":"string"}],"name":"AddTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matches","outputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"},{"name":"finished","type":"bool"},{"name":"rewardSent","type":"bool"},{"name":"jackpot","type":"uint256"},{"name":"totalHomeWinContributions","type":"uint256"},{"name":"totalAwayWinContributions","type":"uint256"},{"name":"totalDrawContributions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"championRewardSent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"matchesContributions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeScore","type":"uint256"},{"name":"awayScore","type":"uint256"}],"name":"FinalizeMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"}],"name":"SendoutSingleMatchReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"teamsContributionsSent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"matchesContributionsSent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allContributorsMap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"SendoutChampionReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"SetFounder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"championJackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchNumber","type":"uint256"},{"name":"homeTeamNumber","type":"uint256"},{"name":"awayTeamNumber","type":"uint256"},{"name":"startTime","type":"uint256"}],"name":"AddMatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"matchNumber","type":"uint256"},{"name":"result","type":"uint256"}],"name":"SingleMatchBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allContributors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"teamsContributions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"teamNumber","type":"uint256"}],"name":"ChampionBet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];
// var wcData = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611f86806100606000396000f300608060405260043610610128576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806315c446a21461012a5780632137a9f4146101575780633ed2b77a14610184578063402de3cb1461023857806343dc8b1e1461027b5780634768d4ef146103065780634d853ee51461039c578063578d7f52146103f357806366b3a89914610422578063787f1e5d146104835780639b8b87ee146104dc578063b3227af914610509578063b683e5b81461056a578063ba1c21e1146105cb578063bcb4d4aa14610622578063c5c86d6514610639578063c95db90314610694578063d9b88f60146106bf578063df57f67814610722578063e07439f714610784578063f64dd4d6146107f1578063ff7f5fad14610852575b005b34801561013657600080fd5b50610155600480360381019080803590602001909291905050506108aa565b005b34801561016357600080fd5b506101826004803603810190808035906020019092919050505061095f565b005b34801561019057600080fd5b506101af600480360381019080803590602001909291905050506109e8565b6040518084815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156101fb5780820151818401526020810190506101e0565b50505050905090810190601f1680156102285780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34801561024457600080fd5b50610279600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610aaa565b005b34801561028757600080fd5b506102ec60048036038101908080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610bab565b604051808215151515815260200191505060405180910390f35b34801561031257600080fd5b5061033160048036038101908080359060200190929190505050610c58565b604051808d81526020018c81526020018b81526020018a815260200189815260200188815260200187151515158152602001861515151581526020018581526020018481526020018381526020018281526020019c5050505050505050505050505060405180910390f35b3480156103a857600080fd5b506103b1610cd2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103ff57600080fd5b50610408610cf7565b604051808215151515815260200191505060405180910390f35b34801561042e57600080fd5b5061046d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d0a565b6040518082815260200191505060405180910390f35b34801561048f57600080fd5b506104c2600480360381019080803590602001909291908035906020019092919080359060200190929190505050610d2f565b604051808215151515815260200191505060405180910390f35b3480156104e857600080fd5b5061050760048036038101908080359060200190929190505050610e20565b005b34801561051557600080fd5b50610554600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061164e565b6040518082815260200191505060405180910390f35b34801561057657600080fd5b506105b5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611673565b6040518082815260200191505060405180910390f35b3480156105d757600080fd5b5061060c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611698565b6040518082815260200191505060405180910390f35b34801561062e57600080fd5b506106376116b0565b005b34801561064557600080fd5b5061067a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061197f565b604051808215151515815260200191505060405180910390f35b3480156106a057600080fd5b506106a9611a25565b6040518082815260200191505060405180910390f35b3480156106cb57600080fd5b5061070860048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611a2b565b604051808215151515815260200191505060405180910390f35b61076a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050611b77565b604051808215151515815260200191505060405180910390f35b34801561079057600080fd5b506107af60048036038101908080359060200190929190505050611d88565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156107fd57600080fd5b5061083c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611dc6565b6040518082815260200191505060405180910390f35b610890600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611deb565b604051808215151515815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561090557600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109ba57600080fd5b6000600360008381526020019081526020016000206000015414156109de57600080fd5b80600b8190555050565b6003602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a9a5780601f10610a6f57610100808354040283529160200191610a9a565b820191906000526020600020905b815481529060010190602001808311610a7d57829003601f168201915b5050505050908060020154905083565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415610b595760018190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c0857600080fd5b82600360008581526020019081526020016000206000018190555081600360008581526020019081526020016000206001019080519060200190610c4d929190611eb5565b506001905092915050565b60066020528060005260406000206000915090508060000154908060010154908060020154908060030154908060040154908060050154908060060160009054906101000a900460ff16908060060160019054906101000a900460ff169080600701549080600801549080600901549080600a015490508c565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a60009054906101000a900460ff1681565b6007602052816000526040600020602052806000526040600020600091509150505481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d8c57600080fd5b600060066000868152602001908152602001600020600001541415610db057600080fd5b82600660008681526020019081526020016000206004018190555081600660008681526020019081526020016000206005018190555060016006600086815260200190815260200160002060060160006101000a81548160ff021916908315150217905550600190509392505050565b6000806000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e8457600080fd5b6006600088815260200190815260200160002060060160009054906101000a900460ff161515610eb357600080fd5b6006600088815260200190815260200160002060060160019054906101000a900460ff1615610ee157600080fd5b600a6009600660008a81526020019081526020016000206007015402811515610f0657fe5b04955060018054905094506000935060009250600091506000905060066000888152602001908152602001600020600501546006600089815260200190815260200160002060040154118015610f72575060006006600089815260200190815260200160002060080154115b1561118657600093505b8484101561115257600184815481101515610f9357fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600260038a0201815260200190815260200160002054600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600260038b020181526020019081526020016000205403915060008211156111455781600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600260038b0201815260200190815260200160002060008282540192505081905550600660008881526020019081526020016000206008015482870281151561110157fe5b0490508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561114457600080fd5b5b8380600101945050610f7c565b60016006600089815260200190815260200160002060060160016101000a81548160ff021916908315150217905550611645565b600660008881526020019081526020016000206005015460066000898152602001908152602001600020600401541480156111d75750600060066000898152602001908152602001600020600a0154115b156113eb57600093505b848410156113b7576001848154811015156111f857fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160038a0201815260200190815260200160002054600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160038b020181526020019081526020016000205403915060008211156113aa5781600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160038b020181526020019081526020016000206000828254019250508190555060066000888152602001908152602001600020600a015482870281151561136657fe5b0490508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156113a957600080fd5b5b83806001019450506111e1565b60016006600089815260200190815260200160002060060160016101000a81548160ff021916908315150217905550611644565b6006600088815260200190815260200160002060050154600660008981526020019081526020016000206004015410801561143c575060006006600089815260200190815260200160002060090154115b1561164357600093505b848410156116135760018481548110151561145d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600060038902815260200190815260200160002054600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600060038a0281526020019081526020016000205403915060008211156116065781600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600060038a0281526020019081526020016000206000828254019250508190555060066000888152602001908152602001600020600901548287028115156115c257fe5b0490508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561160557600080fd5b5b8380600101945050611446565b60016006600089815260200190815260200160002060060160016101000a81548160ff0219169083151502179055505b5b5b50505050505050565b6005602052816000526040600020602052806000526040600020600091509150505481565b6008602052816000526040600020602052806000526040600020600091509150505481565b60026020528060005260406000206000915090505481565b6000806000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561171457600080fd5b600a60009054906101000a900460ff161561172e57600080fd5b6000600b54141561173e57600080fd5b600a600980540281151561174e57fe5b0495506001805490509450600060036000600b54815260200190815260200160002060020154141561177f57600080fd5b600093506000925060009150600090505b8481101561195c576001818154811015156117a757fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169350600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600b54815260200190815260200160002054600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600b54815260200190815260200160002054039250600083111561194f5782600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600b5481526020019081526020016000206000828254019250508190555060036000600b5481526020019081526020016000206002015483870281151561190b57fe5b0491508373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561194e57600080fd5b5b8080600101915050611790565b6001600a60006101000a81548160ff021916908315150217905550505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156119dc57600080fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b60095481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611a8857600080fd5b600060036000868152602001908152602001600020600001541415611aac57600080fd5b600060036000858152602001908152602001600020600001541415611ad057600080fd5b84600660008781526020019081526020016000206000018190555083600660008781526020019081526020016000206001018190555082600660008781526020019081526020016000206002018190555081600660008781526020019081526020016000206003018190555060006006600087815260200190815260200160002060060160006101000a81548160ff02191690831515021790555060019050949350505050565b600080821415611c165734600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000856003028501815260200190815260200160002060008282540192505081905550346006600085815260200190815260200160002060090160008282540192505081905550611c1184610aaa565b611d59565b6001821415611cb45734600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008560030285018152602001908152602001600020600082825401925050819055503460066000858152602001908152602001600020600a0160008282540192505081905550611caf84610aaa565b611d58565b6002821415611d525734600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000856003028501815260200190815260200160002060008282540192505081905550346006600085815260200190815260200160002060080160008282540192505081905550611d4d84610aaa565b611d57565b600080fd5b5b5b346006600085815260200190815260200160002060070160008282540192505081905550600190509392505050565b600181815481101515611d9757fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6004602052816000526040600020602052806000526040600020600091509150505481565b60008060036000848152602001908152602001600020600001541415611e1057600080fd5b3460096000828254019250508190555034600360008481526020019081526020016000206002016000828254019250508190555034600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060008282540192505081905550611eab83610aaa565b6001905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611ef657805160ff1916838001178555611f24565b82800160010185558215611f24579182015b82811115611f23578251825591602001919060010190611f08565b5b509050611f319190611f35565b5090565b611f5791905b80821115611f53576000816000905550600101611f3b565b5090565b905600a165627a7a7230582055b15102251c68b27d48aadbf135629e230ec0e759d24c47e8393b1729e3de390029';
var wcAbi;
var wcData = '';
var wcAddress = '';

// var brazilAbi = [{"constant":true,"inputs":[],"name":"WorldcupFunAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"wf","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];
// var brazilData = '0x608060405234801561001057600080fd5b5060405160208061028083398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506101fd806100836000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e06c25f514610155575b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663ff7f5fad343360336040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303818588803b15801561010b57600080fd5b505af115801561011f573d6000803e3d6000fd5b50505050506040513d602081101561013657600080fd5b8101908080519060200190929190505050151561015257600080fd5b50005b34801561016157600080fd5b5061016a6101ac565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058206db162a901bbec4791de6613120e6bd673ee04747a6af7b8d37d3211c0a1cda10029';
var championAbi;
var championData = '';
var championAddresses = {};

var matchAbi;
var matchData = '';
var matchAddresses = {};

var account1 = '';
var account2 = '';
var account3 = '';
var account4 = '';

function loadContracts() {
	var contractName = 'WorldcupFun';
	loadScript(contractName + '.abi');
	loadScript(contractName + '.bin');
	wcAbi = contractAbi;
	wcData = contractBytecode;
	console.log("output", wcAbi);
	console.log("output", wcData);

	contractName = 'Champion';
	loadScript(contractName + '.abi');
	loadScript(contractName + '.bin');
	championAbi = contractAbi;
	championData = contractBytecode;
	console.log("output", championAbi);
	console.log("output", championData);

	contractName = 'Match';
	loadScript(contractName + '.abi');
	loadScript(contractName + '.bin');
	matchAbi = contractAbi;
	matchData = contractBytecode;
	console.log("output", matchAbi);
	console.log("output", matchData);
}

function createWorldcupFunContract(from) {
	var worldcupfunContract = chain3.mc.contract(wcAbi);
	var worldcupfun = worldcupfunContract.new(
	   {
	     from: from, 
	     data: wcData, 
	     gas: '4700000',
	     gasPrice: chain3.mc.gasPrice*2
	   }, function (e, contract){
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {
	         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	         wcAddress = contract.address;
	    }
	 });
}

function addTeam(teamNumber, teamName) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

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

function addMatch(matchNumber, homeTeamNumber, awayTeamNumber, startTime) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	contractInstance.AddMatch.sendTransaction(
		matchNumber, 
		homeTeamNumber,
		awayTeamNumber,
		startTime,
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}


function createChampionContract(teamNumber, teamName) {
	var championContract = chain3.mc.contract(championAbi);
	var championInstance = championContract.new(
	   wcAddress,
	   teamNumber,
	   {
	     from: mc.coinbase, 
	     data: championData, 
	     gas: '4700000'
	   }, function (e, contract) {
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {
	         console.log(teamNumber, teamName, 'Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	         championAddresses[''+teamNumber] = contract.address;
	    }
	 });
}

function createMatchContract(matchNumber, result) {
	var matchContract = chain3.mc.contract(matchAbi);
	var matchInstance = matchContract.new(
	   wcAddress,
	   matchNumber,
	   result,
	   {
	     from: mc.coinbase, 
	     data: matchData, 
	     gas: '4700000'
	   }, function (e, contract) {
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {
	         console.log(matchNumber, result, 'Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	         matchAddresses[''+matchNumber+'x'+result] = contract.address;
	    }
	 });
}

function getMatchContract(address) {
	var MyContract = chain3.mc.contract(matchAbi);
	var contractInstance = MyContract.at(address);

	var worldcupFunAddress = contractInstance.WorldcupFunAddress();
	// console.log("WorldcupFunAddress", worldcupFunAddress);
	var matchNumber = contractInstance.MatchNumber();
	// console.log("MatchNumber", matchNumber);
	var result = contractInstance.Result();
	// console.log("Result", result);
	matchAddresses[''+matchNumber+'x'+result] = address;
	console.log(matchNumber+'x'+result, address);

}

function supportTeam(teamNumber, amount) {
	sendtx(mc.coinbase, championAddresses[''+teamNumber], amount, "", function(e, c) {
		console.log(e,c);
	});
}


function betMatch(matchNumber, result, amount) {
	sendtx(mc.coinbase, matchAddresses[''+matchNumber +'x'+result], amount, "", function(e, c) {
		console.log(e,c);
	});
}

function setChampion(teamNumber) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

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
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

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

function setMatchResult(matchNumber, homeScore, awayScore) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	contractInstance.FinalizeMatch.sendTransaction(
		matchNumber, 
		homeScore,
		awayScore,
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}

function distMatchBet(matchNumber) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	contractInstance.SendoutSingleMatchReward.sendTransaction(
		matchNumber,
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}

var teamJson = {};
function addTeamToJson(teamNumber, teamName) {
	teamJson[teamNumber+''] = teamName;
}

function createTeamJson() {
	addTeamToJson(11, "Russia");
	addTeamToJson(12, "SaudiArabia");
	addTeamToJson(13, "Egypt");
	addTeamToJson(14, "Uruguay");
	addTeamToJson(21, "Portugal");
	addTeamToJson(22, "Spain");
	addTeamToJson(23, "Morocco");
	addTeamToJson(24, "Iran");
	addTeamToJson(31, "France");
	addTeamToJson(32, "Australia");
	addTeamToJson(33, "Peru");
	addTeamToJson(34, "Denmark");
	addTeamToJson(41, "Argentina");
	addTeamToJson(42, "Iceland");
	addTeamToJson(43, "Croatia");
	addTeamToJson(44, "Nigeria");
	addTeamToJson(51, "Brazil");
	addTeamToJson(52, "Switzerland");
	addTeamToJson(53, "CostaRica");
	addTeamToJson(54, "Serbia");
	addTeamToJson(61, "Germany");
	addTeamToJson(62, "Mexico");
	addTeamToJson(63, "Sweden");
	addTeamToJson(64, "SouthKorea");
	addTeamToJson(71, "Belgium");
	addTeamToJson(72, "Panama");
	addTeamToJson(73, "Tunisia");
	addTeamToJson(74, "England");
	addTeamToJson(81, "Poland");
	addTeamToJson(82, "Senegal");
	addTeamToJson(83, "Colombia");
	addTeamToJson(84, "Japan");
}

function addAllTeams() {

	for (var i=1; i<5; i++) {
		for (var j=1; j<9; j++) {
			var teamNumber = j*10+i;
			addTeam(teamNumber, teamJson[teamNumber+'']);
		}
		admin.sleepBlocks(2);
	}
}

function addAllMatches() {
	addMatch(1, 11, 12, 1528988400000);
	addMatch(2, 13, 14, 1529064000000);
	addMatch(3, 23, 24, 1529074800000);
	addMatch(4, 21, 22, 1529085600000);
	addMatch(5, 31, 32, 1529143200000);
	addMatch(6, 41, 42, 1529154000000);
	addMatch(7, 33, 34, 1529164800000);
	addMatch(8, 43, 44, 1529175600000);
	addMatch(9, 53, 54, 1529236800000);
	addMatch(10, 61, 62, 1529247600000);
	addMatch(11, 51, 52, 1529258400000);
	addMatch(12, 63, 64, 1529323200000);
	addMatch(13, 71, 72, 1529334000000);
	addMatch(14, 73, 74, 1529344800000);
	addMatch(15, 83, 84, 1529409600000);
	addMatch(16, 81, 82, 1529420400000);
	admin.sleepBlocks(2);
	addMatch(17, 11, 13, 1529431200000);
	addMatch(18, 21, 23, 1529496000000);
	addMatch(19, 14, 12, 1529506800000);
	addMatch(20, 24, 22, 1529517600000);
	addMatch(21, 34, 32, 1529582400000);
	addMatch(22, 31, 33, 1529593200000);
	addMatch(23, 41, 43, 1529604000000);
	addMatch(24, 51, 53, 1529668800000);
	addMatch(25, 44, 42, 1529679600000);
	addMatch(26, 54, 52, 1529690400000);
	addMatch(27, 71, 73, 1529755200000);
	addMatch(28, 64, 62, 1529766000000);
	addMatch(29, 61, 63, 1529776800000);
	addMatch(30, 74, 72, 1529841600000);
	addMatch(31, 84, 82, 1529852400000);
	addMatch(32, 81, 83, 1529863200000);
	admin.sleepBlocks(2);
	addMatch(33, 14, 11, 1529935200000);
	addMatch(34, 12, 13, 1529935200000);
	addMatch(35, 22, 23, 1529949600000);
	addMatch(36, 24, 21, 1529949600000);
	addMatch(37, 32, 33, 1530021600000);
	addMatch(38, 34, 31, 1530021600000);
	addMatch(39, 44, 41, 1530036000000);
	addMatch(40, 42, 43, 1530036000000);
	addMatch(41, 64, 61, 1530108000000);
	addMatch(42, 62, 63, 1530108000000);
	addMatch(43, 54, 51, 1530122400000);
	addMatch(44, 52, 53, 1530122400000);
	addMatch(45, 84, 81, 1530194400000);
	addMatch(46, 82, 83, 1530194400000);
	addMatch(47, 72, 73, 1530208800000);
	addMatch(48, 74, 71, 1530208800000);
	admin.sleepBlocks(2);
	addMatch(49, 0, 0, 1530367200000);
	addMatch(50, 0, 0, 1530381600000);
	addMatch(51, 0, 0, 1530453600000);
	addMatch(52, 0, 0, 1530468000000);
	addMatch(53, 0, 0, 1530540000000);
	addMatch(54, 0, 0, 1530554400000);
	addMatch(55, 0, 0, 1530626400000);
	addMatch(56, 0, 0, 1530640800000);
	addMatch(57, 0, 0, 1530885600000);
	addMatch(58, 0, 0, 1530900000000);
	addMatch(59, 0, 0, 1530972000000);
	addMatch(60, 0, 0, 1530986400000);
	addMatch(61, 0, 0, 1531245600000);
	addMatch(62, 0, 0, 1531332000000);
	addMatch(63, 0, 0, 1531576800000);
	addMatch(64, 0, 0, 1531666800000);
	admin.sleepBlocks(2);
}

function createAllMatchBets() {
	for (var i=1; i<49; i++) {
		createMatchContract(i, 0);
		createMatchContract(i, 1);
		createMatchContract(i, 2);
		admin.sleepBlocks(2);
	}
	for (var j=49; j<65; j++) {
		createMatchContract(j, 0);
		createMatchContract(j, 2);
		admin.sleepBlocks(2);
	}
}


function createAllChampionBets() {
	for (var i=1; i<5; i++) {
		for (var j=1; j<9; j++) {
			var teamNumber = j*10+i;
			createChampionContract(teamNumber, teamJson[teamNumber+'']);
		}
		admin.sleepBlocks(2);
	}
}

function getTeamInfo(teamNumber) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	var result = contractInstance.teams(teamNumber);
	console.log(result);
}

function getMatchInfo(matchNumber) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	var result = contractInstance.matches(matchNumber);
	console.log(result);
}

function getTeamContributionInfo(teamNumber) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	var result = contractInstance.teamsContributions(mc.coinbase, teamNumber);
	console.log(result);
}

function safetySendout(amount) {
	var MyContract = chain3.mc.contract(wcAbi);
	var contractInstance = MyContract.at(wcAddress);

	contractInstance.SafetySendout.sendTransaction(
		amount,
		{
			from: mc.coinbase,
			gas: '5000000'
		},
		function (e,c) {
			console.log(e, c);
		}
	);
	
}


function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = mc.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  var count = 0;

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      // console.log("Searching block " + i);
    }
    var block = mc.getBlock(i, true);
    if (block != null && block.transactions != null) {
      if (block.miner == myaccount) {
        count++;
        // console.log("block miner", i, block.miner, count);
      }
      block.transactions.forEach( function(e) {
      	if (myaccount == e.from) {
      		var hash = e.hash;
      		var result = mc.getTransactionReceipt(hash);
      		var contractAddress = result.contractAddress;
      		getMatchContract(contractAddress);
      	}
      });
    }
  }
}


function fullTest() {
	var toShaRatio = 1000000000000000000;
	account1 = mc.accounts[0];
	account2 = mc.accounts[1];
	account3 = mc.accounts[2];
	account4 = mc.accounts[3];

	personal.unlockAccount(account1, "test123", 0);
	personal.unlockAccount(account2, "test123", 0);
	personal.unlockAccount(account3, "test123", 0);
	personal.unlockAccount(account4, "test123", 0);

	var b1=mc.getBalance(account1)/toShaRatio;
	var b2=mc.getBalance(account2)/toShaRatio;
	var b3=mc.getBalance(account3)/toShaRatio;
	var b4=mc.getBalance(account4)/toShaRatio;

	console.log("[1] initial balances");
	console.log(account1, "account1", b1);
	console.log(account2, "account2", b2);
	console.log(account3, "account3", b3);
	console.log(account4, "account4", b4);

	if (b2 < 220) {
		sendtx(account1, account2, 220-b2, "");
	}
	if (b3 < 200) {
		sendtx(account1, account3, 200-b3, "");
	}
	if (b4 < 600) {
		sendtx(account1, account4, 600-b4, "");
	}
	admin.sleepBlocks(1);

	console.log("[2] send some tokens");
	console.log(account1, "account1", b1);
	console.log(account2, "account2", b2);
	console.log(account3, "account3", b3);
	console.log(account4, "account4", b4);

	loadContracts();
	createWorldcupFunContract(account2);
	admin.sleepBlocks(2);

	console.log("[3] create wc contract");
	b2 = mc.getBalance(account2)/toShaRatio;
	console.log(account2, "account2", b2);
}

