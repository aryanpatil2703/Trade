// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title DataCoin
 * @dev ERC-721 token representing ownership of data assets
 * Each token points to a Lighthouse CID containing encrypted data
 */
contract DataCoin is ERC721, Ownable, ReentrancyGuard {
    uint256 public nextId;
    mapping(uint256 => string) public tokenCID;
    mapping(uint256 => address) public tokenSeller;
    mapping(uint256 => uint256) public tokenPrice;
    mapping(uint256 => bool) public tokenForSale;
    
    event DataCoinMinted(uint256 indexed tokenId, address indexed to, string cid);
    event DataCoinListed(uint256 indexed tokenId, uint256 price);
    event DataCoinSold(uint256 indexed tokenId, address indexed buyer, uint256 price);
    
    constructor() ERC721("DataCoin", "DATA") {}
    
    /**
     * @dev Mint a new DataCoin token
     * @param to Address to mint the token to
     * @param cid Lighthouse CID containing the encrypted data
     * @return tokenId The ID of the minted token
     */
    function mintDataCoin(address to, string calldata cid) external onlyOwner returns(uint256) {
        uint256 id = ++nextId;
        _safeMint(to, id);
        tokenCID[id] = cid;
        tokenSeller[id] = to;
        emit DataCoinMinted(id, to, cid);
        return id;
    }
    
    /**
     * @dev List a token for sale
     * @param tokenId The ID of the token to list
     * @param price The price in wei
     */
    function listForSale(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(price > 0, "Price must be greater than 0");
        
        tokenPrice[tokenId] = price;
        tokenForSale[tokenId] = true;
        emit DataCoinListed(tokenId, price);
    }
    
    /**
     * @dev Remove token from sale
     * @param tokenId The ID of the token to delist
     */
    function delistFromSale(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        tokenForSale[tokenId] = false;
    }
    
    /**
     * @dev Get the token URI (Lighthouse CID)
     * @param tokenId The ID of the token
     * @return The Lighthouse CID
     */
    function tokenURI(uint256 tokenId) public view override returns(string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenCID[tokenId];
    }
    
    /**
     * @dev Check if token exists
     * @param tokenId The ID of the token
     * @return Whether the token exists
     */
    function _exists(uint256 tokenId) internal view returns(bool) {
        return tokenId > 0 && tokenId <= nextId;
    }
}
