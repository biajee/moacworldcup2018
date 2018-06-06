pragma solidity ^0.4.17;
//Xinle Yang
//The full contract handling betting and rewarding.

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
    mapping (address => uint256) public allContributorsMap;

    mapping (uint256 => Team) public teams;
    mapping (uint256 => Match) public matches;
    
    uint256 public championJackpot;
    bool public championRewardSent;
    mapping (address => uint256) public championContributions;
    
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

    function ChampionBet(address sender, uint256 teamNumber, uint256 amount) public payable returns (bool) {
        if (teams[teamNumber].teamNumber == 0) revert();

        championJackpot += amount;
        teams[teamNumber].totalContributions += amount;
        teams[teamNumber].contributions[sender] += amount;
        AddContributor(sender);
    }

    function SingleMatchBet(address sender, uint256 matchNumber, uint256 result, uint256 amount) public payable returns (bool) {
        if (result == 0) {
            //away wins
            matches[matchNumber].awayWinContributions[sender] += amount;
            matches[matchNumber].totalAwayWinContributions += amount;
            AddContributor(sender);
        } else if (result == 1) {
            //draw
            matches[matchNumber].drawContributions[sender] += amount;
            matches[matchNumber].totalDrawContributions += amount;
            AddContributor(sender);
        } else if (result == 3) {
            //home wins
            matches[matchNumber].homeWinContributions[sender] += amount;
            matches[matchNumber].totalHomeWinContributions += amount;
            AddContributor(sender);
        } else {
            revert();
        }

        matches[matchNumber].jackpot += amount;
        return true;
    }

    // function AddChampionJackpot() public payable {
    //     championJackpot += msg.value;
    // }

    function AddContributor(address contributor) public {
        if (allContributorsMap[contributor]==0) {
            allContributors.push(contributor);
        }
        allContributorsMap[contributor]++;
    }

    function AddMatch(uint matchNumber, uint homeTeamNumber, uint awayTeamNumber, uint256 startTime) public returns (bool) {
        if (msg.sender != founder) revert();
        if (teams[homeTeamNumber].teamNumber == 0) revert();
        if (teams[awayTeamNumber].teamNumber == 0) revert();

        matches[matchNumber].matchNumber    = matchNumber;
        matches[matchNumber].homeTeamNumber = homeTeamNumber;
        matches[matchNumber].awayTeamNumber = awayTeamNumber;
        matches[matchNumber].startTime      = startTime;
        matches[matchNumber].finished = false;

        return true;
    }

    function FinalizeMatch(uint matchNumber, uint homeScore, uint awayScore) public returns (bool) {
        if (msg.sender != founder) revert();
        if (matches[matchNumber].matchNumber == 0) revert();

        matches[matchNumber].homeScore = homeScore;
        matches[matchNumber].awayScore = awayScore;
        matches[matchNumber].finished = true;

        return true;
    }

    function SetChampion(uint teamNumber) public {
        if (msg.sender != founder) revert();
        if (teams[teamNumber].teamNumber == 0) revert();
        
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
        uint256 i = 0;
        address contributor = 0x0;
        uint256 contribution = 0;
        uint256 dist = 0;
        if (matches[matchNumber].homeScore > matches[matchNumber].awayScore && matches[matchNumber].totalHomeWinContributions > 0) {
            for (i=0; i<contributorsLength; i++) {
                contributor = allContributors[i];
                contribution = matches[matchNumber].homeWinContributions[contributor];
                if (contribution>0) {
                    dist = distJackpot * contribution / matches[matchNumber].totalHomeWinContributions;
                    contributor.call.value(dist);
                }
            }
            matches[matchNumber].rewardSent = true;
        } else if (matches[matchNumber].homeScore == matches[matchNumber].awayScore && matches[matchNumber].totalDrawContributions > 0) {
            for (i=0; i<contributorsLength; i++) {
                contributor = allContributors[i];
                contribution = matches[matchNumber].drawContributions[contributor];
                if (contribution>0) {
                    dist = distJackpot * contribution / matches[matchNumber].totalDrawContributions;
                    contributor.call.value(dist);
                }
            }
            matches[matchNumber].rewardSent = true;
        } else if (matches[matchNumber].homeScore < matches[matchNumber].awayScore && matches[matchNumber].totalAwayWinContributions > 0) {
            for (i=0; i<contributorsLength; i++) {
                contributor = allContributors[i];
                contribution = matches[matchNumber].awayWinContributions[contributor];
                if (contribution>0) {
                    dist = distJackpot * contribution / matches[matchNumber].totalAwayWinContributions;
                    contributor.call.value(dist);
                }
            }
            matches[matchNumber].rewardSent = true;
        }
    }

    function SendoutChampionReward() {
        if (msg.sender != founder) revert();
        if (championRewardSent) revert();
        if (championNumber == 0) revert();

        uint256 distJackpot = championJackpot * 9 / 10;

        uint256 contributorsLength = allContributors.length;
        if (teams[championNumber].totalContributions == 0) revert();

        address contributor = 0x0;
        uint256 contribution = 0;
        uint256 dist = 0;
        for (uint i=0; i<contributorsLength; i++) {
            contributor = allContributors[i];
            contribution = teams[championNumber].contributions[contributor];
            if (contribution>0) {
                dist = distJackpot * contribution / teams[championNumber].totalContributions;
                contributor.call.value(dist);
            }
        }
        championRewardSent = true;
    }

    function () public payable {
        // if (!founder.call.value(msg.value)()) revert();
    }

    //TODO: more to add
}
