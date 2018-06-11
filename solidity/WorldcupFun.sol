pragma solidity ^0.4.17;
//Xinle Yang
//The full contract handling betting and rewarding.

contract WorldcupFun {

    address public founder;

    uint256 public tokenRatio = 10000;
    string  public tokenSymbol = 'RUS18';

    uint256 public totalBonus           = 2000000;
    uint256 public accountBonusLimit    = 500000;
    uint256 public earlyBonusLimit      = 500000;
    uint256 public topBonusLimit        = 1000000;
    uint256 public unitAccountBonus     = 10;
    uint256 public unitEarlyBonus       = 1000;

    uint256 public contributionLowerBound = 1000;
    uint256 public contributionUpperBound = 1000000;

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

    struct Contribution {
        address contributor;
        uint256 id;
        uint256 contribution;
        uint256 timestamp;
    }

    address[] public allContributors;
    mapping (address => uint256) public allContributorsMap;
    mapping (address => uint256) public contributorsAccountBonus;
    mapping (address => uint256) public contributorsEarlyBonus;
    mapping (address => uint256) public contributorsTopBonus;
    address[] public allWinners;
    mapping (address => uint256) public allWinnersMap;

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

    function AddContributor(address contributor) public {
        if (allContributorsMap[contributor]==0) {
            allContributors.push(contributor);
        }
        allContributorsMap[contributor] += msg.value * tokenRatio;
    }

    function AddMatch(uint256 matchNumber, uint256 homeTeamNumber, uint256 awayTeamNumber, uint256 startTime) public returns (bool) {
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

    function AddTeam(uint256 teamNumber, string teamName) public returns (bool) {
        if (msg.sender != founder) revert();

        teams[teamNumber].teamNumber = teamNumber;
        teams[teamNumber].teamName = teamName;
        return true;
    }

    function FinalizeMatch(uint256 matchNumber, uint256 homeScore, uint256 awayScore) public returns (bool) {
        if (msg.sender != founder) revert();
        if (matches[matchNumber].matchNumber == 0) revert();

        matches[matchNumber].homeScore = homeScore;
        matches[matchNumber].awayScore = awayScore;
        matches[matchNumber].finished = true;

        return true;
    }

    function ChampionBet(address sender, uint256 teamNumber) public payable returns (bool) {
        if (teams[teamNumber].teamNumber == 0) revert();
        if (msg.value < 1000000000000000000 * contributionLowerBound / tokenRatio) revert();
        if (msg.value > 1000000000000000000 * contributionUpperBound / tokenRatio) revert();
        if (matches[57].startTime < now + 600) revert(); //before the first game of final 8

        if (accountBonusLimit >= unitAccountBonus && contributorsAccountBonus[sender] == 0) {
            contributorsAccountBonus[sender] = unitAccountBonus;
            accountBonusLimit -= unitAccountBonus;
            championJackpot += unitAccountBonus;
            teams[teamNumber].totalContributions += unitAccountBonus;
            teamsContributions[sender][teamNumber] += unitAccountBonus;
        }
        if (earlyBonusLimit >= unitEarlyBonus && contributorsEarlyBonus[sender] == 0) {
            contributorsEarlyBonus[sender] = unitEarlyBonus;
            earlyBonusLimit -= unitEarlyBonus;
            championJackpot += contributorsEarlyBonus[sender];
            teams[teamNumber].totalContributions += contributorsEarlyBonus[sender];
            teamsContributions[sender][teamNumber] += contributorsEarlyBonus[sender];
        }

        championJackpot += msg.value * tokenRatio;
        teams[teamNumber].totalContributions += msg.value * tokenRatio;
        teamsContributions[sender][teamNumber] += msg.value * tokenRatio;
        AddContributor(sender);
        return true;
    }

    function SingleMatchBet(address sender, uint256 matchNumber, uint256 result) public payable returns (bool) {
        if (msg.value < 1000000000000000000 * contributionLowerBound / tokenRatio) revert();
        if (msg.value > 1000000000000000000 * contributionUpperBound / tokenRatio) revert();
        if (matches[matchNumber].startTime == 0) revert();
        if (matches[matchNumber].startTime < now + 600) revert();

        if (result == 0) {
            //away wins
            if (accountBonusLimit >= unitAccountBonus && contributorsAccountBonus[sender] == 0) {
                contributorsAccountBonus[sender] = unitAccountBonus;
                accountBonusLimit -= unitAccountBonus;
                matches[matchNumber].jackpot += unitAccountBonus;
                matchesContributions[sender][result + 3 * matchNumber] += unitAccountBonus;
                matches[matchNumber].totalAwayWinContributions += unitAccountBonus;
            }
            if (earlyBonusLimit >= unitEarlyBonus && contributorsEarlyBonus[sender] == 0) {
                contributorsEarlyBonus[sender] = unitEarlyBonus;
                earlyBonusLimit -= unitEarlyBonus;
                matches[matchNumber].jackpot += unitEarlyBonus;
                matchesContributions[sender][result + 3 * matchNumber] += unitEarlyBonus;
                matches[matchNumber].totalAwayWinContributions += unitEarlyBonus;
            }

            matchesContributions[sender][result + 3 * matchNumber] += msg.value * tokenRatio;
            matches[matchNumber].totalAwayWinContributions += msg.value * tokenRatio;
            AddContributor(sender);
        } else if (result == 1) {
            //draw
            if (accountBonusLimit >= unitAccountBonus && contributorsAccountBonus[sender] == 0) {
                contributorsAccountBonus[sender] = unitAccountBonus;
                accountBonusLimit -= unitAccountBonus;
                matches[matchNumber].jackpot += unitAccountBonus;
                matchesContributions[sender][result + 3 * matchNumber] += unitAccountBonus;
                matches[matchNumber].totalDrawContributions += unitAccountBonus;
            }
            if (earlyBonusLimit >= unitEarlyBonus && contributorsEarlyBonus[sender] == 0) {
                contributorsEarlyBonus[sender] = unitEarlyBonus;
                earlyBonusLimit -= unitEarlyBonus;
                matches[matchNumber].jackpot += unitEarlyBonus;
                matchesContributions[sender][result + 3 * matchNumber] += unitEarlyBonus;
                matches[matchNumber].totalDrawContributions += unitEarlyBonus;
            }
            
            matchesContributions[sender][result + 3 * matchNumber] += msg.value * tokenRatio;
            matches[matchNumber].totalDrawContributions += msg.value * tokenRatio;
            AddContributor(sender);
        } else if (result == 2) {
            //home wins
            if (accountBonusLimit >= unitAccountBonus && contributorsAccountBonus[sender] == 0) {
                contributorsAccountBonus[sender] = unitAccountBonus;
                accountBonusLimit -= unitAccountBonus;
                matches[matchNumber].jackpot += unitAccountBonus;
                matchesContributions[sender][result + 3 * matchNumber] += unitAccountBonus;
                matches[matchNumber].totalHomeWinContributions += unitAccountBonus;
            }
            if (earlyBonusLimit >= unitEarlyBonus && contributorsEarlyBonus[sender] == 0) {
                contributorsEarlyBonus[sender] = unitEarlyBonus;
                earlyBonusLimit -= unitEarlyBonus;
                matches[matchNumber].jackpot += unitEarlyBonus;
                matchesContributions[sender][result + 3 * matchNumber] += unitEarlyBonus;
                matches[matchNumber].totalHomeWinContributions += unitEarlyBonus;
            }
            
            matchesContributions[sender][result + 3 * matchNumber] += msg.value * tokenRatio;
            matches[matchNumber].totalHomeWinContributions += msg.value * tokenRatio;
            AddContributor(sender);
        } else {
            revert();
        }

        matches[matchNumber].jackpot += msg.value * tokenRatio;
        return true;
    }

    function SetChampion(uint256 teamNumber) public {
        if (msg.sender != founder) revert();
        if (teams[teamNumber].teamNumber == 0) revert();
        
        championNumber = teamNumber;
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
        uint256 bonus = 0;
        if (matches[matchNumber].homeScore > matches[matchNumber].awayScore && matches[matchNumber].totalHomeWinContributions > 0) {
            for (i=0; i<contributorsLength; i++) {
                contributor = allContributors[i];
                contribution = matchesContributions[contributor][matchNumber * 3 + 2] - matchesContributionsSent[contributor][matchNumber * 3 + 2];
                if (contribution>0) {
                    matchesContributionsSent[contributor][matchNumber * 3 + 2] += contribution;
                    dist = distJackpot * contribution / matches[matchNumber].totalHomeWinContributions / tokenRatio;
                    bonus = allContributorsBonus[contributor] - allContributorsBonusSent[contributor];
                    if (bonus > 0) {
                        allContributorsBonusSent[contributor] = allContributorsBonus[contributor];
                        dist += bonus / tokenRatio;
                    }
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
                    dist = distJackpot * contribution / matches[matchNumber].totalDrawContributions / tokenRatio;
                    bonus = allContributorsBonus[contributor] - allContributorsBonusSent[contributor];
                    if (bonus > 0) {
                        allContributorsBonusSent[contributor] = allContributorsBonus[contributor];
                        dist += bonus / tokenRatio;
                    }
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
                    dist = distJackpot * contribution / matches[matchNumber].totalAwayWinContributions / tokenRatio;
                    bonus = allContributorsBonus[contributor] - allContributorsBonusSent[contributor];
                    if (bonus > 0) {
                        allContributorsBonusSent[contributor] = allContributorsBonus[contributor];
                        dist += bonus / tokenRatio;
                    }
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
        uint256 bonus = 0;
        for (uint256 i=0; i<contributorsLength; i++) {
            contributor = allContributors[i];
            contribution = teamsContributions[contributor][championNumber] - teamsContributionsSent[contributor][championNumber];
            if (contribution>0) {
                teamsContributionsSent[contributor][championNumber] += contribution;
                dist = distJackpot * contribution / teams[championNumber].totalContributions / tokenRatio;
                bonus = allContributorsBonus[contributor] - allContributorsBonusSent[contributor];
                if (bonus > 0) {
                    allContributorsBonusSent[contributor] = allContributorsBonus[contributor];
                    dist += bonus / tokenRatio;
                }
                if (!contributor.send(dist)) {
                    revert();
                }
            }
        }
        championRewardSent = true;
    }

    function SendoutTopBonus() public {
        if (msg.sender != founder) revert();

        //top 10 winners will get the top bonus
        uint256 i = allWinners.length;
        if (i > 10) {
            i = 10;
        }

        uint256 totalWin = 0;
        uint256 j = 0;
        address winner;
        uint256 winAmount = 0;
        uint256 dist = 0;
        for (j=0; j<i; j++) {
            winner = allWinners[j];
            totalWin += allWinnersMap[winner];
        }
        for (j=0; j<i; j++) {
            winner = allWinners[j];
            winAmount = allWinnersMap[winner];
            dist = winAmount * topBonusLimit / totalWin / tokenRatio;
            if (dist * tokenRatio < topBonusLimit) {
                if (!winner.send(dist)) {
                    revert();
                }
            }

        }

    }

    function SafetySendout(uint256 amount) public {
        if (msg.sender != founder) revert();

        founder.send(amount);
    }

    function () public payable {
        founder.send(msg.value);
    }

    //TODO: more to add
}
