from pydantic import BaseModel,Field, constr, field_validator
import datetime
from typing import Literal,Optional

class ConnectionList(BaseModel):
    ID: int
    Applicant_Name:str
    Reviewer_Name:str
    Date_of_Application:datetime.date
    Status:str


class ConnectionDetails(BaseModel):
    Applicant_Name: constr(min_length=1, strip_whitespace=True)
    Gender: Literal["Male","Female","Other"]
    District: Literal["North","South","East","West"]
    Pincode: int = Field(..., ge=0, description="Must be a positive integer")
    Ownership: Literal["JOINT","INDIVIDUAL"]
    Category: Literal["Commerical","Residential"]
    Load_Applied: int = Field(..., le=200, description="Must be less than or equal to 200")
    Status: Literal["Approved", "Rejected", "Pending", "Connection Released"]
    Reviewer_Name: constr(min_length=1, strip_whitespace=True)
    Reviewer_Comments: constr(min_length=1, strip_whitespace=True)

    @field_validator('Pincode')
    def check_pincode(cls, v):
        if v < 0:
            raise ValueError('Pincode must be a positive integer.')
        return v
 
