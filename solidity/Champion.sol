pragma solidity ^0.4.17;
//Xinle Yang
//small contract for people to bet on specific item.

import "./WorldcupFun.sol";

contract Champion {

    address public WorldcupFunAddress;
    uint256 public TeamNumber;

    //constructor
    function Champion(address wf, uint256 teamNumber) public {
        WorldcupFunAddress = wf;
        TeamNumber = teamNumber;
    }

    function() public payable {
        //TODO 
        //Need to make sure this function call is not expensive`
        //0) setup WorldcupFunContract
        WorldcupFun WorldcupFunContract = WorldcupFun(WorldcupFunAddress);
        //1) send all money to WorldcupFun address, record the sender address and betting information to WorldcupFun
        if (!WorldcupFunContract.ChampionBet.value(msg.value)(msg.sender, TeamNumber)) revert();
    }
}
