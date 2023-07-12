import { Card, Col, Row, Modal, Form, Input, DatePicker } from "antd";
import * as eCharts from "echarts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

function App() {
  const [main, setMain] = useState<HTMLElement | null>(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [yAxisData, setYAxisData] = useState<string[]>([]);
  const option = {
    title: {
      text: "体重变化",
    },
    tooltip: {},
    legend: {
      data: ["体重"],
    },
    xAxis: {
      data: xAxisData,
    },
    yAxis: {},
    series: [
      {
        name: "体重",
        type: "line",
        data: yAxisData,
      },
    ],
  };
  function handleSetting() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    const node = document.getElementById("main");
    setMain(node);
  }, [main]);
  useEffect(() => {
    const xAxis = localStorage.getItem("xAxis") as string;
    if (xAxis) {
      const xData = JSON.parse(xAxis);
      setXAxisData([...xData]);
    }
    const yAxis = localStorage.getItem("yAxis") as string;
    if (yAxis) {
      const yData = JSON.parse(yAxis);
      setYAxisData([...yData]);
    }
  }, []);
  let myEchart: any;
  if (main !== null) {
    myEchart = eCharts.init(main);
    myEchart.setOption(option);
  }
  const handleOk = () => {
    // try {
    //   await form.validateFields();
    //   // 表单验证成功，可以在这里处理表单数据
    const values = form.getFieldsValue();
    const { date, weight } = values;
    const _date = dayjs(date).format("YYYY-MM-DD");
    console.log("Weight:", weight);

    setXAxisData([...xAxisData, _date]);
    setYAxisData([...yAxisData, weight]);
    // storage存数据
    localStorage.setItem("xAxis", JSON.stringify([...xAxisData, _date]));
    localStorage.setItem("yAxis", JSON.stringify([...yAxisData, weight]));
    myEchart.setOption(option);
    form.resetFields();
    setIsModalOpen(false);
    // } catch (errorInfo) {
    //   // 表单验证失败
    //   console.log("Validation failed:", errorInfo);
    // }
  };
  return (
    <>
      <div style={{ width: "98vw" }}>
        <Row gutter={16}>
          <Col span={24}>
            <Card
              title="体重管理卡片"
              bordered={true}
              actions={[
                <SettingOutlined key="setting" onClick={handleSetting} />,
              ]}
            >
              <div
                id="main"
                style={{
                  width: "90vw",
                  height: 400,
                  margin: 40,
                }}
              ></div>
            </Card>
          </Col>
        </Row>
        <Modal
          title="日体重设置"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            form={form}
            style={{ minWidth: 600 }}
          >
            <Form.Item label="当前时间" name="date">
              <DatePicker placeholder="请选择日期" style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item label="体重" name="weight">
              <Input placeholder="请输入体重" style={{ width: "300px" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default App;
