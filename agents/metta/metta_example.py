#!/usr/bin/env python3

"""
MeTTa Knowledge Graph Integration Example
Demonstrates how to store and query dataset metadata using MeTTa
"""

import json
import requests
from typing import List, Dict, Any, Optional
from datetime import datetime

class MettaClient:
    """Client for interacting with MeTTa knowledge graph"""
    
    def __init__(self, endpoint: str = None, api_key: str = None):
        self.endpoint = endpoint or "http://localhost:3001/api/metta"
        self.api_key = api_key
        self.session = requests.Session()
        
        if self.api_key:
            self.session.headers.update({
                'Authorization': f'Bearer {self.api_key}'
            })
    
    def store_dataset(self, dataset: Dict[str, Any]) -> bool:
        """Store dataset metadata in MeTTa knowledge graph"""
        try:
            response = self.session.post(
                f"{self.endpoint}/store",
                json=dataset,
                timeout=30
            )
            response.raise_for_status()
            return True
        except Exception as e:
            print(f"Failed to store dataset: {e}")
            return False
    
    def query_datasets(self, **filters) -> List[Dict[str, Any]]:
        """Query datasets based on filters"""
        try:
            response = self.session.post(
                f"{self.endpoint}/search",
                json=filters,
                timeout=30
            )
            response.raise_for_status()
            return response.json().get('datasets', [])
        except Exception as e:
            print(f"Failed to query datasets: {e}")
            return []
    
    def get_dataset(self, token_id: str) -> Optional[Dict[str, Any]]:
        """Get specific dataset by token ID"""
        try:
            response = self.session.get(
                f"{self.endpoint}/dataset/{token_id}",
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Failed to get dataset: {e}")
            return None
    
    def update_validation(self, token_id: str, validation_data: Dict[str, Any]) -> bool:
        """Update validation status for a dataset"""
        try:
            response = self.session.put(
                f"{self.endpoint}/dataset/{token_id}/validation",
                json=validation_data,
                timeout=30
            )
            response.raise_for_status()
            return True
        except Exception as e:
            print(f"Failed to update validation: {e}")
            return False
    
    def get_provenance(self, token_id: str) -> Optional[Dict[str, Any]]:
        """Get provenance information for a dataset"""
        try:
            response = self.session.get(
                f"{self.endpoint}/dataset/{token_id}/provenance",
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Failed to get provenance: {e}")
            return None

def load_kg_data(file_path: str) -> List[Dict[str, Any]]:
    """Load knowledge graph data from file"""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Failed to load KG data: {e}")
        return []

def demonstrate_queries(client: MettaClient):
    """Demonstrate various query patterns"""
    print("🔍 Demonstrating MeTTa Knowledge Graph Queries")
    print("=" * 50)
    
    # Query 1: Find datasets by category
    print("\n1. Find Computer Vision datasets:")
    cv_datasets = client.query_datasets(category="Computer Vision")
    for dataset in cv_datasets:
        print(f"   - {dataset['metadata']['name']} (Token: {dataset['tokenId']})")
    
    # Query 2: Find verified datasets
    print("\n2. Find verified datasets:")
    verified_datasets = client.query_datasets(validation_status="verified")
    for dataset in verified_datasets:
        print(f"   - {dataset['metadata']['name']} (Score: {dataset['validation']['score']})")
    
    # Query 3: Find high-quality datasets
    print("\n3. Find high-quality datasets (score >= 80):")
    quality_datasets = client.query_datasets(min_quality_score=80)
    for dataset in quality_datasets:
        print(f"   - {dataset['metadata']['name']} (Score: {dataset['validation']['score']})")
    
    # Query 4: Find datasets by seller
    print("\n4. Find datasets by specific seller:")
    seller_datasets = client.query_datasets(seller="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6")
    for dataset in seller_datasets:
        print(f"   - {dataset['metadata']['name']} (Category: {dataset['metadata']['category']})")
    
    # Query 5: Find datasets by size
    print("\n5. Find large datasets (>1GB):")
    large_datasets = client.query_datasets(min_size="1GB")
    for dataset in large_datasets:
        print(f"   - {dataset['metadata']['name']} (Size: {dataset['metadata']['size']})")

def demonstrate_updates(client: MettaClient):
    """Demonstrate updating dataset information"""
    print("\n🔄 Demonstrating MeTTa Knowledge Graph Updates")
    print("=" * 50)
    
    # Update validation for a dataset
    token_id = "1"
    validation_data = {
        "status": "verified",
        "score": 95,
        "attestationCID": "QmNewAttestation123",
        "validator": "0xNewValidator123",
        "timestamp": datetime.now().isoformat()
    }
    
    success = client.update_validation(token_id, validation_data)
    if success:
        print(f"✅ Updated validation for token {token_id}")
    else:
        print(f"❌ Failed to update validation for token {token_id}")
    
    # Get updated dataset
    dataset = client.get_dataset(token_id)
    if dataset:
        print(f"📊 Updated dataset: {dataset['metadata']['name']}")
        print(f"   Quality Score: {dataset['validation']['score']}")
        print(f"   Status: {dataset['validation']['status']}")

def main():
    """Main demonstration function"""
    print("🧠 MeTTa Knowledge Graph Integration Demo")
    print("=" * 50)
    
    # Initialize MeTTa client
    client = MettaClient()
    
    # Load example data
    kg_data = load_kg_data('example_mettta.kg')
    if not kg_data:
        print("❌ No knowledge graph data found")
        return
    
    print(f"📚 Loaded {len(kg_data)} datasets from knowledge graph")
    
    # Store datasets in MeTTa (simulated)
    print("\n💾 Storing datasets in MeTTa...")
    for dataset in kg_data:
        success = client.store_dataset(dataset)
        if success:
            print(f"   ✅ Stored: {dataset['metadata']['name']}")
        else:
            print(f"   ❌ Failed to store: {dataset['metadata']['name']}")
    
    # Demonstrate queries
    demonstrate_queries(client)
    
    # Demonstrate updates
    demonstrate_updates(client)
    
    print("\n🎉 MeTTa Knowledge Graph demo completed!")

if __name__ == "__main__":
    main()
