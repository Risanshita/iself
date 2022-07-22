import { Tabs } from "antd";
import './Style.css';

const { TabPane } = Tabs;

function Sliders({ children, onChange, activeKey, style }) {

    return <Tabs
        activeKey={activeKey}
        onChange={onChange}
        style={style}
        animated={{ inkBar: false, tabPane: true }}
        defaultActiveKey="1"
    >
        {children}
    </Tabs>;
}

export default Sliders;


export function Slide(children, slideKey) {
    return <TabPane key={slideKey}>
        {children}
    </TabPane>;
}