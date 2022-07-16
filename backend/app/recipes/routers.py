from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import User, get_async_session
from app.users.users import current_active_user
from app.recipes.schemas import RecipeCreate, RecipeRetrieveSchema, RecipeUpdateSchema
from app.recipes.models import Recipe


router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.post("/", response_model=RecipeRetrieveSchema)
async def create_recipe(
	recipe_in: RecipeCreate,
	session: AsyncSession = Depends(get_async_session),
	user: User = Depends(current_active_user)
):
	recipe = Recipe(**recipe_in.dict())
	recipe.user_id = user.id
	session.add(recipe)
	await session.commit()
	await session.refresh(recipe)
	return recipe

@router.get("/me", response_model=List[RecipeRetrieveSchema])
async def get_recipes(
	session: AsyncSession = Depends(get_async_session),
	user: User = Depends(current_active_user)
):
	recipes = (
		(
			await session.execute(
				select(Recipe)
				.filter(Recipe.user_id == user.id)
			)
		)
		.scalars()
		.all()
	)
	return recipes

@router.put("/me/{recipe_id}", response_model=RecipeRetrieveSchema)
async def update_recipe(
	recipe_id: int,
	recipe_in: RecipeUpdateSchema,
	session: AsyncSession = Depends(get_async_session),
	user: User = Depends(current_active_user)
):
	recipe: Optional[Recipe] = await session.get(Recipe, recipe_id)
	if not recipe:
		raise HTTPException(status_code=404, detail="Recipe not found")
	if recipe.user_id != user.id:
		raise HTTPException(status_code=403, detail="Not authorized")
	update_recipe = recipe_in.dict()
	for field, value in update_recipe.items():
		setattr(recipe, field, value)
	session.add(recipe)
	await session.commit()
	await session.refresh(recipe)
	return recipe
