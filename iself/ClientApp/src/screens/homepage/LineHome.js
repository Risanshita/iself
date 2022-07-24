import { Button, Row } from "antd";
import { useContext, useState } from "react";
import { HomeContext, HomeProvider } from "./state";

function Home() {
  const { state, actions } = useContext(HomeContext);
  const { loadData } = actions.home;
  const { posts } = state.home;
  const [isInitialLoad, setInitialLoad] = useState(true);

  if (isInitialLoad) {
    loadData();
    setInitialLoad(false);
  }

  return (
    <Row>
      {posts.length > 0 && <Row>{posts[0].data1}</Row>}
      <Button
        onClick={() => {
          document.getElementById("app_body").requestFullscreen();
        }}
      >
        Full Screen
      </Button>
    </Row>
  );
}

export function LineHome() {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
}
