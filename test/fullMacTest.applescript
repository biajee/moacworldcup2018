set binFolder to "~/Documents/Code/moacworldcup2018/moac/"
set solidityFolder to "~/Documents/Code/moacworldcup2018/solidity/"
set jsFolder to "~/Documents/Code/moacworldcup2018/test/"

set ChampionSolFile to "Champion.sol"
set MatchSolFile to "Match.sol"
set WorldcupFunSolFile to "WorldcupFun.sol"

set runInit to false
set initSteps to 1
set runNpmInstall to true
set runCompileSol to true
set runMoac1 to true
set runMoac1Console to true


tell application "iTerm"
	activate
	tell current window
		if runInit then
			if initSteps ³ 1 then
				--1) copy all necessary files 
				create tab with default profile
				set init1Tab to current tab
				tell current session of init1Tab
					write text "echo -ne \"\\033]0;\"prep\"\\007\""
					
					write text "cd " & binFolder
					write text "mkdir _logs"
					write text "rm ./_logs/moac.log"
					write text "rm -rf ./data/"
					delay 1
					
					close init1Tab
					delay 1
				end tell
			end if
			if initSteps ³ 2 then
				create tab with default profile
				set init2Tab to current tab
				tell current session of init2Tab
					write text "echo -ne \"\\033]0;\"moac 1\"\\007\""
					
					write text "cd " & binFolder
					write text "./moac --datadir \"" & binFolder & "/data\" init ./genesis.json"
					delay 3
					
					close init2Tab
					delay 1
				end tell
			end if
		end if
		if runCompileSol then
			create tab with default profile
			set compileTab to current tab
			tell current session of compileTab
				write text "echo -ne \"\\033]0;\"compile\"\\007\""
				
				write text "cd " & jsFolder
				-- 0) run npm install
				if runNpmInstall then
					write text "npm install"
				end if
				-- 1) compile solidity contracts
				write text "node compileScript.js"
			end tell
			delay 1
		end if
		if runMoac1 then
			create tab with default profile
			set moac1Tab to current tab
			tell current session of moac1Tab
				write text "echo -ne \"\\033]0;\"moac 1\"\\007\""
				write text "cd " & binFolder
				write text "./moac --datadir \"" & binFolder & "/data\" --verbosity 4 --jspath " & jsFolder & " --rpc --rpccorsdomain \"http://wallet.moac.io\""
			end tell
			delay 5
		end if
		if runMoac1Console then
			create tab with default profile
			set moac1aTab to current tab
			tell current session of moac1aTab
				write text "echo -ne \"\\033]0;\"moac 1a\"\\007\""
				write text "cd " & binFolder
				write text "./moac attach ipc:/Users/biajee/Documents/Code/moacworldcup2018/moac/data/moac.ipc --jspath " & jsFolder
				delay 1
				write text "personal.newAccount(\"test123\")"
				write text "personal.newAccount(\"test123\")"
				write text "personal.unlockAccount(mc.coinbase, \"test123\", 0)"
				write text "miner.start(2)"
				delay 20
				write text "loadScript('./test.js')"
				write text "loadContracts()"
				delay 1
				write text "createWorldcupFunContract()"
				delay 13
				write text "addTeam(51, \"Brazil\")"
				write text "addTeam(11, \"Russia\")"
				delay 13
				write text "createChampionContract(11, \"Russia\")"
				write text "createChampionContract(51, \"Brazil\")"
				delay 13
				write text "supportTeam(11, 1)"
				write text "supportTeam(51, 0.5)"
				delay 13
				write text "setChampion(51)"
				delay 13
				write text "distChampionBet()"
				delay 13
				write text "mc.getBalance(wcAddress)"
				
			end tell
			delay 1
		end if
	end tell
end tell