from sqlalchemy.orm.session import Session
from sqlalchemy import text,update,asc
from datetime import datetime, date
from fastapi import HTTPException, status
from database.models import User
from routers.schemas import ConnectionDetails

def getAllConnections(db:Session):
    return db.query(User).order_by(asc(User.ID)).all()

def getAllConnectionRequest(status:str,startDate:datetime,endDate:datetime,db:Session):
    query = db.query(User).filter(User.Status == status)
    
    if startDate:
        query = query.filter(User.Date_of_Application >= startDate)
    if endDate:
        query = query.filter(User.Date_of_Application <= endDate)
    
    users = query.all()
    monthly_count = {}
    for user in users:
        month_year = user.Date_of_Application.strftime("%y/%m")
        if month_year in monthly_count:
            monthly_count[month_year] += 1
        else:
            monthly_count[month_year] = 1
    
    result = [{"month_year": month_year, "count": count} for month_year, count in monthly_count.items()]

    return {"monthly_counts": result}

def getConnectionDetails(id:int,db:Session):
    details = db.query(User).filter(User.ID == id).first()

    if not details:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Connection with id {id} not found")
    return details

def updateConnectionDetails(id:int,request:ConnectionDetails,db:Session):
    print("request---->",request)
    date_of_approval = None if request.Status == "Pending" else datetime.strptime(str(datetime.now().strftime('%d/%m/%y')),"%d/%m/%y")
    modified_date = datetime.strptime(str(datetime.now().strftime('%d/%m/%y')),"%d/%m/%y")

    stmt = (
        update(User)
        .where(User.ID == id)
        .values(
            Applicant_Name=request.Applicant_Name,
            Gender=request.Gender,
            District=request.District,
            Pincode=request.Pincode,
            Ownership=request.Ownership,
            Category=request.Category,
            Load_Applied=request.Load_Applied,
            Date_of_Approval = date_of_approval,
            Modified_Date=modified_date,
            Status=request.Status,
            Reviewer_Name=request.Reviewer_Name,
            Reviewer_Comments=request.Reviewer_Comments
        )
    )

    result = db.execute(stmt)
    db.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Connection with id {id} not found")

    return {"message": "Connection details updated successfully"}

