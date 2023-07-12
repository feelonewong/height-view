import { Card, Col, Row } from "antd";
import * as eCharts from "echarts";
import { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
function App() {
  const [main, setMain] = useState<HTMLElement | null>(null);
  const option = {
    title: {
      text: "体重变化",
    },
    tooltip: {},
    legend: {
      data: ["体重"],
    },
    xAxis: {
      data: ["7-5", "7-6", "7-7", "7-8", "7-9", "7-10"],
    },
    yAxis: {},
    series: [
      {
        name: "体重",
        type: "line",
        data: [178.1, 176.3, 175.5, 174, 173.2, 172.6],
      },
    ],
  };
  function handleSetting() {
    console.log("1123");
  }
  useEffect(() => {
    const node = document.getElementById("main");
    setMain(node);
  }, [main]);
  if (main !== null) {
    const myEchart = eCharts.init(main);
    myEchart.setOption(option);
  }
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
      </div>
    </>
  );
}

export default App;
