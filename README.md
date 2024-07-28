# Problem Statement

About Client:
India’s leading Electricity board is one of the clients of BCG, offering different categories of electricity connections that meet requirements for wide range of customers.

Problem Statement:
In the modern age of automation and digitalization, the client wants to create a web application for it’s staff with capability to view and edit the connections made/requested by the user. To solve the problem and get an edge over its competitors, the client wants a Multi-Page User Interface to keep track of applied connections and their status.
The application should cover the following aspects--:

PART A
Display the records in a grid or tabular format.
Search option to look for connection details with Applicant ID.
Add a date picker to filter via date range via date of application.
Option to view/edit electricity connection application requests.
Refer dataset for the data attributes.
Could be on same or different page.
Data Validation.
Should not be allowed to change the Date of Application, Govt ID Type, and ID Number.
Load applied should not exceed 200 KV.

PART B
Create a visualization graph e.g., bar or line chart for number of connection requests in every month. The user should be given flexibility to select status (pending, approved etc.) of choice. (Use some form of charting library).


## Steps to run the Frontend code(React).

- Navigate to the frontend folder in the root directory.
- Run **npm install** inside the terminal.
- Run **npm start** inside the terminal (**Make sure that the application is running on http://localhost:3000**)

## Steps to run the Backend code(FastApi).

- Navigate to the backend folder in the root directory.
- Activate the virtual environment by running **source myenv/bin/activate**(Mac) or **.\myenv\Scripts\activate.bat**(Windows) inside the terminal/command prompt .
- After activating the virtual environment you need to install the dependencies. Run **pip3 install -r requirements.txt**.
- Run the application by using **uvicorn main:app --reload** command.
- You can view the api's using Swagger available on **http://localhost:8000/docs#/** (Change the Port number as per your requirement)
