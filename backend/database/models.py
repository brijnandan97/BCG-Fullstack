from .database import Base
from sqlalchemy import Column, Integer, String
from enum import Enum
from sqlalchemy.sql.sqltypes import Date


class Gender(Enum):
    Male = "Male"
    Female = "Female"
    Other = "Other"

class District(str,Enum):
    North = "North"
    South = "South"
    East = "East"
    West = "West"

class Ownership(Enum):
    JOINT = "JOINT"
    INDIVIDUAL = "INDIVIDUAL"

class GovtID_Type(Enum):
    AADHAR = "AADHAR"
    VOTER_ID = "VOTER_ID"
    PAN = "PAN"
    PASSPORT = "PASSPORT"

class Category(Enum):
    Commerical = "Commerical"
    Residential = "Residential"

class Status(Enum):
    Approved = "Approved"
    Rejected = "Rejected"
    Pending = "Pending"
    CONNECTION_RELEASED = "Connection Released"

class User(Base):
    __tablename__ = "user"
    ID = Column(Integer,primary_key=True, index=True)
    Applicant_Name = Column(String)
    Gender= Column(String)
    District = Column(String)
    State = Column(String)
    Pincode = Column(Integer)
    Ownership = Column(String)
    GovtID_Type = Column(String)
    ID_Number = Column(String)
    Category = Column(String)
    Load_Applied = Column(Integer)
    Date_of_Application = Column(Date)
    Date_of_Approval = Column(Date)
    Modified_Date = Column(Date)
    Status = Column(String)
    Reviewer_ID = Column(Integer)
    Reviewer_Name = Column(String)
    Reviewer_Comments = Column(String)