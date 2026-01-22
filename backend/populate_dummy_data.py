#!/usr/bin/env python3
"""
Populate Database with Dummy Data for Nyaay Sathi
Creates law firms, lawyers, firm lawyers, clients, cases, and applications
"""

import asyncio
import os
import sys
from pathlib import Path
from datetime import datetime, timezone, timedelta
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Add backend to path
ROOT_DIR = Path(__file__).parent
sys.path.insert(0, str(ROOT_DIR))

load_dotenv(ROOT_DIR / '.env')

from services.auth import hash_password

# Database connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


# Dummy Data
LAW_FIRMS = [
    {
        "firm_name": "Shah & Associates",
        "email": "contact@shahandassociates.com",
        "phone": "+91 9876543210",
        "specialization": ["Civil Law", "Criminal Law", "Corporate Law"],
        "address": "123 Legal Plaza, Connaught Place, New Delhi - 110001",
        "city": "Delhi",
        "state": "Delhi",
        "bar_council_registration": "DEL/2010/12345",
        "established_year": 2010,
        "total_lawyers": 15
    },
    {
        "firm_name": "Mehta Legal Solutions",
        "email": "info@mehtalegal.com",
        "phone": "+91 9876543211",
        "specialization": ["Family Law", "Property Law", "Consumer Rights"],
        "address": "456 Law Street, Bandra West, Mumbai - 400050",
        "city": "Mumbai",
        "state": "Maharashtra",
        "bar_council_registration": "MUM/2012/67890",
        "established_year": 2012,
        "total_lawyers": 10
    },
    {
        "firm_name": "Reddy & Partners",
        "email": "contact@reddypartners.com",
        "phone": "+91 9876543212",
        "specialization": ["Corporate Law", "Intellectual Property", "Tax Law"],
        "address": "789 Business Park, Hitech City, Hyderabad - 500081",
        "city": "Hyderabad",
        "state": "Telangana",
        "bar_council_registration": "HYD/2015/11223",
        "established_year": 2015,
        "total_lawyers": 20
    },
    {
        "firm_name": "Kumar Law Chambers",
        "email": "info@kumarlawchambers.com",
        "phone": "+91 9876543213",
        "specialization": ["Criminal Law", "Civil Law", "Labor Law"],
        "address": "321 Court Road, MG Road, Bangalore - 560001",
        "city": "Bangalore",
        "state": "Karnataka",
        "bar_council_registration": "BLR/2008/44556",
        "established_year": 2008,
        "total_lawyers": 12
    },
    {
        "firm_name": "Patel & Co Legal Advisors",
        "email": "contact@patellegal.com",
        "phone": "+91 9876543214",
        "specialization": ["Real Estate Law", "Business Law", "Contract Law"],
        "address": "555 Commerce Tower, SG Highway, Ahmedabad - 380015",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "bar_council_registration": "AHD/2013/77889",
        "established_year": 2013,
        "total_lawyers": 8
    }
]

