import { useState } from "react";
import { Card, Col, Row } from "antd";
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div style={{width: '90vw'}}>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="体重管理卡片" bordered={true}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
