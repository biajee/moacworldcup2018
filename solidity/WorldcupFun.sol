pragma solidity ^0.4.17;
//Xinle Yang
//The full contract handling betting and rewarding.

import "./WorldcupFun.sol";

contract WorldcupFun {

    address public founder;

    struct Match {
        uint256 matchNumber;
        uint256 homeTeamNumber;
        uint256 awayTeamNumber;
        uint256 startTime;
        uint256 homeScore;
        uint256 awayScore;
        bool finished;
        bool rewardSent;
        uint256 jackpot;
        uint256 totalHomeWinContributions;
        uint256 totalAwayWinContributions;
        uint256 totalDrawContributions;
        mapping (address => uint256) homeWinContributions;
        mapping (address => uint256) awayWinContributions;
        mapping (address => uint256) drawContributions;
    }

    struct Team {
        uint256 teamNumber;
        string teamName;
        uint256 totalContributions;
        mapping (address => uint256) contributions;
    }

    address[] public allContributors;
    mapping (address => uint2565) public allContributorsMap; 

    mapping (uint256 => Team) public teams;
    mapping (uint256 => Match) public matches;
    
    uint256 public championJackpot;
    bool public championRewardSent;
    mapping (address => uint256) public championContributions;
    
    mapping (uint256 => MatchContributions) public matchesContributions;

    uint256 championNumber;

    //constructor
    function WorldcupFun() public {
        founder = msg.sender;
        //TODO: do necessary constructor stuff
    }

    function SetFounder(address newFounder) public returns (bool) {
        if (msg.sender != founder) revert();
        founder = newFounder;
        return true;
    }

    function ChampionBet(address sender, uint teamNumber) public payable returns (bool) {
        if (!teams[teamNumber]) revert();

        championJackpot += msg.value();
        Team team = teams[teamNumber];
        team.totalContributions += msg.value();
        team.contributions[sender] += msg.value();
        AddContributor(sender);
    }

    function SingleMatchBet(address sender, uint matchNumber, uint result) public payable returns (bool) {
        if (result == 0) {
            //away wins
            matchesContributions[matchNumber].awayWinContributions[sender] += msg.value();
            matchesContributions[matchNumber].totalAwayWinContributions += msg.value();
            AddContributor(sender);
        } else if (result == 1) {
            //draw
            matchesContributions[matchNumber].drawContributions[sender] += msg.value();
            matchesContributions[matchNumber].totalDrawContributions += msg.value();
            AddContributor(sender);
        } else if (result == 3) {
            //home wins
            matchesContributions[matchNumber].homeWinContributions[sender] += msg.value();
            matchesContributions[matchNumber].totalHomeWinContributions += msg.value();
            AddContributor(sender);
        } else {
            revert();
        }

        matchesContributions[matchNumber].jackpot += msg.value();
        return true;
    }

    // function AddChampionJackpot() public payable {
    //     championJackpot += msg.value();
    // }

    function AddContributor(address contributor) public {
        if (allContributorsMap[contributor]) {
            allContributors.push(contributor);
        }
        allContributorsMap[contributor]++;
    }

    function AddMatch(uint matchNumber, uint homeTeamNumber, uint awayTeamNumber, uint256 startTime) public returns (bool) {
        if (msg.sender != founder) revert();
        if (teams[homeTeamNumber] == "") revert();
        if (teams[awayTeamNumber] == "") revert();

        matches[matchNumber].matchNumber    = matchNumber;
        matches[matchNumber].homeTeamNumber = homeTeamNumber;
        matches[matchNumber].awayTeamNumber = awayTeamNumber;
        matches[matchNumber].startTime      = startTime;
        matches[matchNumber].finished = false;

        return true;
    }

    function FinalizeMatch(uint matchNumber, uint homeScore, uint awayScore) public returns (bool) {
        if (msg.sender != founder) revert();
        if (matches[matchNumber] == 0) revert();

        matches[matchNumber].homeScore = homeScore;
        matches[matchNumber].awayScore = awayScore;
        matches[matchNumber].finished = true;

        return true;
    }

    function SetChampion(uint teamNumber) public {
        if (msg.sender != founder) revert();
        if (teams[teamNumber] == "") revert();
        
        championNumber = teamNumber;
    }

    function AddTeam(uint256 teamNumber, string teamName) public returns (bool) {
        if (msg.sender != founder) revert();

        teams[teamNumber].teamNumber = teamNumber;
        teams[teamNumber].teamName = teamName;
        return true;
    }

    function SendoutSingleMatchReward(uint256 matchNumber) {
        if (msg.sender != founder) revert();
        if (!matches[matchNumber].finished) revert();
        if (matches[matchNumber].rewardSent) revert();

        uint256 distJackpot = matches[matchNumber].jackpot * 9 / 10;

        uint256 contributorsLength = allContributors.length;
        if (matches[matchNumber].homeScore > matches[matchNumber].awayScore && matches[matchNumber].totalHomeWinContributionss > 0) {
            for (uint i=0; i<contributorsLength; i++) {
                address contributor = allContributors[i];
                uint256 contribution = matches[matchNumber].homeWinContributions[contributor];
                if (contributionx) {
                    uint256 dist = distJackpot * contribution / matches[matchNumber].totalHomeWinContributions;
                    contributor.send(dist);
                }
            }
            matches[matchNumber].rewardSent = true;
        } else if (matches[matchNumber].homeScore == matches[matchNumber].awayScore && matches[matchNumber].totalDrawContributions > 0) {
            for (uint i=0; i<contributorsLength; i++) {
                address contributor = allContributors[i];
                uint256 contribution = matches[matchNumber].drawContributions[contributor];
                if (contribution) {
                    uint256 dist = distJackpot * contribution / matches[matchNumber].totalDrawContributions;
                    contributor.send(dist);
                }
            }
            matches[matchNumber].rewardSent = true;
        } else if (matches[matchNumber].homeScore < matches[matchNumber].awayScore && matches[matchNumber].totalAwayWinContributions > 0) {
            for (uint i=0; i<contributorsLength; i++) {
                address contributor = allContributors[i];
                uint256 contribution = matches[matchNumber].awayWinContributions[contributor];
                if (contribution) {
                    uint256 dist = distJackpot * contribution / matches[matchNumber].totalAwayWinContributions;
                    contributor.send(dist);
                }
            }
            matches[matchNumber].rewardSent = true;
        }
    }

    function SendoutChampionReward() {
        if (msg.sender != founder) revert();
        if (championRewardSent) revert();
        if (!championNumber) revert();

        uint256 distJackpot = championJackpot * 9 / 10;

        uint256 contributorsLength = allContributors.length;
        Team championTeam = teams[championNumber];
        if (!championTeam.totalContributions) revert();

        for (uint i=0; i<contributorsLength; i++) {
            address contributor = allContributors[i];
            uint256 contribution = championTeam.contributions[contributor];
            if (contribution) {
                uint256 dist = distJackpot * contribution / championTeam.totalContributions;
                contributor.send(dist);
            }
        }
        championRewardSent = true;
    }

    function () public payable {
        if (!founder.call.value(msg.value)()) revert();
    }

    //TODO: more to add
}