LAWYERS = [
    {
        "full_name": "Adv. Priya Sharma",
        "email": "priya.sharma@shahandassociates.com",
        "phone": "+91 9876543220",
        "specialization": "Civil Law",
        "experience_years": 12,
        "bar_council_number": "DEL/ADV/2012/001",
        "education": "LLB from Delhi University, LLM from National Law School",
        "languages": ["Hindi", "English", "Punjabi"],
        "city": "Delhi",
        "state": "Delhi"
    },
    {
        "full_name": "Adv. Rajesh Verma",
        "email": "rajesh.verma@mehtalegal.com",
        "phone": "+91 9876543221",
        "specialization": "Family Law",
        "experience_years": 8,
        "bar_council_number": "MUM/ADV/2016/002",
        "education": "LLB from Mumbai University",
        "languages": ["Hindi", "English", "Marathi"],
        "city": "Mumbai",
        "state": "Maharashtra"
    },
    {
        "full_name": "Adv. Sanjay Reddy",
        "email": "sanjay.reddy@reddypartners.com",
        "phone": "+91 9876543222",
        "specialization": "Corporate Law",
        "experience_years": 15,
        "bar_council_number": "HYD/ADV/2009/003",
        "education": "LLB, LLM in Corporate Law from Osmania University",
        "languages": ["Telugu", "English", "Hindi"],
        "city": "Hyderabad",
        "state": "Telangana"
    },
    {
        "full_name": "Adv. Anita Kumar",
        "email": "anita.kumar@kumarlawchambers.com",
        "phone": "+91 9876543223",
        "specialization": "Criminal Law",
        "experience_years": 10,
        "bar_council_number": "BLR/ADV/2014/004",
        "education": "LLB from Bangalore University, Specialization in Criminal Law",
        "languages": ["Kannada", "English", "Hindi"],
        "city": "Bangalore",
        "state": "Karnataka"
    },
    {
        "full_name": "Adv. Vikram Patel",
        "email": "vikram.patel@patellegal.com",
        "phone": "+91 9876543224",
        "specialization": "Real Estate Law",
        "experience_years": 14,
        "bar_council_number": "AHD/ADV/2010/005",
        "education": "LLB from Gujarat University, MBA in Real Estate",
        "languages": ["Gujarati", "English", "Hindi"],
        "city": "Ahmedabad",
        "state": "Gujarat"
    },
    {
        "full_name": "Adv. Meera Desai",
        "email": "meera.desai@shahandassociates.com",
        "phone": "+91 9876543225",
        "specialization": "Property Law",
        "experience_years": 9,
        "bar_council_number": "DEL/ADV/2015/006",
        "education": "LLB from Delhi University",
        "languages": ["Hindi", "English"],
        "city": "Delhi",
        "state": "Delhi"
    },
    {
        "full_name": "Adv. Arjun Nair",
        "email": "arjun.nair@mehtalegal.com",
        "phone": "+91 9876543226",
        "specialization": "Consumer Rights",
        "experience_years": 6,
        "bar_council_number": "MUM/ADV/2018/007",
        "education": "LLB from Mumbai University",
        "languages": ["Malayalam", "English", "Hindi", "Marathi"],
        "city": "Mumbai",
        "state": "Maharashtra"
    }
]

FIRM_LAWYERS = [
    {
        "full_name": "Adv. Neha Gupta",
        "email": "neha.gupta@shahandassociates.com",
        "phone": "+91 9876543230",
        "firm_name": "Shah & Associates",
        "specialization": "Civil Law",
        "experience_years": 5,
        "bar_council_number": "DEL/ADV/2019/101",
        "education": "LLB from Amity Law School",
        "languages": ["Hindi", "English"],
        "bio": "Specializing in civil litigation with focus on property disputes and contract law."
    },
    {
        "full_name": "Adv. Rahul Singh",
        "email": "rahul.singh@mehtalegal.com",
        "phone": "+91 9876543231",
        "firm_name": "Mehta Legal Solutions",
        "specialization": "Family Law",
        "experience_years": 4,
        "bar_council_number": "MUM/ADV/2020/102",
        "education": "LLB from Government Law College, Mumbai",
        "languages": ["Hindi", "English", "Marathi"],
        "bio": "Expert in family law matters including divorce, custody, and inheritance cases."
    },
    {
        "full_name": "Adv. Kavya Krishnan",
        "email": "kavya.krishnan@reddypartners.com",
        "phone": "+91 9876543232",
        "firm_name": "Reddy & Partners",
        "specialization": "Intellectual Property",
        "experience_years": 7,
        "bar_council_number": "HYD/ADV/2017/103",
        "education": "LLB, LLM in IP Law from NALSAR",
        "languages": ["Telugu", "English", "Tamil"],
        "bio": "Specialized in patent law, trademark registration, and IP litigation."
    },
    {
        "full_name": "Adv. Amit Joshi",
        "email": "amit.joshi@kumarlawchambers.com",
        "phone": "+91 9876543233",
        "firm_name": "Kumar Law Chambers",
        "specialization": "Labor Law",
        "experience_years": 8,
        "bar_council_number": "BLR/ADV/2016/104",
        "education": "LLB from National Law School, Bangalore",
        "languages": ["Kannada", "English", "Hindi"],
        "bio": "Experienced in employment law, industrial disputes, and labor compliance."
    },
    {
        "full_name": "Adv. Pooja Shah",
        "email": "pooja.shah@patellegal.com",
        "phone": "+91 9876543234",
        "firm_name": "Patel & Co Legal Advisors",
        "specialization": "Contract Law",
        "experience_years": 6,
        "bar_council_number": "AHD/ADV/2018/105",
        "education": "LLB from Gujarat University, Diploma in Business Law",
        "languages": ["Gujarati", "English", "Hindi"],
        "bio": "Focuses on commercial contracts, business agreements, and dispute resolution."
    }
]

