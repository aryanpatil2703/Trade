// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataCoin.sol";

/**
 * @title Marketplace
 * @dev Atomic swap marketplace for DataCoin tokens
 * Handles purchases, royalties, and validator attestations
 */
contract Marketplace is ReentrancyGuard, Ownable {
    DataCoin public dataCoin;
    
    uint256 public constant ROYALTY_PERCENTAGE = 250; // 2.5%
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 100; // 1%
    
    mapping(uint256 => string) public attestations; // tokenId => attestation CID
    mapping(address => uint256) public sellerBalances;
    
    event PurchaseCompleted(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event AttestationRecorded(uint256 indexed tokenId, string attestationCID);
    event Withdrawal(address indexed seller, uint256 amount);
    
    constructor(address _dataCoin) {
        dataCoin = DataCoin(_dataCoin);
    }
    
    /**
     * @dev Buy a DataCoin token (atomic swap)
     * @param tokenId The ID of the token to purchase
     */
    function buy(uint256 tokenId) external payable nonReentrant {
        require(dataCoin.tokenForSale(tokenId), "Token not for sale");
        require(dataCoin.ownerOf(tokenId) != msg.sender, "Cannot buy own token");
        
        uint256 price = dataCoin.tokenPrice(tokenId);
        require(msg.value >= price, "Insufficient payment");
        
        address seller = dataCoin.ownerOf(tokenId);
        
        // Calculate fees
        uint256 royalty = (price * ROYALTY_PERCENTAGE) / 10000;
        uint256 platformFee = (price * PLATFORM_FEE_PERCENTAGE) / 10000;
        uint256 sellerAmount = price - royalty - platformFee;
        
        // Transfer token to buyer
        dataCoin.transferFrom(seller, msg.sender, tokenId);
        
        // Update seller balance
        sellerBalances[seller] += sellerAmount;
        
        // Delist token
        dataCoin.delistFromSale(tokenId);
        
        // Refund excess payment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        
        emit PurchaseCompleted(tokenId, msg.sender, seller, price);
    }
    
    /**
     * @dev Record validator attestation
     * @param tokenId The ID of the token
     * @param attestationCID Lighthouse CID of the attestation
     */
    function recordAttestation(uint256 tokenId, string calldata attestationCID) external onlyOwner {
        attestations[tokenId] = attestationCID;
        emit AttestationRecorded(tokenId, attestationCID);
    }
    
    /**
     * @dev Withdraw seller balance
     */
    function withdraw() external nonReentrant {
        uint256 amount = sellerBalances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        
        sellerBalances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        
        emit Withdrawal(msg.sender, amount);
    }
    
    /**
     * @dev Get attestation for a token
     * @param tokenId The ID of the token
     * @return The attestation CID
     */
    function getAttestation(uint256 tokenId) external view returns(string memory) {
        return attestations[tokenId];
    }
    
    /**
     * @dev Emergency withdrawal (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
