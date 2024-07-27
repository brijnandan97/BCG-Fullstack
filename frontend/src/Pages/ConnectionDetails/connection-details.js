import { Button, Form, Input, InputNumber, Select } from "antd";
import "./connection-details.css";
import { useContext, useEffect } from "react";
import { ConnectionContext } from "../../utils/contexts/connection-context-provider/connection-context";
import {
  CATEGORY,
  DISTRICT,
  GENDER,
  GOVTID_TYPES,
  OWNERSHIP,
  STATUS,
} from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const API_URL = "http://localhost:8000/";

export const ConnectionDetails = () => {
  const { id } = useParams();
  const [connectionDetailsForm] = Form.useForm();
  const navigate = useNavigate();
  const { openNotificationWithIcon } = useContext(ConnectionContext);

  useEffect(() => {
    getConnectionFormValues();
  }, []);

  const getConnectionFormValues = async () => {
    try {
      console.log("hel");
      const res = await fetch(API_URL + `connections/details/${id}`, {
        method: "GET",
      });
      if (!res.ok) {
        if (res.status === 400 || res.status === 404) {
          openNotificationWithIcon(
            "error",
            `Connection with id ${id} does not exist`,
            ""
          );
          navigate("/dashboard");
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let response = await res.json();
      connectionDetailsForm.setFieldsValue({
        Applicant_Name: response["Applicant_Name"],
        Gender: response["Gender"],
        District: response["District"],
        State: response["State"],
        Pincode: response["Pincode"],
        Ownership: response["Ownership"],
        Category: response["Category"],
        Load_Applied: response["Load_Applied"],
        Date_of_Application: response["Date_of_Application"],
        GovtID_Type: response["GovtID_Type"],
        ID_Number: response["ID_Number"],
        Reviewer_ID: response["Reviewer_ID"],
        Reviewer_Name: response["Reviewer_Name"],
        Reviewer_Comments: response["Reviewer_Comments"],
        Status: response["Status"],
      });
    } catch (error) {}
  };

  const handleConnectionUpdation = async () => {
    try {
      let payload = {
        Applicant_Name: connectionDetailsForm.getFieldValue("Applicant_Name"),
        Gender: connectionDetailsForm.getFieldValue("Gender"),
        District: connectionDetailsForm.getFieldValue("District"),
        Pincode: connectionDetailsForm.getFieldValue("Pincode"),
        Ownership: connectionDetailsForm.getFieldValue("Ownership"),
        Category: connectionDetailsForm.getFieldValue("Category"),
        Load_Applied: connectionDetailsForm.getFieldValue("Load_Applied"),
        Status: connectionDetailsForm.getFieldValue("Status"),
        Reviewer_Name: connectionDetailsForm.getFieldValue("Reviewer_Name"),
        Reviewer_Comments:
          connectionDetailsForm.getFieldValue("Reviewer_Comments"),
      };

      const res = await fetch(API_URL + `connections/details/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let response = await res.json();
      openNotificationWithIcon(
        "success",
        "Connection details updated successfully",
        ""
      );
      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <>
      <div className="details-layout">
        <h3 className="form-title">Connection Details</h3>
        <Form
          form={connectionDetailsForm}
          onFinish={handleConnectionUpdation}
          className="connection-details-form"
        >
          <div className="form-grid">
            <Form.Item
              label="Applicant Name"
              name="Applicant_Name"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="Gender"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select options={GENDER} />
            </Form.Item>

            <Form.Item
              label="District"
              name="District"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select options={DISTRICT} />
            </Form.Item>

            <Form.Item
              label="State"
              name="State"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Pincode"
              name="Pincode"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ownership"
              name="Ownership"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select options={OWNERSHIP} />
            </Form.Item>

            <Form.Item
              label="Category"
              name="Category"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select options={CATEGORY} />
            </Form.Item>

            <Form.Item
              label="Load Applied (In KV)"
              name="Load_Applied"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Required" },
                {
                  type: "number",
                  min: 0,
                  max: 200,
                  message: "Value must be between 0 and 200",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Application Date"
              name="Date_of_Application"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Govt ID Type"
              name="GovtID_Type"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select disabled options={GOVTID_TYPES} />
            </Form.Item>

            <Form.Item
              label="ID Number"
              name="ID_Number"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Reviewer Id"
              name="Reviewer_ID"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Reviewer Name"
              name="Reviewer_Name"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Reviewer Comments"
              name="Reviewer_Comments"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="Status"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select options={STATUS} />
            </Form.Item>
          </div>

          <div className="form-buttons">
            <Button
              htmlType="reset"
              onClick={() => {
                navigate("/dashboard");
              }}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button htmlType="submit" className="submit-button">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