CLIENTS = [
    {
        "full_name": "Rajesh Kumar",
        "email": "rajesh.kumar@example.com",
        "phone": "+91 9876540001",
        "case_type": "civil"
    },
    {
        "full_name": "Sunita Devi",
        "email": "sunita.devi@example.com",
        "phone": "+91 9876540002",
        "case_type": "family"
    },
    {
        "full_name": "Amit Patel",
        "email": "amit.patel@example.com",
        "phone": "+91 9876540003",
        "case_type": "property"
    },
    {
        "full_name": "Priya Reddy",
        "email": "priya.reddy@example.com",
        "phone": "+91 9876540004",
        "case_type": "corporate"
    },
    {
        "full_name": "Vikram Singh",
        "email": "vikram.singh@example.com",
        "phone": "+91 9876540005",
        "case_type": "criminal"
    }
]


async def clear_existing_data():
    """Clear existing dummy data"""
    print("🗑️  Clearing existing data...")
    await db.users.delete_many({"email": {"$regex": "@example.com|@shahandassociates.com|@mehtalegal.com|@reddypartners.com|@kumarlawchambers.com|@patellegal.com"}})
    await db.lawyer_applications.delete_many({})
    await db.lawfirm_applications.delete_many({})
    await db.firm_lawyer_applications.delete_many({})
    await db.firm_client_applications.delete_many({})
    print("✅ Existing data cleared")


