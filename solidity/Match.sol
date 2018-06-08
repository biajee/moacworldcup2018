pragma solidity ^0.4.17;
//Xinle Yang
//small contract for people to bet on specific item.

import "./WorldcupFun.sol";

contract Match {

    address public WorldcupFunAddress;
    uint256 public MatchNumber;
    uint256 public Result;

    //constructor
    function Match(address wf, uint256 matchNumber, uint256 result) public {
        WorldcupFunAddress = wf;
        MatchNumber = matchNumber;
        Result = result;
    }

    function() public payable {
        //TODO 
        //Need to make sure this function call is not expensive`
        //0) setup WorldcupFunContract
        WorldcupFun WorldcupFunContract = WorldcupFun(WorldcupFunAddress);
        //1) send all money to address in the WorldcupFun
        if (!WorldcupFunContract.SingleMatchBet.value(msg.value)(msg.sender, MatchNumber, Result)) revert();
    }
}
