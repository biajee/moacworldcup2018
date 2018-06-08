pragma solidity ^0.4.17;
//Xinle Yang
//small contract for people to bet on specific item.

import "./WorldcupFun.sol";

contract ChampionBrazil {

    address public WorldcupFunAddress;

    //constructor
    function ChampionBrazil(address wf) public {
        WorldcupFunAddress = wf;
    }

    function() public payable {
        //TODO 
        //Need to make sure this function call is not expensive`
        //0) setup WorldcupFunContract
        WorldcupFun WorldcupFunContract = WorldcupFun(WorldcupFunAddress);
        //1) send all money to address in the WorldcupFun, record the sender address and betting information to WorldcupFun
        if (!WorldcupFunContract.ChampionBet.value(msg.value)(msg.sender, 51)) revert();
    }
}
