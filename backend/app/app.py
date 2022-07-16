from fastapi import Depends, FastAPI

from app.db import User, create_db_and_tables
from app.users.users import current_active_user
from app.users.routers import router as users_router
from app.recipes.routers import router as recipes_router

app = FastAPI()
app.include_router(users_router)
app.include_router(recipes_router)

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


@app.on_event("startup")
async def on_startup():
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()
