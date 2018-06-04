pragma solidity ^0.4.17;
//Xinle Yang
//The full contract handling betting and rewarding.

import "./WorldcupFun.sol";

contract WorldcupFun {

    //constructor
    function WorldcupFun() public {
        //TODO: do necessary constructor stuff
    }

    function ChampionBet(address sender, uint256 amount, uint team) public returns (bool successful) {
        //TODO: add betting action into data here
    }

    function SingleMatchBet(address sender, uint256 amount, uint matchNumber, uint result) public returns (bool successful) {
        //TODO: add betting action into data here
    }

    function AddMatch(uint matchNumber, uint homeTeamNumber, uint awayTeamNumber, uint256 startTime, uint256 endTime) public returns (bool successful) {
        //TODO
    }

    function SendoutSingleMatchReward() {

    }

    function SendoutChampionReward() {

    }

    //TODO: more to add
}
