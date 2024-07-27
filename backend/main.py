from fastapi import FastAPI
from database import models
from routers import connections
from database.database import engine
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(connections.router)

models.Base.metadata.create_all(engine) 

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = ['*'],
    allow_methods = ['*'],
    allow_headers = ['*']
)