async def create_law_firms():
    """Create law firm users"""
    print("\n🏢 Creating Law Firms...")
    created_firms = []
    
    for firm in LAW_FIRMS:
        firm_id = str(uuid.uuid4())
        password = hash_password("LawFirm@123")
        
        firm_user = {
            "id": firm_id,
            "email": firm["email"],
            "password": password,
            "full_name": firm["firm_name"],
            "user_type": "law_firm",
            "phone": firm["phone"],
            "firm_name": firm["firm_name"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "is_approved": True,
            "specialization": firm["specialization"],
            "address": firm["address"],
            "city": firm["city"],
            "state": firm["state"],
            "bar_council_registration": firm["bar_council_registration"],
            "established_year": firm["established_year"],
            "total_lawyers": firm["total_lawyers"]
        }
        
        await db.users.insert_one(firm_user)
        created_firms.append({"id": firm_id, "name": firm["firm_name"], "email": firm["email"]})
        print(f"   ✅ Created: {firm['firm_name']} (Email: {firm['email']}, Password: LawFirm@123)")
    
    return created_firms


async def create_lawyers():
    """Create independent lawyer users"""
    print("\n👨‍⚖️ Creating Independent Lawyers...")
    created_lawyers = []
    
    for lawyer in LAWYERS:
        lawyer_id = str(uuid.uuid4())
        password = hash_password("Lawyer@123")
        
        lawyer_user = {
            "id": lawyer_id,
            "email": lawyer["email"],
            "password": password,
            "full_name": lawyer["full_name"],
            "user_type": "lawyer",
            "phone": lawyer["phone"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "is_approved": True,
            "specialization": lawyer["specialization"],
            "experience_years": lawyer["experience_years"],
            "bar_council_number": lawyer["bar_council_number"],
            "education": lawyer["education"],
            "languages": lawyer["languages"],
            "city": lawyer["city"],
            "state": lawyer["state"]
        }
        
        await db.users.insert_one(lawyer_user)
        created_lawyers.append({"id": lawyer_id, "name": lawyer["full_name"], "email": lawyer["email"]})
        print(f"   ✅ Created: {lawyer['full_name']} (Email: {lawyer['email']}, Password: Lawyer@123)")
    
    return created_lawyers


async def create_firm_lawyers(law_firms):
    """Create firm lawyer users"""
    print("\n👔 Creating Firm Lawyers...")
    created_firm_lawyers = []
    
    for firm_lawyer in FIRM_LAWYERS:
        # Find the firm
        firm = next((f for f in law_firms if f["name"] == firm_lawyer["firm_name"]), None)
        if not firm:
            continue
        
        firm_lawyer_id = str(uuid.uuid4())
        password = hash_password("FirmLawyer@123")
        
        firm_lawyer_user = {
            "id": firm_lawyer_id,
            "email": firm_lawyer["email"],
            "password": password,
            "full_name": firm_lawyer["full_name"],
            "user_type": "firm_lawyer",
            "phone": firm_lawyer["phone"],
            "firm_id": firm["id"],
            "firm_name": firm_lawyer["firm_name"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "is_active": True,
            "is_approved": True,
            "specialization": firm_lawyer["specialization"],
            "experience_years": firm_lawyer["experience_years"],
            "bar_council_number": firm_lawyer["bar_council_number"],
            "education": firm_lawyer["education"],
            "languages": firm_lawyer["languages"],
            "bio": firm_lawyer["bio"]
        }
        
        await db.users.insert_one(firm_lawyer_user)
        created_firm_lawyers.append({
            "id": firm_lawyer_id,
            "name": firm_lawyer["full_name"],
            "email": firm_lawyer["email"],
            "firm_id": firm["id"],
            "firm_name": firm_lawyer["firm_name"]
        })
        print(f"   ✅ Created: {firm_lawyer['full_name']} at {firm_lawyer['firm_name']} (Email: {firm_lawyer['email']}, Password: FirmLawyer@123)")
    
    return created_firm_lawyers


async def create_clients(law_firms, firm_lawyers):
    """Create client users and firm client relationships"""
    print("\n👤 Creating Clients...")
    created_clients = []
    
    for idx, client in enumerate(CLIENTS):
        client_id = str(uuid.uuid4())
        password = hash_password("Client@123")
        
        # Regular client user
        client_user = {
            "id": client_id,
            "email": client["email"],
            "password": password,
            "full_name": client["full_name"],
            "user_type": "client",
            "phone": client["phone"],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.users.insert_one(client_user)
        print(f"   ✅ Created Client: {client['full_name']} (Email: {client['email']}, Password: Client@123)")
        
        # Create firm client relationship for some clients
        if idx < len(law_firms):
            firm = law_firms[idx]
            firm_lawyer = next((fl for fl in firm_lawyers if fl["firm_id"] == firm["id"]), None)
            
            if firm_lawyer:
                firm_client_id = str(uuid.uuid4())
                firm_client = {
                    "id": firm_client_id,
                    "client_id": client_id,
                    "full_name": client["full_name"],
                    "email": client["email"],
                    "phone": client["phone"],
                    "law_firm_id": firm["id"],
                    "law_firm_name": firm["name"],
                    "case_type": client["case_type"],
                    "assigned_lawyer_id": firm_lawyer["id"],
                    "assigned_lawyer_name": firm_lawyer["name"],
                    "status": "active",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "approved_at": datetime.now(timezone.utc).isoformat()
                }
                
                await db.firm_clients.insert_one(firm_client)
                print(f"      → Assigned to {firm['name']} with lawyer {firm_lawyer['name']}")
        
        created_clients.append({"id": client_id, "name": client["full_name"], "email": client["email"]})
    
    return created_clients


async def create_applications(law_firms):
    """Create some pending applications"""
    print("\n📝 Creating Pending Applications...")
    
    # Lawyer applications
    pending_lawyers = [
        {
            "full_name": "Adv. Kiran Rao",
            "email": "kiran.rao@pending.com",
            "phone": "+91 9876540010",
            "specialization": "Tax Law",
            "experience_years": 5,
            "bar_council_number": "DEL/ADV/2019/999",
            "education": "LLB from Delhi University",
            "languages": ["Hindi", "English"],
            "city": "Delhi",
            "state": "Delhi"
        }
    ]
    
    for lawyer in pending_lawyers:
        app_id = str(uuid.uuid4())
        app_data = {
            "id": app_id,
            **lawyer,
            "password_hash": hash_password("Pending@123"),
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.lawyer_applications.insert_one(app_data)
        print(f"   ✅ Created pending lawyer application: {lawyer['full_name']}")
    
    # Firm lawyer applications
    if law_firms:
        firm = law_firms[0]
        pending_firm_lawyer = {
            "full_name": "Adv. Deepak Malhotra",
            "email": "deepak.malhotra@pending.com",
            "phone": "+91 9876540011",
            "firm_id": firm["id"],
            "firm_name": firm["name"],
            "specialization": "Corporate Law",
            "experience_years": 3,
            "bar_council_number": "DEL/ADV/2021/888",
            "education": "LLB from Symbiosis Law School",
            "languages": ["Hindi", "English"],
            "bio": "Young corporate lawyer with startup experience"
        }
        
        app_id = str(uuid.uuid4())
        app_data = {
            "id": app_id,
            **pending_firm_lawyer,
            "password_hash": hash_password("Pending@123"),
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.firm_lawyer_applications.insert_one(app_data)
        print(f"   ✅ Created pending firm lawyer application: {pending_firm_lawyer['full_name']}")


async def create_cases(clients, lawyers):
    """Create some dummy cases"""
    print("\n⚖️  Creating Cases...")
    
    if not clients or not lawyers:
        return
    
    cases = [
        {
            "client_id": clients[0]["id"],
            "client_name": clients[0]["name"],
            "lawyer_id": lawyers[0]["id"],
            "lawyer_name": lawyers[0]["name"],
            "case_type": "civil",
            "title": "Property Dispute - Plot No. 123",
            "description": "Dispute regarding ownership of Plot No. 123 in Sector 15, Delhi",
            "status": "active",
            "next_hearing": (datetime.now(timezone.utc) + timedelta(days=15)).isoformat()
        },
        {
            "client_id": clients[1]["id"],
            "client_name": clients[1]["name"],
            "lawyer_id": lawyers[1]["id"],
            "lawyer_name": lawyers[1]["name"],
            "case_type": "family",
            "title": "Divorce Proceedings",
            "description": "Mutual consent divorce case with custody arrangements",
            "status": "active",
            "next_hearing": (datetime.now(timezone.utc) + timedelta(days=30)).isoformat()
        }
    ]
    
    for case in cases:
        case_id = str(uuid.uuid4())
        case_data = {
            "id": case_id,
            **case,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.cases.insert_one(case_data)
        print(f"   ✅ Created case: {case['title']}")


async def main():
    """Main function to populate all data"""
    print("=" * 60)
    print("🚀 NYAAY SATHI - DATABASE POPULATION SCRIPT")
    print("=" * 60)
    
    try:
        # Clear existing data
        await clear_existing_data()
        
        # Create all entities
        law_firms = await create_law_firms()
        lawyers = await create_lawyers()
        firm_lawyers = await create_firm_lawyers(law_firms)
        clients = await create_clients(law_firms, firm_lawyers)
        await create_applications(law_firms)
        await create_cases(clients, lawyers)
        
        print("\n" + "=" * 60)
        print("✅ DATABASE POPULATION COMPLETE!")
        print("=" * 60)
        print("\n📊 SUMMARY:")
        print(f"   • Law Firms: {len(law_firms)}")
        print(f"   • Independent Lawyers: {len(lawyers)}")
        print(f"   • Firm Lawyers: {len(firm_lawyers)}")
        print(f"   • Clients: {len(clients)}")
        print("\n🔐 DEFAULT PASSWORDS:")
        print("   • Law Firms: LawFirm@123")
        print("   • Lawyers: Lawyer@123")
        print("   • Firm Lawyers: FirmLawyer@123")
        print("   • Clients: Client@123")
        print("   • Pending Applications: Pending@123")
        print("\n📧 LOGIN CREDENTIALS:")
        print("\n   LAW FIRMS:")
        for firm in law_firms[:3]:
            print(f"   • {firm['email']} / LawFirm@123")
        print("\n   LAWYERS:")
        for lawyer in lawyers[:3]:
            print(f"   • {lawyer['email']} / Lawyer@123")
        print("\n   FIRM LAWYERS:")
        for fl in firm_lawyers[:3]:
            print(f"   • {fl['email']} / FirmLawyer@123")
        print("\n   CLIENTS:")
        for client in clients[:3]:
            print(f"   • {client['email']} / Client@123")
        print("\n" + "=" * 60)
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(main())
