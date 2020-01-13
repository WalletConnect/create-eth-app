pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title Create Eth App ERC-20 Token
 * @notice Sourced from OpenZeppelin and modified so that anyone can mint.
 */
contract CeaErc20 is ERC20, ERC20Detailed {
    constructor() public ERC20Detailed("CeaErc20", "CEAERC20", 18) {}

    /**
    * @dev Function to mint tokens
    * @param to The address that will receive the minted tokens.
    * @param value The amount of tokens to mint.
    * @return A boolean that indicates if the operation was successful.
    */
    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }
}
