from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import RedirectResponse
from minio import Minio
import os
import uuid

# --- Config ---
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "minio:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "minioadmin")
BUCKET_NAME = os.getenv("BUCKET_NAME", "reponote-files")
USE_SSL = False

# --- Minio Client ---
client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=USE_SSL
)

# Ensure bucket exists
if not client.bucket_exists(BUCKET_NAME):
    client.make_bucket(BUCKET_NAME)

app = FastAPI(title="Storage Service")

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_ext = file.filename.split(".")[-1]
        object_name = f"{uuid.uuid4()}.{file_ext}"
        
        # Upload
        client.put_object(
            BUCKET_NAME,
            object_name,
            file.file,
            length=-1,
            part_size=10*1024*1024
        )
        return {"path": object_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{object_name}")
def download_file(object_name: str):
    try:
        # Get presigned URL
        url = client.presigned_get_object(BUCKET_NAME, object_name)
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=404, detail="File not found")
