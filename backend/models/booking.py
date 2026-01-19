from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, timezone
import uuid


class BookingCreate(BaseModel):
    lawyer_id: str
    date: str
    time: str
    description: str


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_id: str
    lawyer_id: str
    date: str
    time: str
    description: str
    status: str = 'pending'
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
