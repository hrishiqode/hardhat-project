// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender) external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function approve(address spender, uint256 value) external returns (bool);

  function transferFrom(address from, address to, uint256 value) external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}
contract ERC20 is IERC20{

    address public owner;
    uint256 public totalTokens;

    mapping (address => uint256) private balance;
    mapping (address => mapping (address => uint256)) private maximumAllowance;
    mapping (address => mapping (address => uint128)) private totalCalls;

    constructor(){
        totalTokens=1000;
        balance[msg.sender]=totalTokens;
        owner=msg.sender;
    }

    function approve(address _spender, uint256 _value) external returns (bool){
        maximumAllowance[msg.sender][_spender]=_value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    function allowance(address _owner, address _spender) external view returns (uint256){
        return maximumAllowance[_owner][_spender];
    }

    function doNFTSwap(bytes memory from, bytes memory to, uint256 _value) external returns (bool){
        address _from=abi.decode(from,(address));
        address _to=abi.decode(to,(address));
        transferFrom(_from, _to, _value);
        emit Transfer(_from,_to,_value);
        return true;
    }

    function totalSupply() public view returns(uint256){
        return totalTokens;
    }

    function balanceOf(address _owner) public view returns(uint256){
        return balance[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balance[msg.sender] >= _value, "Not enough balance");
        balance[msg.sender]=balance[msg.sender]-_value;
        balance[_to]=balance[_to]+_value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    function mint(address _to, uint256 _value) public {
        require(msg.sender==owner, "Not Authorized to mint coins");
        balance[_to]=balance[_to]+_value;
        totalTokens+=_value;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool){
        emit Transfer(_from,_to,_value);
        require(balance[_from] >= _value && _value <= maximumAllowance[_from][_to], "Not authorized for transfer");
        maximumAllowance[_from][_to]=maximumAllowance[_from][_to]-_value;
        balance[_from]=balance[_from]-_value;
        balance[_to]=balance[_to]+_value;
        emit Transfer(_from,_to,_value);
        return true;
    }
}