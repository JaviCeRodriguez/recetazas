from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class RecipeCreate(BaseModel):
	title: str
	ingredients: str
	instructions: str
	is_coocked: bool
	image_url: str
	review: int

	class Config:
		orm_mode = True


class RecipeUpdateSchema(RecipeCreate):
	created_at: datetime
	updated_at: datetime


class RecipeRetrieveSchema(RecipeCreate):
	id: Optional[int]
	user_id: UUID
	created_at: Optional[datetime]
	updated_at: Optional[datetime]
