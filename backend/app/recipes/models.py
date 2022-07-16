from fastapi_users_db_sqlalchemy import GUID

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, func
from sqlalchemy.orm import relationship

from app.db import Base


class Recipe(Base):
	__tablename__ = "recipes"

	id = Column(Integer, primary_key=True, index=True, nullable=False)
	title = Column(String, nullable=False)
	ingredients = Column(String, nullable=False)
	instructions = Column(String, nullable=False)
	is_coocked = Column(Boolean, nullable=False, default=False)
	image_url = Column(String, nullable=True)
	review = Column(Integer, nullable=False, default=0)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
	user_id = Column(GUID, ForeignKey("users.id"), nullable=False)
	user = relationship("User", back_populates="recipes")

	class Config:
		orm_mode = True