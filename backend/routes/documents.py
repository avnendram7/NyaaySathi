from fastapi import APIRouter, Depends
from typing import List, Optional
from datetime import datetime
from models.document import Document, DocumentCreate
from services.database import db
from routes.auth import get_current_user

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("", response_model=Document)
async def create_document(doc_data: DocumentCreate, current_user: dict = Depends(get_current_user)):
    """Create a new document"""
    doc_dict = doc_data.model_dump()
    doc_dict['user_id'] = current_user['id']
    doc_obj = Document(**doc_dict)
    
    doc = doc_obj.model_dump()
    doc['uploaded_at'] = doc['uploaded_at'].isoformat()
    
    await db.documents.insert_one(doc)
    return doc_obj


@router.get("", response_model=List[Document])
async def get_documents(case_id: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    """Get documents for current user, optionally filtered by case"""
    query = {'user_id': current_user['id']}
    if case_id:
        query['case_id'] = case_id
    
    documents = await db.documents.find(query, {'_id': 0}).to_list(100)
    
    for doc in documents:
        if isinstance(doc['uploaded_at'], str):
            doc['uploaded_at'] = datetime.fromisoformat(doc['uploaded_at'])
    
    return documents
