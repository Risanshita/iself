import { Modal, Row, Col } from "antd";
import CodeRefactor from "../homepage/CodeRefactor";
import CodeTip from "../homepage/CodeTip";
import InfoByte from "../homepage/InfoByte";
import Notification from "../homepage/Notification";
import Paraphrase from "../homepage/Paraphrase";
import { PostTypes } from "./post";

const PostPreview = ({ post, afterClose, isPreview }) => {
  return (
    <div>
      <Modal
        width={window.innerWidth}
        centered
        visible={post && post.data1 ? true : false}
        footer={null}
        afterClose={afterClose}
        onCancel={afterClose}
        title={isPreview ? <Row justify="center">Preview</Row> : null}
      >
        <Row
          style={{ height: window.innerHeight - 160 }}
          className="prevent-select"
        >
          {post && (
            <Col span={24} style={{ height: "100%", padding: 20 }}>
              {post.type === PostTypes.infoByte && <InfoByte post={post} />}
              {post.type === PostTypes.paraphrase && <Paraphrase post={post} />}
              {post.type === PostTypes.codeTip && <CodeTip post={post} />}
              {post.type === PostTypes.refactor && <CodeRefactor post={post} />}
              {post.type === PostTypes.notification && (
                <Notification post={post} />
              )}
            </Col>
          )}
        </Row>
      </Modal>
    </div>
  );
};

export default PostPreview;
