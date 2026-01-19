from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, timezone
import uuid


class CaseCreate(BaseModel):
    title: str
    case_number: str
    description: str
    status: str = 'active'


class Case(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    case_number: str
    description: str
    status: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
