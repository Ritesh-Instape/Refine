import React, { useEffect, useState } from "react";
import { Button, Col, IconButton, Input, Row, SelectPicker } from "rsuite";
import api from "../../../utility/api";
import { useMutation } from "react-query";
import { useModal } from "../../../context/ModalContext";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import "./style.scss";
import { Occupationprop } from "./type";
import { FormattedDataProp } from "./type";
import { Contractprop } from "./type";

const DataTable = () => {
  const { openModal } = useModal();
  const [contractList, setContractList] = useState<Contractprop[]>([]);
  const [contractCode, setContractCode] = useState<string | null>(null);
  const [occupationData, setOccupationData] = useState<Occupationprop[]>([]);

  console.log(occupationData)

  const getContractList = useMutation(
    [`contracts/getAllContracts`],
    (data: {}) => api.post(`contracts/getAllContracts`, data),
    {
      onSuccess: (res: any) => {
        setContractList(res?.data?.data);
      },
      onError: (err: any) => {
        setContractList([]);
        openModal({
          type: "error",
          message:
            err?.response?.data?.status == 500
              ? "Something went wrong"
              : err?.response?.data?.message,
          backdrop: "",
          closable: true,
        });
      },
    }
  );

  const deleteOccupationRow = (index: number) => {
    const updatedOccupationData = occupationData.filter((ele, i) => {
      if (index != i) {
        return ele;
      }
    });
    setOccupationData(updatedOccupationData);
  };

  // const handleFieldChange = (
  //   i: number,
  //   type: "screen" | "command" | "workflow" | "topicid",
  //   e: string
  // ) => {
  //   const updatedFields: Occupationprop[] = [...occupationData];
  //   updatedFields[i][type] = e;
  //   setOccupationData(updatedFields);
  // };

  const handleFieldChange = (i: number, type: string, e: string) => {
    const changeField = occupationData.map((ele, id) => {
      if (id == i) {
        return { ...ele, [type]: e };
      } else {
        return ele;
      }
    });
    setOccupationData(changeField);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contractCode) {
      openModal({
        type: "error",
        message: "Select any Contract item",
        backdrop: "",
        closable: true,
      });
    } else {
      const formattedData = occupationData.reduce(
        (acc: FormattedDataProp, field) => {
          if (field.label != null && !acc[field.label]) {
            acc[field.label] = {};
          }

          if (field.label != null && !acc[field.label][field.screen]) {
            acc[field.label][field.screen] = {};
          }

          if (field.label != null) {
            acc[field.label][field.screen][field.command] = {
              workflow_name: field.workflow,
              topicId: field.topicid,
            };
          }

          return acc;
        },
        {} as FormattedDataProp
      );
      console.log(JSON.stringify(formattedData));
    }
  };
  const handleReset = () => {
    const resetData = occupationData.map((ele) => {
      ele.screen = "";
      ele.command = "";
      ele.workflow = "";
      ele.topicid = "";
      return ele;
    });
    setOccupationData(resetData);
    setContractCode(null);
  };

  useEffect(() => {
    getContractList.mutate({});
  }, []);

  return (
    <>
      <SelectPicker
        data={
          contractList?.length > 0
            ? contractList.map((item: Contractprop) => {
                return {
                  value: item.contractCode,
                  label: `${item.contractName ?? ""} (${item.contractCode})`,
                };
              })
            : []
        }
        searchable={false}
        style={{ width: 180 }}
        placeholder="Select Contract"
        value={contractCode}
        onChange={(value) => {
          setContractCode(value);
          setOccupationData((prev: Occupationprop[]) => [
            ...prev,
            {
              label: value,
              screen: "",
              command: "",
              workflow: "",
              topicid: "",
            },
          ]);
        }}
      />

      <form onSubmit={handleSubmit}>
        <div className="inputInner">
          {occupationData?.map((item: Occupationprop, i: number) => {
            return (
              <div key={i}>
                <p className="contact_code">{item.label}</p>
                <Row style={{ marginTop: "15px" }}>
                  <Col lg={10} md={10} style={{ marginTop: "15px" }}>
                    <div className="eligibilityRuleBasis_dropdown">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        required
                        placeholder="Enter screen name"
                        value={item.screen}
                        onChange={(e) => {
                          handleFieldChange(i, "screen", e);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={10} md={10} style={{ marginTop: "15px" }}>
                    <div className="eligibilityRuleBasis_dropdown">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        required
                        placeholder="Enter command"
                        value={item.command}
                        onChange={(e) => {
                          handleFieldChange(i, "command", e);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={10} md={10} style={{ marginTop: "15px" }}>
                    <div className="eligibilityRuleBasis_dropdown">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        required
                        placeholder="Enter workflow name"
                        value={item.workflow}
                        onChange={(e) => {
                          handleFieldChange(i, "workflow", e);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={10} md={10} style={{ marginTop: "15px" }}>
                    <div className="eligibilityRuleBasis_dropdown">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        required
                        placeholder="Enter topic id"
                        value={item.topicid}
                        onChange={(e) => {
                          handleFieldChange(i, "topicid", e);
                        }}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={4} className="addPlusButton">
                    {/* {occupationData?.length == i + 1 ? ( */}
                      <IconButton
                        style={{ marginRight: 5 }}
                        onClick={() => {
                          setOccupationData((prev: Occupationprop[]) => [
                            ...prev,
                            {
                              label:item.label,
                              screen: "",
                              command: "",
                              workflow: "",
                              topicid: "",
                            },
                          ]);
                        }}
                        icon={<PlusIcon />}
                      />
                    {/* ) : (
                      ""
                    )} */}

                    {occupationData.length != 1 && (
                      <IconButton
                        appearance="primary"
                        onClick={() => {
                          deleteOccupationRow(i);
                        }}
                        icon={<MinusIcon />}
                      ></IconButton>
                    )}
                  </Col> 
                </Row>
              </div>
            );
          })}
        </div>

        {occupationData.length > 0 && (
          <div className="button_div">
            <Button
              appearance="ghost"
              className="mx-2"
              style={{ width: 150 }}
              onClick={handleReset}
            >
              RESET
            </Button>
            <Button
              type="submit"
              appearance="primary"
              className="mx-2"
              style={{ width: 150 }}
            >
              SUBMIT
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default DataTable;
