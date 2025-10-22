# Demo Script - Real-World Data Marketplace

This script provides step-by-step instructions for demonstrating the complete data marketplace workflow.

## 🎬 Demo Overview

**Duration**: 90-120 seconds  
**Audience**: Judges and evaluators  
**Goal**: Demonstrate end-to-end data marketplace functionality

## 📋 Pre-Demo Setup

### Required Environment

1. **Frontend Application**: Running on `http://localhost:3000`
2. **Backend API**: Running on `http://localhost:3001`
3. **Wallet Connected**: MetaMask connected to Mumbai testnet
4. **Test Data**: Sample datasets and transactions ready

### Test Data Preparation

- **Sample Dataset**: `./data/sample_dataset.csv`
- **Metadata**: `./data/dataset_metadata.json`
- **Test Transactions**: 3 confirmed transactions on Blockscout
- **Agent Responses**: Pre-configured agent responses for demo

## 🎯 Demo Script

### Step 1: Introduction (10 seconds)

**Narrator**: "Welcome to the Real-World Data Marketplace for AI Agents. This platform enables secure, token-gated access to AI training data using Lighthouse, Blockscout, and Fetch.ai agents."

**Action**: Open the frontend application at `http://localhost:3000`

**Show**: 
- Clean, modern interface
- "DataCoin Marketplace" header
- Available dataset listings

### Step 2: Dataset Discovery (20 seconds)

**Narrator**: "Let's discover relevant datasets using our AI agent assistant."

**Action**: Click on "🤖 Agent Chat" button

**Show**:
- Chat interface opens
- Type: "Find computer vision datasets for object detection"
- Press Enter

**Expected Response**: Agent provides 3 relevant datasets with details

**Narrator**: "The AI agent has found relevant datasets and provided recommendations based on your query."

### Step 3: Dataset Information (15 seconds)

**Narrator**: "Let's examine a specific dataset in detail."

**Action**: Click on the first dataset from the agent recommendations

**Show**:
- Dataset detail page
- Sample data preview
- Metadata information
- Lighthouse CID and 1MB DataCoin link

**Narrator**: "Here we can see the dataset metadata, sample data, and storage information."

### Step 4: Provenance Verification (20 seconds)

**Narrator**: "Now let's verify the dataset's provenance and authenticity."

**Action**: Click "🔍 Verify Provenance" button

**Show**:
- Loading state
- Blockscout SDK inline card appears
- Transaction details displayed
- Click "Open in Explorer" link

**Narrator**: "The Blockscout integration shows the complete transaction history and verification status."

**Action**: Open Blockscout instance in new tab

**Show**:
- Blockscout instance with transaction details
- Confirmation status
- Gas usage and block information

### Step 5: Purchase Process (25 seconds)

**Narrator**: "Let's purchase the dataset using our connected wallet."

**Action**: Click "💰 Buy Dataset" button

**Show**:
- Wallet connection prompt (if not connected)
- Transaction confirmation dialog
- MetaMask transaction popup
- Transaction pending state

**Narrator**: "The purchase is processed through our smart contract with atomic swap functionality."

**Action**: Confirm transaction in MetaMask

**Show**:
- Transaction confirmation
- Success message
- Updated UI showing ownership

### Step 6: Token-Gated Access (20 seconds)

**Narrator**: "Now let's verify that only the token holder can access the data."

**Action**: Click "📥 Download Sample" button

**Show**:
- Token verification process
- Successful decryption
- Sample data download
- Access granted message

**Narrator**: "The token-gated access control ensures only the token holder can decrypt and access the data."

### Step 7: Agent Validation (15 seconds)

**Narrator**: "Finally, let's see our validator agent in action."

**Action**: Return to chat interface

**Show**:
- Type: "Validate the quality of the dataset I just purchased"
- Agent response with validation results
- Attestation information

**Narrator**: "The validator agent has performed quality checks and created an attestation record."

## 🎥 Recording Tips

### Camera Setup

- **Screen Recording**: Use high-quality screen recording software
- **Audio**: Clear narration with good microphone
- **Resolution**: 1080p minimum for clarity
- **Frame Rate**: 30fps for smooth playback

### Recording Checklist

- [ ] **Screen Resolution**: Set to 1920x1080
- [ ] **Browser**: Use Chrome or Firefox
- [ ] **Extensions**: Disable unnecessary extensions
- [ ] **Notifications**: Turn off system notifications
- [ ] **Audio**: Test microphone levels

### Post-Production

- [ ] **Trim**: Remove any dead time
- [ ] **Audio**: Ensure clear narration
- [ ] **Quality**: Check video quality
- [ ] **Length**: Keep under 2 minutes
- [ ] **Format**: Export as MP4

## 🔧 Troubleshooting

### Common Issues

**Issue**: Wallet not connecting
**Solution**: Refresh page and reconnect wallet

**Issue**: Transaction failing
**Solution**: Check Mumbai testnet connection and gas fees

**Issue**: Agent not responding
**Solution**: Check backend API status

**Issue**: Blockscout not loading
**Solution**: Verify Autoscout instance is running

### Backup Plans

1. **Pre-recorded Demo**: Have a backup video ready
2. **Screenshot Sequence**: Prepare static images as fallback
3. **Live Demo**: Practice the demo multiple times
4. **Technical Support**: Have team member available for issues

## 📊 Demo Metrics

### Success Indicators

- [ ] **Smooth Flow**: No technical interruptions
- [ ] **Clear Audio**: Narrator is audible and clear
- [ ] **Visual Quality**: All text and UI elements visible
- [ ] **Timing**: Stays within 90-120 second limit
- [ ] **Completeness**: All major features demonstrated

### Key Points to Highlight

1. **Token-Gated Access**: Emphasize security and access control
2. **AI Agent Integration**: Show intelligent assistance
3. **Provenance Tracking**: Demonstrate transparency
4. **Decentralized Storage**: Highlight Lighthouse integration
5. **Blockchain Verification**: Show Blockscout integration

## 🎯 Final Notes

### Demo Success Criteria

- [ ] All major features demonstrated
- [ ] Technical issues resolved
- [ ] Clear narration throughout
- [ ] Professional presentation
- [ ] Within time limit

### Post-Demo

- [ ] **Q&A Ready**: Prepare for questions
- [ ] **Technical Details**: Know the architecture
- [ ] **Future Plans**: Discuss roadmap
- [ ] **Challenges**: Be honest about limitations
- [ ] **Innovation**: Highlight unique features

## 📞 Support

If you encounter issues during the demo:

1. **Technical Issues**: Check the troubleshooting section
2. **Setup Problems**: Review the pre-demo setup
3. **Recording Issues**: Test recording setup beforehand
4. **Content Questions**: Review the project documentation

Remember: The goal is to demonstrate a working, innovative data marketplace that showcases the power of decentralized technologies for AI data exchange.
