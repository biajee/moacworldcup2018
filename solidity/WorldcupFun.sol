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
    }

    struct Team {
        uint256 teamNumber;
        string teamName;
        uint256 totalContributions;
    }

    address[] public allContributors;
    mapping (address => uint256) public allContributorsMap;

    mapping (uint256 => Team) public teams;
    mapping (address => mapping(uint256 => uint256)) public teamsContributions;
    mapping (address => mapping(uint256 => uint256)) public teamsContributionsSent;
    mapping (uint256 => Match) public matches;
    mapping (address => mapping(uint256 => uint256)) public matchesContributions;
    mapping (address => mapping(uint256 => uint256)) public matchesContributionsSent;
    
    uint256 public championJackpot;
    bool public championRewardSent;
    
    uint256 championNumber;

    //constructor
    function WorldcupFun() public {
        founder = msg.sender;
    }

    function SetFounder(address newFounder) public returns (bool) {
        if (msg.sender != founder) revert();
        founder = newFounder;
        return true;
    }

    function ChampionBet(address sender, uint256 teamNumber) public payable returns (bool) {
        if (teams[teamNumber].teamNumber == 0) revert();

        championJackpot += msg.value;
        teams[teamNumber].totalContributions += msg.value;
        teamsContributions[sender][teamNumber] += msg.value;
        AddContributor(sender);
        return true;
    }

    function SingleMatchBet(address sender, uint256 matchNumber, uint256 result) public payable returns (bool) {
        if (result == 0) {
            //away wins
            matchesContributions[sender][result + 3 * matchNumber] += msg.value;
            matches[matchNumber].totalAwayWinContributions += msg.value;
            AddContributor(sender);
        } else if (result == 1) {
            //draw
            matchesContributions[sender][result + 3 * matchNumber] += msg.value;
            matches[matchNumber].totalDrawContributions += msg.value;
            AddContributor(sender);
        } else if (result == 2) {
            //home wins
            matchesContributions[sender][result + 3 * matchNumber] += msg.value;
            matches[matchNumber].totalHomeWinContributions += msg.value;
            AddContributor(sender);
        } else {
            revert();
        }

        matches[matchNumber].jackpot += msg.value;
        return true;
    }

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

    function SendoutSingleMatchReward(uint256 matchNumber) public {
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
                contribution = matchesContributions[contributor][matchNumber * 3 + 2] - matchesContributionsSent[contributor][matchNumber * 3 + 2];
                if (contribution>0) {
                    matchesContributionsSent[contributor][matchNumber * 3 + 2] += contribution;
                    dist = distJackpot * contribution / matches[matchNumber].totalHomeWinContributions;
                    if (!contributor.send(dist)) {
                        revert();
                    }
                }
            }
            matches[matchNumber].rewardSent = true;
        } else if (matches[matchNumber].homeScore == matches[matchNumber].awayScore && matches[matchNumber].totalDrawContributions > 0) {
            for (i=0; i<contributorsLength; i++) {
                contributor = allContributors[i];
                contribution = matchesContributions[contributor][matchNumber * 3 + 1] - matchesContributionsSent[contributor][matchNumber * 3 + 1];
                if (contribution>0) {
                    matchesContributionsSent[contributor][matchNumber * 3 + 1] += contribution;
                    dist = distJackpot * contribution / matches[matchNumber].totalDrawContributions;
                    if (!contributor.send(dist)) {
                        revert();
                    }
                }
            }
            matches[matchNumber].rewardSent = true;
        } else if (matches[matchNumber].homeScore < matches[matchNumber].awayScore && matches[matchNumber].totalAwayWinContributions > 0) {
            for (i=0; i<contributorsLength; i++) {
                contributor = allContributors[i];
                contribution = matchesContributions[contributor][matchNumber * 3] - matchesContributionsSent[contributor][matchNumber * 3];
                if (contribution>0) {
                    matchesContributionsSent[contributor][matchNumber * 3] += contribution;
                    dist = distJackpot * contribution / matches[matchNumber].totalAwayWinContributions;
                    if (!contributor.send(dist)) {
                        revert();
                    }
                }
            }
            matches[matchNumber].rewardSent = true;
        }
    }

    function SendoutChampionReward() public {
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
            contribution = teamsContributions[contributor][championNumber] - teamsContributionsSent[contributor][championNumber];
            if (contribution>0) {
                teamsContributionsSent[contributor][championNumber] += contribution;
                dist = distJackpot * contribution / teams[championNumber].totalContributions;
                if (!contributor.send(dist)) {
                    revert();
                }
            }
        }
        championRewardSent = true;
    }

    function SafetySendout(uint256 amount) public {
        if (msg.sender != founder) revert();

        founder.send(amount);
    }

    function () public payable {
    }

    //TODO: more to add
}
