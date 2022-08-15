import { Player } from "@lottiefiles/react-lottie-player";
import loadingIcon from "../../assets/animatedIcons/loading.json";

const Loader = () => {
  return (
    <Player
      autoplay
      loop
      src={loadingIcon}
      style={{ height: "100px", width: "100px" }}
    />
  );
};
export default Loader;
