from fastapi import APIRouter,Depends, UploadFile,File,HTTPException
from database.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from database.dbservice import getAllConnections,getAllConnectionRequest,getConnectionDetails,updateConnectionDetails
from routers.schemas import  ConnectionList,ConnectionDetails
from database.models import User
import json
from datetime import datetime
import re

router = APIRouter(
    prefix='/connections',
    tags=['Connection Requests']
)

@router.get('/requests')
async def getConnectionRequests(status:str,startDate:str,endDate:str,db:Session=Depends(get_db)):
    try:
        start_date_obj = datetime.strptime(startDate, "%d/%m/%y").date()
        end_date_obj = datetime.strptime(endDate, "%d/%m/%y").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use DD/MM/YY.")
    
    return getAllConnectionRequest(status,start_date_obj,end_date_obj,db)

@router.get('',response_model=List[ConnectionList])
async def get_all_connections(db:Session=Depends(get_db)):
    return getAllConnections(db)

@router.get('/details/{id}')
async def get_all_connections(id:str,db:Session=Depends(get_db)):
    if not re.match(r'^\d+$', id):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid ID: {id}. ID should be a valid integer."
        )
    id = int(id)
    return getConnectionDetails(id,db)


@router.patch('/details/{id}')
async def updateConnectionDetailsHandler(id:str,request:ConnectionDetails,db:Session=Depends(get_db)):
    if not re.match(r'^\d+$', id):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid ID: {id}. ID should be a valid integer."
        )
    id = int(id)
    return updateConnectionDetails(id,request,db)




@router.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...),db:Session=Depends(get_db)):
    json_data = json.loads(file.file.read())
    
    for row in json_data:
        print(row)
        item = User(ID=row["ID"],
                    Applicant_Name=row["Applicant_Name"],
                    Gender=row["Gender"],
                    District=row["District"],
                    State=row["State"],
                    Pincode=row["Pincode"],
                    Ownership=row["Ownership"],
                    GovtID_Type=row["GovtID_Type"],
                    ID_Number=row["ID_Number"],
                    Category=row["Category"],
                    Load_Applied=row["Load_Applied"],
                    Date_of_Application=datetime.strptime(row["Date_of_Application"],"%d/%m/%y").date(),
                    Date_of_Approval= datetime.strptime(row["Date_of_Approval"], "%d/%m/%y").date() if row["Date_of_Approval"] else None,
                    Modified_Date=datetime.strptime(row["Modified_Date"],"%d/%m/%y").date(),
                    Status=row["Status"],
                    Reviewer_ID=row["Reviewer_ID"],
                    Reviewer_Name=row["Reviewer_Name"],
                    Reviewer_Comments=row["Reviewer_Comments"]
                    )
        db.add(item)
    db.commit()
    db.close()